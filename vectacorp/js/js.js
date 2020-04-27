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

});