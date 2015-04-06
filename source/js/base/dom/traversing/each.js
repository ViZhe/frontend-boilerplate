
each: function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback.call(this[i], i, this[i]);
    }
    return this;
},
