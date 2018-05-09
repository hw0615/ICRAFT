$(function () {

  var nav = $('.small-menu');
  var top = $('.move-top');

  $(window).scroll(function () {
    console.log($(this).scrollTop())
    if ( $(this).scrollTop() >= 540 ) {
      nav.addClass('fixed-sub');
      top.fadeIn();
    } else {
      nav.removeClass('fixed-sub');
      top.fadeOut()
    }
  });

  top.click(function() {
    $( 'html, body' ).animate( { scrollTop : 0 }, 500);
    return false;
  });
  
});