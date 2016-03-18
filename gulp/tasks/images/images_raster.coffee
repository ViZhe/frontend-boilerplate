
gulp.task 'images_raster', ->
    gulp.src(config.images.src.raster)
        .pipe($.tinypngCompress(config.images.tinypngCompress))
        .pipe(gulp.dest(config.images.dest))
