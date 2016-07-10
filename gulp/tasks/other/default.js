
import gulp from 'gulp'
import sequence from 'gulp-sequence'


gulp.task('default', callback => {
  return sequence(
    ['dev'],
    ['watch'],
    ['browser-sync']
  )(callback)
})
