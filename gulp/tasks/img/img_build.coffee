
gulp.task 'img_build', ->
    gulp.src(config.img.src)
        .pipe($.teenypng('apikey': '0Q30pqGuD4mYEKXFcCzCXbgXK6MWK7rR'))
        .pipe(gulp.dest(config.img.dest))
