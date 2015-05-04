
nextAll: function (selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) return new Dom([]);
    while (el.nextElementSibling) {
        var next = el.nextElementSibling;
        if (selector) {
            if($(next).is(selector)) nextEls.push(next);
        }
        else nextEls.push(next);
        el = next;
    }
    return new Dom(nextEls);
},
