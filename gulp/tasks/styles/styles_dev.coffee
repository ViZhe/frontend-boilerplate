
gulp.task 'styles_dev', ->
    gulp.src(config.styles.src.main)
        .pipe($.plumber(config.plumber))
        .pipe($.stylus(
            'use':
                $.poststylus([
                    $.postcssSvg(
                        ei: false
                    )
                ])
        ))
        .pipe($.base64(config.styles.base64.fonts))
        .pipe($.autoprefixer(config.styles.autoprefixer))
        .pipe($.combineMq())
        .pipe(gulp.dest(config.styles.dest))

    gulp.src(config.styles.src.fonts)
        .pipe($.plumber(config.plumber))
        .pipe($.stylus())
        .pipe($.base64(config.styles.base64.fonts))
        .pipe($.autoprefixer(config.styles.autoprefixer))
        .pipe(gulp.dest(config.styles.dest))
