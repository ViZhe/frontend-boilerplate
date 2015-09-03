
gulp.task 'stylus_dev', ->
    gulp.src(config.style.src.main)
        .pipe($.plumber())
        .pipe($.stylus())
        .pipe($.base64(
            extensions: ['woff']
            maxImageSize: 1024 * 1024 * 10 # 10 mb
        ))
        .pipe($.cssUrlAdjuster(
            replace: ['../../img/', '../img/']
        ))
        .pipe($.autoprefixer(
            browser: ['> 5%', 'last 2 versions']
        ))
        .pipe(gulp.dest(config.style.dest))

    gulp.src(config.style.src.fonts)
        .pipe($.plumber())
        .pipe($.stylus())
        .pipe($.base64(
            extensions: ['woff']
            maxImageSize: 1024 * 1024 * 10 # 10 mb
        ))
        .pipe($.autoprefixer(
            browser: ['> 5%', 'last 2 versions']
        ))
        .pipe(gulp.dest(config.style.dest))
