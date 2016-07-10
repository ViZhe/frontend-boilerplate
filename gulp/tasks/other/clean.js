
// add import config

gulp.task('clean', () => {
  return $.del.sync(config.dest, {
    force: true
  })
})
