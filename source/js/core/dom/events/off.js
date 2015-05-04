
off: function (eventName, targetSelector, listener, capture) {
    var events = eventName.split(' ');
    for (var i = 0; i < events.length; i++) {
        for (var j = 0; j < this.length; j++) {
            if (typeof targetSelector === 'function' || targetSelector === false) {
                // Usual events
                if (typeof targetSelector === 'function') {
                    listener = arguments[1];
                    capture = arguments[2] || false;
                }
                this[j].removeEventListener(events[i], listener, capture);
            }
            else {
                // Live event
                if (this[j].domLiveListeners) {
                    for (var k = 0; k < this[j].domLiveListeners.length; k++) {
                        if (this[j].domLiveListeners[k].listener === listener) {
                            this[j].removeEventListener(events[i], this[j].domLiveListeners[k].liveListener, capture);
                        }
                    }
                }
            }
        }
    }
    return this;
},
