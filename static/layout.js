$(document).ready(function(){
    var current = location.pathname;
    $('.nav-link').each(function(){
        var nav_link = $(this);
        if(nav_link.attr('href') === current){
            nav_link.addClass('active');
        }
    })
});