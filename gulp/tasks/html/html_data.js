
gulp.task('html_data', () => {
  return gulp.src(config.html.data.src)
  .pipe($.plumber(config.plumber))
  .pipe($.mergeJson(config.html.data.fileName))
  .pipe(gulp.dest(config.html.data.dest))
})
