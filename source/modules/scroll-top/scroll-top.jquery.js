
(($, window, document) => {
  const backToTop = $('.js-scroll-top')

  $(window).on('scroll', () => {
    const scrollTop = $(document).scrollTop()
    if (scrollTop > 100) {
      backToTop.addClass('m-scroll-top_show')
    } else {
      backToTop.removeClass('m-scroll-top_show')
    }
  })

  backToTop.on('click', () => {
    $('body, html').animate({
      scrollTop: 0
    }, 700)
  })
})(jQuery, window, document)
