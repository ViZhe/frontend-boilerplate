
import gulp from 'gulp'
import watch from 'gulp-watch'

import config from '../../config'


gulp.task('watch', () => {
  watch(config.styles.watch, () => {
    gulp.start(['styles_dev'])
  })

  watch(config.html.watch, () => {
    gulp.start(['html'])
  })

  watch(config.scripts.watch, () => {
    gulp.start(['scripts_dev'])
  })

  watch(config.images.watch, () => {
    gulp.start(['images_dev'])
  })
})
