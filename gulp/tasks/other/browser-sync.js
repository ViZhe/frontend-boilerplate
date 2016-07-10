
import gulp from 'gulp'
import browserSync from 'browser-sync'

import config from '../../config'


gulp.task('browser-sync', () => {
  return browserSync({
    files: config.dest,
    server: {
      baseDir: config.dest
    }
  })
})
