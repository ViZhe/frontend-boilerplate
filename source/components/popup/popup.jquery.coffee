
class Popup
    constructor: ->
        items = $('.js-popup')
        items.each ->
            el = $($(this).attr('data-popup'))
            content = el.html()
            el.html '<div class="b-popup__inner">' +
            '<div class="b-popup__content"><div class="b-popup__close">' +
            '</div>' + content + '</div></div>'
        items.on 'click', @.show

    overflow: ->
        outer = $('html')
        widthInner = outer.width()
        outer.addClass 'b-popup__outer'
        widthOuter = outer.width()
        width = widthOuter - widthInner + 'px'
        outer.css 'margin-right', width

    show: ->
        popup.overflow()
        $('.js-popup').off 'click', popup.show
        el = $($(this).attr('data-popup'))
        el.addClass 'b-popup_show'
        $('.b-popup__inner, .b-popup__close').on 'click', popup.hide

    hide: (e) ->
        if $(e.target).is('.b-popup__inner, .b-popup__close')
            $('.b-popup__inner, .b-popup__close').off 'click', popup.hide
            $('.b-popup_show').removeClass 'b-popup_show'
            setTimeout (->
                $('html').removeClass('b-popup__outer').removeAttr 'style'
                $('.js-popup').on 'click', popup.show), 300

popup = new Popup
