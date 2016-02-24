
gulp.task 'clean', ->
    $.del.sync(
        config.dest
        force: true
    )
