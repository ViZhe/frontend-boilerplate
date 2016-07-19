
const hopPopup = function () {
  class Popup {
    constructor() {
      $('body').on('click', '.js-popup', Popup.openPopup)
    }
    static overflow() {
      const $html = $('html')
      const widthInner = $html.width()
      $html.addClass('c-popup__outer')
      const widthOuter = $html.width()
      $html.css('margin-right', widthOuter - widthInner + 'px')
    }
    static openPopup() {
      Popup.overflow()
      const elem = $($(this).attr('data-popup'))
      const content = elem.html()
      $('body').prepend(`<div class="c-popup">
        <div class="c-popup__shadow"></div>
        <div class="c-popup__inner">
          <div class="c-popup__content">
            <div class="c-popup__close"></div>
            ${content}
          </div>
        </div>
      </div>`)
      $('body').off('click', '.js-popup', Popup.openPopup)
      setTimeout((() => {
        $('.c-popup').addClass('c-popup_show')
      }), 100)
      $('body').on('click', '.c-popup__shadow, .c-popup__close', Popup.closePopup)
    }
    static closePopup(e) {
      $('body').off('click', '.c-popup__shadow, .c-popup__close', Popup.closePopup)
      $('.c-popup_show').removeClass('c-popup_show')
      setTimeout((() => {
        $('html').removeClass('c-popup__outer').removeAttr('style')
        $('.c-popup').remove()
        $('body').on('click', '.js-popup', Popup.openPopup)
      }), 300)
    }
  }
  return new Popup()
}

hopPopup()
