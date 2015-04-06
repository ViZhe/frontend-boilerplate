
insertBefore: function (selector) {
    var before = $(selector);
    for (var i = 0; i < this.length; i++) {
        if (before.length === 1) {
            before[0].parentNode.insertBefore(this[i], before[0]);
        }
        else if (before.length > 1) {
            for (var j = 0; j < before.length; j++) {
                before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
            }
        }
    }
},
