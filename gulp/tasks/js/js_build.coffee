
gulp.task 'js_build', ->
    gulp.src(config.js.src.main)
        .pipe($.plumber())
        .pipe($.rigger())
        .pipe($.coffee())
        .pipe($.rigger())
        .pipe($.closureCompilerService(
            compilation_level: 'SIMPLE_OPTIMIZATIONS'
        ))
        .pipe($.uglify())
        .pipe($.header(config.headerCat, config.version))
        .pipe(gulp.dest(config.js.dest.main))

    gulp.src(config.js.src.lib)
        .pipe($.plumber())
        .pipe($.closureCompilerService(
            compilation_level: 'SIMPLE_OPTIMIZATIONS'
        ))
        .pipe($.uglify())
        .pipe(gulp.dest(config.js.dest.lib))
