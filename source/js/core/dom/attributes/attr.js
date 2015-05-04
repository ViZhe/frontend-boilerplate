
attr: function (attrs, value) {
    if (arguments.length === 1 && typeof attrs === 'string') {
        // Get attr
        if (this[0]) return this[0].getAttribute(attrs);
        else return undefined;
    }
    else {
        // Set attrs
        for (var i = 0; i < this.length; i++) {
            if (arguments.length === 2) {
                // String
                this[i].setAttribute(attrs, value);
            }
            else {
                // Object
                for (var attrName in attrs) {
                    this[i][attrName] = attrs[attrName];
                    this[i].setAttribute(attrName, attrs[attrName]);
                }
            }
        }
        return this;
    }
},
