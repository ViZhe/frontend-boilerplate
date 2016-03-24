
gulp.task 'scripts_dev', ->
    gulp.src(config.scripts.src.main)
        .pipe($.plumber(config.plumber))
        .pipe($.rigger())
        .pipe($.coffee())
        .pipe($.rigger())
        .pipe(gulp.dest(config.scripts.dest.main))

    gulp.src(config.scripts.src.lib)
        .pipe(gulp.dest(config.scripts.dest.lib))
