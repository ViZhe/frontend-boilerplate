
gulp.task 'images_build', ->
    gulp.src(config.images.src)
        .pipe($.imagemin(config.images.imagemin))
        .pipe(gulp.dest(config.images.dest))
