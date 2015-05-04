
index: function () {
    if (this[0]) {
        var child = this[0];
        var i = 0;
        while ((child = child.previousSibling) !== null) {
            if (child.nodeType === 1) i++;
        }
        return i;
    }
    else return undefined;
},
