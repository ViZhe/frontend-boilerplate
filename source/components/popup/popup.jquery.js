
// TODO: Rewrite it

const hPopup = (() => {
  var closePopup, init, openPopup, overflow
  init = () => {
    $('body').on('click', '.js-popup', openPopup)
  }
  overflow = () => {
    var outer, width, widthInner, widthOuter
    outer = $('html')
    widthInner = outer.width()
    outer.addClass('c-popup__outer')
    widthOuter = outer.width()
    width = widthOuter - widthInner + 'px'
    outer.css('margin-right', width)
  }
  openPopup = () => {
    var content, el
    overflow()
    el = $($(this).attr('data-popup'))
    content = el.html()
    $('body').prepend(`<div class="c-popup">
      <div class="c-popup__shadow"></div>
      <div class="c-popup__inner">
        <div class="c-popup__content">
          <div class="c-popup__close"></div>
          ${content}
        </div>
      </div>
    </div>`)
    $('body').off('click', '.js-popup', openPopup)
    setTimeout((() => {
      $('.c-popup').addClass('c-popup_show')
    }), 100)
    $('body').on('click', '.c-popup__shadow, .c-popup__close', closePopup)
  }
  closePopup = () => {
    $('body').off('click', '.c-popup__shadow, .c-popup__close', closePopup)
    $('.c-popup_show').removeClass('c-popup_show')
    setTimeout((() => {
      $('html').removeClass('c-popup__outer').removeAttr('style')
      $('.c-popup').remove()
      $('body').on('click', '.js-popup', openPopup)
    }), 300)
  }
  return {
    init
  }
})()

hPopup.init()
