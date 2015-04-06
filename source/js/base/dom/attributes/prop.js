
prop: function (props, value) {
    if (arguments.length === 1 && typeof props === 'string') {
        // Get prop
        if (this[0]) return this[0][props];
        else return undefined;
    }
    else {
        // Set props
        for (var i = 0; i < this.length; i++) {
            if (arguments.length === 2) {
                // String
                this[i][props] = value;
            }
            else {
                // Object
                for (var propName in props) {
                    this[i][propName] = props[propName];
                }
            }
        }
        return this;
    }
},
