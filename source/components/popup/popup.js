
$("[data-popup]").on("click", popup);

function popup() {
	$("[data-popup]").off("click", popup);
	var body = $("body");
	var widthInner = body.width();
	body.addClass("b-popup__body");
	var widthOuter = body.width();
	var width = widthOuter - widthInner +"px";
	body.css("margin-right", width)

	var el = $($(this).data().popup);

	el.prepend('<div class="b-popup__shadow"></div>');
	el.find(".b-popup__content").prepend('<div class="b-popup__close"></div>');

	if(el.find(".b-popup__content").height() > window.innerHeight){
		el.addClass("b-popup_big") ;
		$('.b-popup__shadow').css("margin-right", width)
	}
	el.addClass("b-popup_show") ;

	function close() {
		$(this).off("click", close);
		$(".b-popup_show").removeClass("b-popup_show");
		setTimeout(function() {
			body.removeClass("b-popup__body").removeAttr("style");
			$(".b-popup__close, .b-popup__shadow").remove();
			$("[data-popup]").on("click", popup);
		}, 300)
	};
	$(".b-popup__shadow, .b-popup__close").on("click", close);
};
