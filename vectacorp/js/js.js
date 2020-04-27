$(function() {
    $('#responsive-menu').mobileMenu();

    $().tooltip();

    $("#tabs").tabs();
    $('#tabs ul li').css('font-size', '.9em');

    $("#accordion").accordion();

    $( "#tabs2" ).tabs()
    $( "#tabs2" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( "#tabs2 li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

    $('.cycle-slideshow')
    .css('height', '400px')

    $('.cycle-slideshow div')
    .css('display', 'inline')
    .css('width', '100px')
    .css('padding', '0 75px')
    .css('font-size', '2em')

    $('.cycle-slideshow img')
    .css('margin-bottom', '20px')

    $(".nav-demo li").spotter({
        menuListClass: "active",
        contentList: ".content-wrapper li"
      });

    $('#fixedNav')
    .css('position', 'fixed');

      $(document).ready(function(){
        $.topbutton({
      
          // any html content
          // default: "Top"
          html : "<i>Back to Top</i>",
          
          // CSS styles
          // default: "null"
          css : "width:100px; height:75px; background:#22b8cf; border:none; font-size:20px;",
      
          // default: 150
          scrollSpeed : 300
      
        });
      });

    $( "input" ).checkboxradio();

    $( "#companysize" ).selectmenu();
 
    $( "#files" ).selectmenu();
 
    $( "#number" )
      .selectmenu()
      .selectmenu( "menuWidget" )
        .addClass( "overflow" );
 
    $( "#salutation" ).selectmenu();

    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).click( function( event ) {
      event.preventDefault();
    } );
});