
reload = $.browserSync.reload

# Cледим за изменениями
gulp.task 'watch', ->
    $.watch config.style.watch, ->
        gulp.start ['stylus_dev', 'styleguide']
        return
    $.watch config.tpl.watch, ->
        gulp.start ['jade']
        return
    $.watch config.js.watch, ->
        gulp.start ['js_dev']
        return
    $.watch config.img.watch, ->
        gulp.start ['img_dev']
        return
    $.watch 'app/**/*', ->
        reload()
        return
    return
