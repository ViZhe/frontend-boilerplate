
gulp.task 'styles_dev', ->
    gulp.src(config.styles.src.main)
        .pipe($.plumber())
        .pipe($.stylus(
            'use': $.svgStylus()
        ))
        .pipe($.base64(
            extensions: ['woff']
            maxImageSize: 1024 * 1024 * 10 # 10 mb
        ))
        .pipe($.autoprefixer(
            browser: config.styles.autoprefixer.browser
        ))
        .pipe(gulp.dest(config.styles.dest))

    gulp.src(config.styles.src.fonts)
        .pipe($.plumber())
        .pipe($.stylus())
        .pipe($.base64(
            extensions: ['woff']
            maxImageSize: 1024 * 1024 * 10 # 10 mb
        ))
        .pipe($.autoprefixer(
            browser: config.styles.autoprefixer.browser
        ))
        .pipe(gulp.dest(config.styles.dest))
