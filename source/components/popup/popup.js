
$("[data-popup]").on("click", function() {
	var body = $("body");
	var widthInner = body.width();
	body.addClass("b-popup__body");
	var widthOuter = body.width();
	body.css("margin-right", widthOuter - widthInner +"px")

	var el = $(this).data().popup;
	var content = $(el).html();
	$(el).html('<div class="b-popup__inner"><div class="b-popup__shadow"></div><div class="b-popup__content"></div></div>');
	$(".b-popup__content").html(content).prepend('<div class="b-popup__close"></div>');

	setTimeout(function() { $(el).addClass("b-popup_show") }, 50)

	$(".b-popup__shadow, .b-popup__close").on("click", function() {
		body.removeClass("b-popup__body").removeAttr("style");
		$(".b-popup__close").remove();
		$(".b-popup_show").html(content).removeClass("b-popup_show");
	});
});
