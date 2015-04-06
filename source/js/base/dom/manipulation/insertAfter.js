
insertAfter: function (selector) {
    var after = $(selector);
    for (var i = 0; i < this.length; i++) {
        if (after.length === 1) {
            after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
        }
        else if (after.length > 1) {
            for (var j = 0; j < after.length; j++) {
                after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
            }
        }
    }
},
