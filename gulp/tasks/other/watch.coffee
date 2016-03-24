
gulp.task 'watch', ->
    $.watch config.styles.watch, ->
        gulp.start ['styles_dev']
        return

    $.watch config.html.watch, ->
        gulp.start ['html']
        return

    $.watch config.scripts.watch, ->
        gulp.start ['scripts_dev']
        return

    $.watch config.images.watch, ->
        gulp.start ['images_dev']
        return

    return
