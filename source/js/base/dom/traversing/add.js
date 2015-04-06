
add: function () {
    var dom = this;
    var i, j;
    for (i = 0; i < arguments.length; i++) {
        var toAdd = $(arguments[i]);
        for (j = 0; j < toAdd.length; j++) {
            dom[dom.length] = toAdd[j];
            dom.length++;
        }
    }
    return dom;
},
