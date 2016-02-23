
gulp.task 'images_build', ->
    gulp.src(config.images.src)
        .pipe($.teenypng('apikey': 'R0pdfmQ54wn5qqaERw6yUgWbuhBOqhty'))
        .pipe(gulp.dest(config.images.dest))
