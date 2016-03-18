
gulp.task 'images_dev', ->
    gulp.src(config.images.src.all)
        .pipe($.changed(config.images.dest))
        .pipe(gulp.dest(config.images.dest))
