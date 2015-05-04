
prevAll: function (selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) return new Dom([]);
    while (el.previousElementSibling) {
        var prev = el.previousElementSibling;
        if (selector) {
            if($(prev).is(selector)) prevEls.push(prev);
        }
        else prevEls.push(prev);
        el = prev;
    }
    return new Dom(prevEls);
},
