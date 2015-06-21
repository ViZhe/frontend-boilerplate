
$('.b-form').on('change', '.b-form__radio input', function () {
    var it = $(this),
        propName = it.attr('name');

    $('[name="' + propName + '"]')
        .parent()
        .removeClass('b-form__radio_checked');
    it.parent().addClass('b-form__radio_checked');
});

$('.b-form').on('change', '.b-form__checkbox input', function () {
    var it = $(this),
        parent = it.parent();
    if (it.prop('checked')) {
        parent.addClass('b-form__checkbox_checked');
    } else {
        parent.removeClass('b-form__checkbox_checked');
    }
});
