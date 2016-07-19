
const hopScrollTop = function () {
  const selector = $('.js-scroll-top')

  $(window).on('scroll', () => {
    const scrollTop = $(document).scrollTop()
    if (scrollTop > 100) {
      selector.addClass('m-scroll-top_show')
    } else {
      selector.removeClass('m-scroll-top_show')
    }
  })

  selector.on('click', () => {
    $('body, html').animate({
      scrollTop: 0
    }, 700)
  })
}

hopScrollTop()
