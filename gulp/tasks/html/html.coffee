
gulp.task 'html', (callback) ->
    $.sequence(
        ['html_data']
        ['html_tpl']
    ) callback
