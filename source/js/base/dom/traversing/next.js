
next: function (selector) {
    if (this.length > 0) {
        if (selector) {
            if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom([this[0].nextElementSibling]);
            else return new Dom([]);
        }
        else {
            if (this[0].nextElementSibling) return new Dom([this[0].nextElementSibling]);
            else return new Dom([]);
        }
    }
    else return new Dom([]);
},
