
const backToTop = $('.js-scroll-top')

$(window).on('scroll', () => {
  const scrollTop = $(document).scrollTop()
  if (scrollTop > 100) {
    backToTop.addClass('b-scroll-top_show')
  } else {
    backToTop.removeClass('b-scroll-top_show')
  }
})

backToTop.on('click', () => {
  $('body, html').animate({
    scrollTop: 0
  }, 700)
})
