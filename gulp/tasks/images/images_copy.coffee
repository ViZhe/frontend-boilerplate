
gulp.task 'images_copy', ->
    gulp.src(config.images.src.all)
        .pipe($.changed(config.images.dest))
        .pipe(gulp.dest(config.images.dest))
