
import gulp from 'gulp'
import sequence from 'gulp-sequence'


gulp.task('dev', callback => {
  return sequence(
    'clean',
    'dev:images',
    ['dev:styles', 'html', 'dev:scripts']
  )(callback)
})
