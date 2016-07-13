
import gulp from 'gulp'
import sequence from 'gulp-sequence'


gulp.task('html', callback => {
  return sequence(
    'html:data',
    'html:tpl'
  )(callback)
})
