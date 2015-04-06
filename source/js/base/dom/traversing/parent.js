
parent: function (selector) {
    var parents = [];
    for (var i = 0; i < this.length; i++) {
        if (selector) {
            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
        }
        else {
            parents.push(this[i].parentNode);
        }
    }
    return $($.unique(parents));
},
