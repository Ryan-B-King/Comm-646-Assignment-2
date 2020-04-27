/*
 * jquery.spotter.js, version 1.0a
 * Copyright 2014-2015, Charlton Cheng
 * Github: github.com/charltonc/jquery-spotter
 * License: http://www.opensource.org/licenses/mit-license.php
 */
(function(window, document, $){
	"use strict";

	if (typeof $ === "undefined") { throw new Error("jQuery is required for jQuery Scout plugin to work."); }

	var spotters=[];


	/* GLOBAL FUNCTION
	================================================================ */
	/* Check typeof
	-------------------------------------------------------------------------------------------------------- */
	function santinize(item, type, errMsg){
		// for both optoinal & non-optional config property
		if (typeof item === type) {
			return item;

		// for non-optional config property
		} else if (typeof item !== "undefined" && typeof item !== type && typeof errMsg !== "undefined") {
			throw errMsg;

		// for optional config property
		} else if (typeof item === "undefined"){
			return false;
		}
	}


	/* Get existing index of a bound event (so it can be deleted)
	-------------------------------------------------------------------------------------------------------- */
	function getEvtId(elem, evt){
		var events, evts, i, total, item;

		if (elem) {
			events = $._data(elem, "events");
			if (typeof events !== "undefined" && typeof events[evt] !== "undefined") {
				evts = events[evt];
				for (i=evts.length;  i>0; i--) {
					item = evts[i-1];
					if (item.namespace==="spotter") {
						return evts[i-1].guid;
					}
				}
			} else {
				return false;
			}
		}
	}



	/* Get index position of an options object in passed array bying matching the event guid with options.indexScrollEvt or options.indexResizeEvt
	-------------------------------------------------------------------------------------------------------- */
	function getValIndexInArry(arry, key, guid){
		var i;

		if (arry.length > 0) {
			for (i=0; i<arry.length; i++) {
				if (arry[i][key] === guid) {
					return i;
				}
			}
		} else {
			return false;
		}
	}


	/* Clean up the instance that is returned to user earlier when plugin is initialized
	-------------------------------------------------------------------------------------------------------- */
	function cleanupKey(that){
		var key;

		for (key in that) {
			that[key] = null;
			delete that[key];
		}
	}


	/* Function used in Helper function to get matching menu
	-------------------------------------------------------------------------------------------------------- */
	function getMatchMenu(menus, i, id){
		return menus.eq(i);
	}
	function getMatchMenuH(menus, i, id){
		return menus.find('a[href="#' + id + '"]').parent();
	}


	/* Function used in Helper function to get content position in container or window
	-------------------------------------------------------------------------------------------------------- */
	function getContentTop(content){
		return content[0].offsetTop;
	}
	function getContentTopW(content){
		return content.offset().top;
	}


	/* Function used in returned Instance
	-------------------------------------------------------------------------------------------------------- */
	function enableSpotter(options, helper, updateSpotter){
		if (!options.pluginEnabled) {
			this.config.pluginEnabled = options.pluginEnabled = true;
			updateSpotter({data: [options, helper]});
		}
	}
	function disableSpotter(options){
		if (options.pluginEnabled) {
			this.config.pluginEnabled = options.pluginEnabled = false;
			$(options.menuList + "." + options.menuListClass).removeClass(options.menuListClass);
		}
	}
	function destroySpotter(options, helper){
		var scrollEvts = $._data(helper.scrollContainer, "events").scroll,
		       resizeEvts = $._data(helper.scrollContainer, "events").resize;

		$(options.menuList + "." + options.menuListClass).removeClass(options.menuListClass);
		$._data(helper.scrollContainer, "events").scroll.splice(getValIndexInArry(scrollEvts, "guid", options.indexScrollEvt), 1);
		$._data(window, "events").resize.splice(getValIndexInArry(resizeEvts, "guid", options.indexResizeEvt), 1);
		spotters.splice(getValIndexInArry(spotters, "menuList", options.menuList), 1);
		cleanupKey(this);
	}


	/* Update menu when window resizes and/or user scrolls inside the content container
	-------------------------------------------------------------------------------------------------------- */
	function updateSpotter(e){
		var menus, menu,
		       contents, content, contentStyle,
		       scrollPos, contentTop, contentBtm,
		       i, matchTotal,
		       options = e.data[0],
		       helper = e.data[1];

		if (!updateSpotter.working && options.pluginEnabled) {
			// Disable building up the queue & make sure it does not fire continuously
			helper.working = true;

			// Get Elements & Total pair of menu/content to be compaired
			menus = $(options.menuList);
			contents = $(options.contentList);
			matchTotal = (menus.length <= contents.length) ? menus.length : contents.length;

			if (matchTotal > 1) {
				// Detect & Update Scout  with an delay of 100ms while scrolling
				setTimeout(function(){
					scrollPos = $(helper.scrollContainer).scrollTop();
					for (i=0; i<matchTotal; i++) {
						content = contents.eq(i);
						contentStyle = contents[i].style;
						contentTop = helper.getContentTop(content);
						contentBtm = contentTop + content.outerHeight(false);
						menu = helper.getMatchMenu(menus, i, contents[i].id);
						// console.log("index: " + i + "\n" + "scrollPos: " + scrollPos + "\n" + "contentTop: " + contentTop + "\n" + "contentBtm: " + contentBtm);

						if (scrollPos <= contentBtm && scrollPos >= contentTop && contentStyle.display !== "none" && contentStyle.visibility !== "hidden") {
							$(options.menuList + "." + options.menuListClass).removeClass(options.menuListClass);
							menu.addClass(options.menuListClass);
							break;
						} else {
							menu.removeClass(options.menuListClass);
						}
					}
					helper.working = false;
				}, options.delay);
			}
		} else {
			return false;
		}
	}


	/* INITIALIZE THE PLUGIN
	================================================================ */
	$.fn.spotter = (typeof jQuery.fn.spotter !== "undefined") ? $.fn.spotter : function(config){
		var ifBound, i, options, helper;

		if (config.constructor === Object && typeof config === "object") {
			// Check the property inside config object passed in by user
			options = {
				menuList: 		("selector" in this && this.selector) ? this.selector : santinize(config.menuList, "string", "The value of config's menuList must be a string of css selector"),
				menuListClass: 	santinize(config.menuListClass, "string", "The value of config's menuListClass must be a string of one or more space separate class names"),
				contentList: 		santinize(config.contentList, "string", "The value of config's contentList must be a string of css selector"),
				scrollContainer: 	santinize(config.scrollContainer, "string", "The value of config's scrollContainer must be a string of css selector"),
				matchByHash: 		santinize(config.matchByHash, "boolean", "The value of config's matchByHash must be a boolean"),
				delay: 			santinize(config.delay, "number", "The value of config's delay must be a positive integer indicating time in ms") ? ((config.delay>50) ? config.delay : 50) : 50,
				indexScrollEvt: 	0,
				indexResizeEvt: 	0,
				pluginEnabled: 	true
			};

			// Check if selectors already bound for either of the passed selectors. If not, continue with logic
			ifBound = (spotters.length > 0) ? (function(){
				for (i=0; i<spotters.length ; i++) {
					if (options.menuList === spotters[i].menuList || options.contentList === spotters[i].contentList) {
						return true;
					}
				}
			})() : false;

			if (ifBound) {
				throw ("either " + options.menuList + "or " + options.contentList + " is already bound");
			} else {
				if (options.scrollContainer && document.querySelector(options.scrollContainer).tagName.toLowerCase() === "iframe") {
					throw new Error("the scroll container should not be an iframe element ");
				} else {
					// Setup Helper function  based on the context
					helper = {
						scrollContainer : (options.scrollContainer) ? document.querySelector(options.scrollContainer) : window,
						getMatchMenu : (options.matchByHash) ? getMatchMenuH : getMatchMenu,
						getContentTop: (options.scrollContainer) ? getContentTop : getContentTopW,
						working: false
					};

					// Bind Event and call the handler function to update the view
					$(window).on("resize.spotter", [options, helper], updateSpotter);
					$(helper.scrollContainer).on("scroll.spotter", [options, helper], updateSpotter);
					updateSpotter({data: [options, helper]});

					// Cache the index of events for later removal use
					options.indexResizeEvt = getEvtId(window, "resize");
					options.indexScrollEvt = getEvtId(helper.scrollContainer, "scroll");
					spotters.push(options);

					// Return a new instance of API to user
					return {
						config: $.extend(false, {}, options),
						enable: function(){ enableSpotter.call(this, options, helper, updateSpotter); },
						disable: function(){ disableSpotter.call(this, options); },
						destroy: function(){ destroySpotter.call(this, options, helper); }
					};
				}


			}
		} else {
			throw new Error("passed argument should be an object");
		}
	};

})(window, document, jQuery);