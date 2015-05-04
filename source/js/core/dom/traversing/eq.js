
eq: function (index) {
    if (typeof index === 'undefined') return this;
    var length = this.length;
    var returnIndex;
    if (index > length - 1) {
        return new Dom([]);
    }
    if (index < 0) {
        returnIndex = length + index;
        if (returnIndex < 0) return new Dom([]);
        else return new Dom([this[returnIndex]]);
    }
    return new Dom([this[index]]);
},
