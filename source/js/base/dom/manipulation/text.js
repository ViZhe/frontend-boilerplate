
text: function (text) {
    if (typeof text === 'undefined') {
        if (this[0]) {
            return this[0].textContent.trim();
        }
        else return null;
    }
    else {
        for (var i = 0; i < this.length; i++) {
            this[i].textContent = text;
        }
    }
},
