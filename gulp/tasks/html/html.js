
gulp.task('html', callback => {
  return $.sequence(
    ['html_data'],
    ['html_tpl']
  )(callback)
})
