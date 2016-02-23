
gulp.task 'default', (callback) ->
    $.sequence(
        ['dev']
        ['watch']
        ['browser-sync']
    ) callback
