
prev: function (selector) {
    if (this.length > 0) {
        if (selector) {
            if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom([this[0].previousElementSibling]);
            else return new Dom([]);
        }
        else {
            if (this[0].previousElementSibling) return new Dom([this[0].previousElementSibling]);
            else return new Dom([]);
        }
    }
    else return new Dom([]);
},
