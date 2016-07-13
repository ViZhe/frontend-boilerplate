
import gulp from 'gulp'
import sequence from 'gulp-sequence'


gulp.task('build', callback => {
  return sequence(
      'clean',
      'build:images',
      ['build:styles', 'html', 'build:scripts'],
      'styleguide'
    )(callback)
})
