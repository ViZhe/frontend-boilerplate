
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import stylus from 'gulp-stylus'
import poststylus from 'poststylus'
import postcssSvg from 'postcss-svg'
import base64 from 'gulp-base64'
import autoprefixer from 'gulp-autoprefixer'
import combineMq from 'gulp-combine-mq'

import config from '../../config'


gulp.task('dev:styles', () => {
  gulp.src(config.styles.src.main)
    .pipe(plumber(config.plumber))
    .pipe(stylus({
      use: poststylus([
        postcssSvg({
          ei: false
        })
      ])
    }))
    .pipe(base64(config.styles.base64.fonts))
    .pipe(autoprefixer(config.styles.autoprefixer))
    .pipe(combineMq())
    .pipe(gulp.dest(config.styles.dest))

  return gulp.src(config.styles.src.fonts)
    .pipe(plumber(config.plumber))
    .pipe(stylus())
    .pipe(base64(config.styles.base64.fonts))
    .pipe(autoprefixer(config.styles.autoprefixer))
    .pipe(gulp.dest(config.styles.dest))
})
