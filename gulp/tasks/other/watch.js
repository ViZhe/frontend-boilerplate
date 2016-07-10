
gulp.task('watch', () => {
  $.watch(config.styles.watch, () => {
    gulp.start(['styles_dev'])
  })

  $.watch(config.html.watch, () => {
    gulp.start(['html'])
  })

  $.watch(config.scripts.watch, () => {
    gulp.start(['scripts_dev'])
  })

  $.watch(config.images.watch, () => {
    gulp.start(['images_dev'])
  })
})
