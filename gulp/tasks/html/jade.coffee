
gulp.task 'jade', ->
    gulp.src(config.tpl.src)
        .pipe($.plumber())
        .pipe($.jade(
            pretty: '    '
        ))
        .pipe(gulp.dest(config.tpl.dest))
