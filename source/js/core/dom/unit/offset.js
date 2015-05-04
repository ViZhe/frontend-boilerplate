
offset: function () {
    if (this.length > 0) {
        var el = this[0];
        var box = el.getBoundingClientRect();
        var body = document.body;
        var clientTop  = el.clientTop  || body.clientTop  || 0;
        var clientLeft = el.clientLeft || body.clientLeft || 0;
        var scrollTop  = window.pageYOffset || el.scrollTop;
        var scrollLeft = window.pageXOffset || el.scrollLeft;
        return {
            top: box.top  + scrollTop  - clientTop,
            left: box.left + scrollLeft - clientLeft
        };
    }
    else {
        return null;
    }
},
