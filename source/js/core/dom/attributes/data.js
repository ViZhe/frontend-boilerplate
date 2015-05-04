
data: function () {
    var el = this[0];
    if (el) {
        var dataset = {};
        if (el.dataset) {
            for (var dataKey in el.dataset) {
                dataset[dataKey] = el.dataset[dataKey];
            }
        }
        else {
            for (var i = 0; i < el.attributes.length; i++) {
                var attr = el.attributes[i];
                if (attr.name.indexOf('data-') >= 0) {
                    dataset[$.toCamelCase(attr.name.split('data-')[1])] = attr.value;
                }
            }
        }
        for (var key in dataset) {
            if (dataset[key] === 'false') dataset[key] = false;
            else if (dataset[key] === 'true') dataset[key] = true;
            else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] = dataset[key] * 1;
        }
        return dataset;
    }
    else return undefined;
},
