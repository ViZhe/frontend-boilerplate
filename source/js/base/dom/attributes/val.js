
val: function (value) {
    if (typeof value === 'undefined') {
        if (this[0]) return this[0].value;
        else return undefined;
    }
    else {
        for (var i = 0; i < this.length; i++) {
            this[i].value = value;
        }
        return this;
    }
},
