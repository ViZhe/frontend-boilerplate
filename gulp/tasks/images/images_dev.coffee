
gulp.task 'images_dev', (callback) ->
    $.sequence(
        ['images_copy']
        ['images_vector']
    ) callback
