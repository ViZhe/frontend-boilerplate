
gulp.task 'images_vector', ->
    gulp.src(config.images.src.vector)
        .pipe($.svgmin())
        .pipe(gulp.dest(config.images.dest.vector))
        .pipe(gulp.dest(config.images.dest.default))
