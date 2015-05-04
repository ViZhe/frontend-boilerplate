
is: function (selector) {
    if (!this[0] || typeof selector === 'undefined') return false;
    var compareWith, i;
    if (typeof selector === 'string') {
        var el = this[0];
        if (el === document) return selector === document;
        if (el === window) return selector === window;

        if (el.matches) return el.matches(selector);
        else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
        else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
        else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
        else {
            compareWith = $(selector);
            for (i = 0; i < compareWith.length; i++) {
                if (compareWith[i] === this[0]) return true;
            }
            return false;
        }
    }
    else if (selector === document) return this[0] === document;
    else if (selector === window) return this[0] === window;
    else {
        if (selector.nodeType || selector instanceof Dom) {
            compareWith = selector.nodeType ? [selector] : selector;
            for (i = 0; i < compareWith.length; i++) {
                if (compareWith[i] === this[0]) return true;
            }
            return false;
        }
        return false;
    }

},
