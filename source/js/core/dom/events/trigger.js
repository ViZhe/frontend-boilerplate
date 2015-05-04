
trigger: function (eventName, eventData) {
    for (var i = 0; i < this.length; i++) {
        var evt;
        try {
            evt = new CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
        }
        catch (e) {
            evt = document.createEvent('Event');
            evt.initEvent(eventName, true, true);
            evt.detail = eventData;
        }
        this[i].dispatchEvent(evt);
    }
    return this;
},
