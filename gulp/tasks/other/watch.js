
import gulp from 'gulp'
import watch from 'gulp-watch'

import config from '../../config'


gulp.task('watch', () => {
  watch(config.styles.watch, () => {
    gulp.start(['dev:styles'])
  })

  watch(config.html.watch, () => {
    gulp.start(['html'])
  })

  watch(config.scripts.watch, () => {
    gulp.start(['dev:scripts'])
  })

  watch(config.images.watch, () => {
    gulp.start(['dev:images'])
  })
})
