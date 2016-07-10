
gulp.task('default', callback => {
  return $.sequence(
    ['dev'],
    ['watch'],
    ['browser-sync']
  )(callback)
})
