
gulp.task 'html_data', ->
    gulp.src(config.html.data.src)
        .pipe($.plumber())
        .pipe($.mergeJson(config.html.data.fileName))
        .pipe(gulp.dest(config.html.data.dest))
