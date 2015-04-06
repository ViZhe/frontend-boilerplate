
append: function (newChild) {
    var i, j;
    for (i = 0; i < this.length; i++) {
        if (typeof newChild === 'string') {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = newChild;
            while (tempDiv.firstChild) {
                this[i].appendChild(tempDiv.firstChild);
            }
        }
        else if (newChild instanceof Dom) {
            for (j = 0; j < newChild.length; j++) {
                this[i].appendChild(newChild[j]);
            }
        }
        else {
            this[i].appendChild(newChild);
        }
    }
    return this;
},
