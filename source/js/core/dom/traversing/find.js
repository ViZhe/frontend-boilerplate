
find : function (selector) {
    var foundElements = [];
    for (var i = 0; i < this.length; i++) {
        var found = this[i].querySelectorAll(selector);
        for (var j = 0; j < found.length; j++) {
            foundElements.push(found[j]);
        }
    }
    return new Dom(foundElements);
},
