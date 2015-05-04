
toggleClass: function (className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i++) {
        for (var j = 0; j < this.length; j++) {
            if (typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
        }
    }
    return this;
},
