
import gulp from 'gulp'
import sequence from 'gulp-sequence'


gulp.task('build', callback => {
  return sequence(
      ['clean'],
      ['images_build'],
      ['styles_build', 'html', 'scripts_build'],
      ['styleguide']
    )(callback)
})
