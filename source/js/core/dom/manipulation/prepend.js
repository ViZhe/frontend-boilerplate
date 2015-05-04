
prepend: function (newChild) {
    var i, j;
    for (i = 0; i < this.length; i++) {
        if (typeof newChild === 'string') {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = newChild;
            for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
            }
            // this[i].insertAdjacentHTML('afterbegin', newChild);
        }
        else if (newChild instanceof Dom) {
            for (j = 0; j < newChild.length; j++) {
                this[i].insertBefore(newChild[j], this[i].childNodes[0]);
            }
        }
        else {
            this[i].insertBefore(newChild, this[i].childNodes[0]);
        }
    }
    return this;
},
