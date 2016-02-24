
gulp.task 'images_build', ->
    gulp.src(config.images.src)
        .pipe($.tinypngCompress(config.images.tinypngCompress))
        .pipe(gulp.dest(config.images.dest))
