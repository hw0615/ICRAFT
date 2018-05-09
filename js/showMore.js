$(window).on('load', function () {
  $('.show-more').click(function (e) {
    e.preventDefault();
    $('div:hidden').slice(0,12).removeClass('hide')
    
    if($('div').hasClass('hide') === false) {
      $('.more-wrap').addClass('hide')
    }
  })
})

