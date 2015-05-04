
parents: function (selector) {
    var parents = [];
    for (var i = 0; i < this.length; i++) {
        var parent = this[i].parentNode;
        while (parent) {
            if (selector) {
                if ($(parent).is(selector)) parents.push(parent);
            }
            else {
                parents.push(parent);
            }
            parent = parent.parentNode;
        }
    }
    return $($.unique(parents));
},
