# jquery plugin - jquery.spotter.js


### What it does
***
a lightweight jQuery plugin that automatically updates navigation menus based on scrolled position of contents.


### Examples
***
- [demo 1]
Update the matched menu via the index of content where the scroll context is browser window.
- [demo 2]
Update the matched menu via the id value of content (to the matched href value in menu) where the scroll context is browser window.
- [demo 3]
Update the matched menu via the index of content where the scroll context is its parent container.
- [demo 4]
Update the matched menu  via the id value of content where the scroll context is its parent container.
- [demo 5]
Bind multiple pairs of menu and content.
- [demo 6]
Bind multiple pairs of menu and content. After both have been setup, disable the 1st spotter in 2s, then enable it in 4s and finally destroy it in 6s.


### How-To
***
###### Syntax
```javascript
// $(menuCssSelector).spotter(configObj);
// for example:
$(".menu").spotter({				// different config can be passed, refer to demo
	menuListClass: "active",
	contentList: ".contents"
});
```
###### Explaination for configObj
Item | Required | Default Value | Type | Description
---  |  ---  |  ---  |  ---  |  ---
`configObj.menuListClass`  |  required  |  ""  |  string of &gt;=1 space separated class name  |  css active state for the matching menu when scrolled into a content
`configObj.contentList`  |  required  |  ""  |  string of css selector  |  the contents
`configObj.menuList`  |  optional  |  ""  |  string of css selector  |  the menus (needs to be defined only when this.selector throws an error in jQuery)
`configObj.scrollContainer`   |  optional   |  "window"  |  string of css selector   |  specify scroll container (where scroll event is bound) for the contents; it cannot be an iframe
`configObj.matchByHash`  |  optional  |  false  |  boolean  |  if true, it tells jquery.spotter to match the href value in &lt;a&gt; inside &lt;li&gt; inside the menu to the id value in &lt;li&gt; for the content at detection
`configObj.delay`  |  optional  |  80   |  positive integer  |  tells browser to update the matching menu after an delay in ms

###### Method available for the returned instance (spotter)
```javascript
var spotter = $(".menu").spotter({
	menuListClass: "active",
	contentList: ".contents"
});
spotter.config 				// return an object that contains the passed configuration
spotter.enable(); 			// enable the spotter instance
spotter.disable();			// disabe the spotter instance
spotter.destroy();			// destroy the bound plugin, including unbinding the bound resize and scroll events
```


### Features
***
###### General
- Tested in and Supports IE8+, Chrome, Firefox, Safari, Android 4.1.1, iOS
- Can be used with animated scroll
- Allows dynmaic content, since both menu and content are detected and compared in real time, it will also detect any dynamic elements, e.g. there are 4 menus and 3 content, now if a new content is appended, then the 4th menu will be shown as "active" when scroll into position
- Allows flexible html markup, i.e.
	* does not require pre-defined classes to applied to html element
	* does not require the "menu" and "content" element to follow certain order/hierarchy/relationship
	* allows custom styling to the "menu" and "content" defined by users, e.g. having a horizontal or vertical menu
- Hidden content will not trigger Event, i.e. `display: none or visibility: hidden;`
- Can be used to bind multiple pairs of menu & content (refer to demo5 and demo6)
- If an error is thrown due to undefiend options.menuList, pleaes define in the config property

###### Binding
- Content can be either be tracked by index or by hash in order to match the active menu (matchByHash Property)
- Content scrolling can be bound to either window element or its parent container (if it is not an iframe element), e.g. &lt;div&gt;
- Event is bound to when window resizes and when users scrolls inside container of content therefore menu is autoupdated when these two events are triggered

###### Avoid the following
- Changing this optons instance else destroy() will not work properly
- Binding the same menu and content (which will result in throwing errors)
- Specifying the scrollContainer to be an iframe
- Disabling right after initizlized (it should wait no. of seconds)





[demo 1]: http://charltonc.com/work/jquery-spotter/demo1.html
[demo 2]: http://charltonc.com/work/jquery-spotter/demo2.html
[demo 3]: http://charltonc.com/work/jquery-spotter/demo3.html
[demo 4]: http://charltonc.com/work/jquery-spotter/demo4.html
[demo 5]: http://charltonc.com/work/jquery-spotter/demo5.html
[demo 6]: http://charltonc.com/work/jquery-spotter/demo6.html