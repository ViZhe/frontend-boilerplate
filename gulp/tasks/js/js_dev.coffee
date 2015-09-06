
gulp.task 'js_dev', ->
    gulp.src(config.js.src.main)
        .pipe($.plumber())
        .pipe($.rigger())
        .pipe($.coffee())
        .pipe($.rigger())
        .pipe(gulp.dest(config.js.dest.main))

    gulp.src(config.js.src.lib)
        .pipe(gulp.dest(config.js.dest.lib))
