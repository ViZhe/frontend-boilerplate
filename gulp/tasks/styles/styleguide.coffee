
gulp.task 'styleguide', ->
    gulp.src(config.docs.src)
        .pipe($.plumber())
        .pipe($.stylus(
            'use':
                $.poststylus([
                    $.postcssSvg(
                        ei: false
                    )
                ])
        ))
        .pipe($.styledown(
            config: './source/docs/config.styl'
            filename: 'index.html'
            indentSize: 4
        ))
        .pipe(gulp.dest(config.docs.dest))
