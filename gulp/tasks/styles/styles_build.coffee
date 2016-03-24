
gulp.task 'styles_build', ->
    gulp.src(config.styles.src.main)
        .pipe($.plumber(config.plumber))
        .pipe($.stylus(
            'use':
                $.poststylus([
                    $.postcssSvg(
                        ei: false
                        svgo: true
                    )
                ])
        ))
        .pipe($.base64(config.styles.base64.fonts))
        .pipe($.cssUrlAdjuster(
            replace: ['../img/', '../../app/frontend/img/']
        ))
        .pipe($.base64(
            extensions: ['png', 'svg', 'jpg']
            maxImageSize: 1024 * 10 # 10 kb
        ))
        .pipe($.cssUrlAdjuster(
            replace: ['../../app/frontend/img/', '../img/']
        ))
        .pipe($.autoprefixer(config.styles.autoprefixer))
        .pipe($.combineMq())
        .pipe($.cssnano())
        .pipe($.header(config.headerCat, config.version))
        .pipe(gulp.dest(config.styles.dest))

    gulp.src(config.styles.src.fonts)
        .pipe($.plumber(config.plumber))
        .pipe($.stylus())
        .pipe($.base64(config.styles.base64.fonts))
        .pipe($.autoprefixer(config.styles.autoprefixer))
        .pipe($.cssnano(
            discardUnused:
                fontFace: false
        ))
        .pipe(gulp.dest(config.styles.dest))
