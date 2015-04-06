
css: function (props, value) {
    var i;
    if (arguments.length === 1) {
        if (typeof props === 'string') {
            if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
        }
        else {
            for (i = 0; i < this.length; i++) {
                for (var prop in props) {
                    this[i].style[prop] = props[prop];
                }
            }
            return this;
        }
    }
    if (arguments.length === 2 && typeof props === 'string') {
        for (i = 0; i < this.length; i++) {
            this[i].style[props] = value;
        }
        return this;
    }
    return this;
},
