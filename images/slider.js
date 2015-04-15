'use strict';
$(function() {
    var width = 693;
    var animationSpeed = 500;
    var pause = 3000;
    var $slider = $('#slider');
    var $slideContainer = $('.slides', $slider);
    var $next = $('#rightNav');
    var $prev = $('#leftNav');
    var interval;
    var slideCount = $('#slider ul li').length;
    var slideWidth = $('#slider ul li').width();
    var slideHeight = $('#slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;
    var clickcount = 0;
    $("#icon").addClass("pauseicon");

    $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
    
    $('#slider ul li:last-child').prependTo('#slider ul');


    function startSlider() {
        interval = setInterval(function() {
            nextSlide();}, pause);
    }

    function pauseSlider() {
        clearInterval(interval);
    }

    function nextSlide() {
        $('#slider ul li:first-child').appendTo('#slider ul');
        $('#slider ul').css('margin-left', 0);
        var value = parseInt($(".pager").text(), 10) + 1;
        if(value === 4){ value = 1;}
        $(".pager").text(value + "/3");
        $slideContainer.animate({'margin-left': '-693px'}, animationSpeed);

    }
    
    function prevSlide() {
        $('#slider ul').animate({
            'margin-left':  '+=693px'
        }, animationSpeed, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('margin-left', '-693px');
        var value = parseInt($(".pager").text(), 10) - 1;
        if(value === 0){ value = 3;}
        $(".pager").text(value + "/3");
        
        });
    };

    function swapclass(){
        $("#icon").toggleClass('playicon pauseicon');
        clickcount = clickcount + 1;
        if(clickcount === 1 ){ pauseSlider();}
        else if(clickcount === 2 ){ startSlider();}
        else if(clickcount > 2){clickcount = 1; pauseSlider();}
    }
    $("#icon").on('click', swapclass);
   
    $next
    .on('click', nextSlide).on('mouseenter', pauseSlider).on('mouseleave', startSlider);

    $prev
    .on('click', prevSlide).on('mouseenter', pauseSlider).on('mouseleave', startSlider);

    startSlider();
});
