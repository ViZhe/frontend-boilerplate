
reload = $.browserSync.reload

# Cледим за изменениями
gulp.task 'watch', ->
    $.watch(config.style.watch, ->
        gulp.start ['stylus_dev', 'styleguide']
        return
    ).on('change', reload)
    $.watch(config.tpl.watch, ->
        gulp.start ['jade']
        return
    ).on('change', reload)
    $.watch(config.js.watch, ->
        gulp.start ['js_dev']
        return
    ).on('change', reload)
    $.watch(config.img.watch, ->
        gulp.start ['img_dev']
        return
    ).on('change', reload)
    return
