
height: function () {
    if (this[0] === window) {
        return window.innerHeight;
    }
    else {
        if (this.length > 0) {
            return parseFloat(this.css('height'));
        }
        else {
            return null;
        }
    }
},
