
children: function (selector) {
    var children = [];
    for (var i = 0; i < this.length; i++) {
        var childNodes = this[i].childNodes;

        for (var j = 0; j < childNodes.length; j++) {
            if (!selector) {
                if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
            }
            else {
                if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
            }
        }
    }
    return new Dom($.unique(children));
},
