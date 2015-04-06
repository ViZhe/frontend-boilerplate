
html: function (html) {
    if (typeof html === 'undefined') {
        return this[0] ? this[0].innerHTML : undefined;
    }
    else {
        for (var i = 0; i < this.length; i++) {
            this[i].innerHTML = html;
        }
        return this;
    }
},
