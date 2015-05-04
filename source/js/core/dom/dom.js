
var Dom = (function () {

    @@include('init.js')

    Dom.prototype = {
        // Classes
        @@include('classes/addClass.js')
        @@include('classes/removeClass.js')
        @@include('classes/hasClass.js')
        @@include('classes/toggleClass.js')

        // Attributes
        @@include('attributes/attr.js')
        @@include('attributes/removeAttr.js')
        @@include('attributes/prop.js')
        @@include('attributes/data.js')
        @@include('attributes/val.js')

        //Events
        @@include('events/on.js')
        @@include('events/off.js')
        @@include('events/trigger.js')

        // Styles
        @@include('styles/css.js')
        @@include('styles/hide.js')
        @@include('styles/show.js')

        // Unit
        @@include('unit/width.js')
        @@include('unit/height.js')
        @@include('unit/offset.js')
        @@include('unit/index.js')
        @@include('unit/indexOf.js')

        // Manipulation
        @@include('manipulation/append.js')
        @@include('manipulation/detach.js')
        @@include('manipulation/html.js')
        @@include('manipulation/prepend.js')
        @@include('manipulation/remove.js')
        @@include('manipulation/text.js')
        @@include('manipulation/insertAfter.js')
        @@include('manipulation/insertBefore.js')

        // Traversing
        @@include('traversing/add.js')
        @@include('traversing/children.js')
        @@include('traversing/each.js')
        @@include('traversing/eq.js')
        @@include('traversing/find.js')
        @@include('traversing/prev.js')
        @@include('traversing/prevAll.js')
        @@include('traversing/parent.js')
        @@include('traversing/parents.js')
        @@include('traversing/next.js')
        @@include('traversing/nextAll.js')
        @@include('traversing/is.js')
    };
    return $;
})();

var $ = Dom;

$.unique = function (arr) {
    var unique = [];
    for (var i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
    }
    return unique;
};

$.toCamelCase = function (string) {
    return string.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
};
