
gulp.task 'img_dev', ->
    gulp.src(config.img.src)
        .pipe($.changed(config.img.dest))
        .pipe(gulp.dest(config.img.dest))
