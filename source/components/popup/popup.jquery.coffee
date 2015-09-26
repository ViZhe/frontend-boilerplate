

##
#  for exampl: https://github.com/Toddish/Popup/blob/master/assets/js/jquery.popup.js
# http://vodkabears.github.io/remodal/#modal
##

hPopup = do ->
    init = ->
        $('body').on 'click', '.js-popup', openPopup

    overflow = ->
        outer = $('html')
        widthInner = outer.width()
        outer.addClass 'b-popup__outer'
        widthOuter = outer.width()
        width = widthOuter - widthInner + 'px'
        outer.css 'margin-right', width

    openPopup = ->
        overflow()
        el = $($(this).attr('data-popup'))
        content = el.html()
        $('body').prepend '<div class="b-popup">' +
            '<div class="b-popup__shadow"></div>' +
            '<div class="b-popup__inner"><div class="b-popup__content">' +
                '<div class="b-popup__close"></div>' +
                content +
            '</div></div></div>'
        $('body').off 'click', '.js-popup', openPopup

        setTimeout (->
            $('.b-popup').addClass 'b-popup_show'
        ), 100
        $('body').on 'click', '.b-popup__shadow, .b-popup__close', closePopup

    closePopup = ->
        $('body').off 'click', '.b-popup__shadow,
                                .b-popup__close', closePopup
        $('.b-popup_show').removeClass 'b-popup_show'
        setTimeout (->
            $('html').removeClass('b-popup__outer').removeAttr 'style'
            $('.b-popup').remove()
            $('body').on 'click', '.js-popup', openPopup
        ), 300

    {
        init: init # Start initialize module
    }

hPopup.init()
