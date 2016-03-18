
gulp.task 'images_build', (callback) ->
    $.sequence(
        ['images_raster']
        ['images_vector']
    ) callback
