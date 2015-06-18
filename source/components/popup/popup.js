
(function () {
    'use strict';

	var body,
		_this,
		elHide,
		items = $('.js-popup');

	var popup = {
		init: function () {
			body = $('body');
			_this = this;
			items.each( function () {
				var el = $($(this).attr('data-popup'));
				var content = el.html();
				el.html('<div class="b-popup__inner">' +
                '<div class="b-popup__content"><div class="b-popup__close">' +
                '</div>' + content + '</div></div>');
			});
			elHide = $('.b-popup__inner, .b-popup__close');
			items.on('click', _this.show);
		},
		body: function () {
			var widthInner = body.width();
			body.addClass('b-popup__body');
			var widthOuter = body.width();
			var width = widthOuter - widthInner + 'px';
			body.css('margin-right', width);
		},
		show: function () {
			_this.body();
			items.off('click', popup.show);
			var el = $($(this).attr('data-popup'));
			el.addClass('b-popup_show');
			elHide.on('click', _this.hide);
		},
		hide: function (e) {
			if ( $(e.target).is('.b-popup__inner, .b-popup__close') ) {
				elHide.off('click', _this.hide);
				$('.b-popup_show').removeClass('b-popup_show');
				setTimeout( function() {
					body.removeClass('b-popup__body').removeAttr('style');
					items.on('click', popup.show);
				}, 300);
			}
		}
	};
	popup.init();
})();
