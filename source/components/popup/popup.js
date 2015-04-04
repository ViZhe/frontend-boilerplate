var popup = (function() {
	var body = document.querySelector("body");
 	return {
		scrollWidth: function(act) {
			if(act == "show"){
				let b = body.offsetWidth;
				body.classList.add("b-popup__body");
				let c = body.offsetWidth;
				let scrollWidth = c - b + "px";
				body.style.marginRight = scrollWidth;
			} else {
				body.classList.remove("b-popup__body");
				body.style.marginRight = 0;
			}
		},
		createdAddElem: function(elem, parent) {
			let newItem = document.createElement("div");
			newItem.className = elem;
			parent.insertBefore(newItem, parent.firstChild);
			popup.addEvent(elem);
		},
		removeElem: function(elem) {
			document.querySelector(elem).parentNode.removeChild(document.querySelector(elem));
		},
		addEvent: function(elem) {
			document.querySelector("."+elem).addEventListener("click", function(e) {
				popup.hide();
			});
		},
		show: function() {
			let e = this.getAttribute('data-popup');
			let itemInner = document.querySelector(e + " .b-popup__inner");
			let itemContent = document.querySelector(e + " .b-popup__content");
			popup.createdAddElem("b-popup__shadow", itemInner);
			popup.createdAddElem("b-popup__close", itemContent);
			popup.scrollWidth("show");
			document.querySelector(e).classList.add("b-popup_show");
		},
		hide: function() {
			document.querySelector('.b-popup_show').classList.remove("b-popup_show");
			popup.scrollWidth();
			popup.removeElem(".b-popup__shadow");
			popup.removeElem(".b-popup__close");
		}
 	};
})();

var popupShowEl = document.querySelectorAll("[data-popup]");
for(var i = 0; i < popupShowEl.length; i++) {
	popupShowEl[i].onclick = popup.show;
}
