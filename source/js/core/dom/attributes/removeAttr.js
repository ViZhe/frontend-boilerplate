
removeAttr: function (attr) {
    for (var i = 0; i < this.length; i++) {
        this[i].removeAttribute(attr);
    }
    return this;
},
