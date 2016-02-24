
gulp.task 'scripts_build', ->
    gulp.src(config.scripts.src.main)
        .pipe($.plumber())
        .pipe($.rigger())
        .pipe($.coffee())
        .pipe($.rigger())
        .pipe($.closureCompilerService(config.scripts.closureCompilerService))
        .pipe($.uglify())
        .pipe($.header(config.headerCat, config.version))
        .pipe(gulp.dest(config.scripts.dest.main))

    gulp.src(config.scripts.src.lib)
        .pipe($.plumber())
        .pipe($.closureCompilerService(config.scripts.closureCompilerService))
        .pipe($.uglify())
        .pipe(gulp.dest(config.scripts.dest.lib))
