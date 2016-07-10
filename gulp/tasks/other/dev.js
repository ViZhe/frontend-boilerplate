
gulp.task('dev', callback => {
  return $.sequence(
    ['clean'],
    ['images_dev'],
    ['styles_dev', 'html', 'scripts_dev']
  )(callback)
})
