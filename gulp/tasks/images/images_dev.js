
gulp.task('images_dev', () => {
  return gulp.src(config.images.src)
    .pipe($.changed(config.images.dest))
    .pipe(gulp.dest(config.images.dest))
})
