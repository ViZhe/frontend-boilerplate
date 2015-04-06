
on: function (eventName, targetSelector, listener, capture) {
    function handleLiveEvent(e) {
        var target = e.target;
        if ($(target).is(targetSelector)) listener.call(target, e);
        else {
            var parents = $(target).parents();
            for (var k = 0; k < parents.length; k++) {
                if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
            }
        }
    }
    var events = eventName.split(' ');
    var i, j;
    for (i = 0; i < this.length; i++) {
        if (typeof targetSelector === 'function' || targetSelector === false) {
            // Usual events
            if (typeof targetSelector === 'function') {
                listener = arguments[1];
                capture = arguments[2] || false;
            }
            for (j = 0; j < events.length; j++) {
                this[i].addEventListener(events[j], listener, capture);
            }
        }
        else {
            //Live events
            for (j = 0; j < events.length; j++) {
                if (!this[i].domLiveListeners) this[i].domLiveListeners = [];
                this[i].domLiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                this[i].addEventListener(events[j], handleLiveEvent, capture);
            }
        }
    }

    return this;
},
