
remove: function () {
    for (var i = 0; i < this.length; i++) {
        if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
    }
    return this;
},
