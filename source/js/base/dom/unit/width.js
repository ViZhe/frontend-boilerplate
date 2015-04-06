
width: function () {
    if (this[0] === window) {
        return window.innerWidth;
    }
    else {
        if (this.length > 0) {
            return parseFloat(this.css('width'));
        }
        else {
            return null;
        }
    }
},
