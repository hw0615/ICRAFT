$(function () {

  var nav = $('.small-menu');
  var top = $('.move-top');
  var nav1 = $('.nav-1');
  var nav2 = $('.nav-2');
  var nav3 = $('.nav-3');
  var nav4 = $('.nav-4');
  var nav5 = $('.nav-5');
  var nav6 = $('.nav-6');
  var nav7 = $('.nav-7');
  var nav8 = $('.nav-8');
  var nav9 = $('.nav-9');
  var nav10 = $('.nav-10');
  var nav11 = $('.nav-11');
  var nav12 = $('.nav-12');

  var sol1 = $('.sol1');
  var sol2 = $('.sol2');
  var sol3 = $('.sol3');
  var sol4 = $('.sol4');
  var sol5 = $('.sol5');
  var sol6 = $('.sol6');
  var sol7 = $('.sol7');
  var sol8 = $('.sol8');
  var sol9 = $('.sol9');
  var sol10 = $('.sol10');
  var sol11 = $('.sol11');
  var sol12 = $('.sol12');

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
    $( 'html, body' ).animate( { scrollTop : 0 }, 400);
    return false;
  });
  // nav1.click(function() {
  //   console.log('click')
  //   $( 'html, body' ).animate( { scrollTop : 1838 }, 400);
  //   return false;
  // })
  nav1.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol1.offset().top - 100 }, 400);
    return false;
  })
  nav2.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol2.offset().top - 100 }, 400);
    return false;
  })
  nav3.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol3.offset().top - 100 }, 400);
    return false;
  })
  nav4.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol4.offset().top - 100 }, 400);
    return false;
  })
  nav5.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol5.offset().top - 100 }, 400);
    return false;
  })
  nav6.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol6.offset().top - 100 }, 400);
    return false;
  })
  nav7.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol7.offset().top - 100 }, 400);
    return false;
  })
  nav8.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol8.offset().top - 100 }, 400);
    return false;
  })
  nav9.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol9.offset().top - 100 }, 400);
    return false;
  })
  nav10.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol10.offset().top - 100 }, 400);
    return false;
  })
  nav11.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol11.offset().top - 100 }, 400);
    return false;
  })
  nav12.click(function() {
    console.log('click')
    $( 'html, body' ).animate( { scrollTop : sol12.offset().top - 100 }, 400);
    return false;
  })
  
});