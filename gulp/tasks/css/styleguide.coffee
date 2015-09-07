
gulp.task 'styleguide', ->
    gulp.src(config.docs.src)
        .pipe($.plumber())
        .pipe($.stylus())
        .pipe($.styledown(
            config: './source/docs/config.styl'
            filename: 'index.html'
            indentSize: 4
        ))
        .pipe(gulp.dest(config.docs.dest))
