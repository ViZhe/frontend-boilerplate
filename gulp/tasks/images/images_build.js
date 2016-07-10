
import gulp from 'gulp'
import imagemin from 'gulp-imagemin'

import config from '../../config'


gulp.task('images_build', () => {
  return gulp.src(config.images.src)
    .pipe(imagemin(config.images.imagemin))
    .pipe(gulp.dest(config.images.dest))
})
