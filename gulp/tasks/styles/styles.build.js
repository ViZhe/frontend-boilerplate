
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import stylus from 'gulp-stylus'
import poststylus from 'poststylus'
import postcssSvg from 'postcss-svg'
import base64 from 'gulp-base64'
import autoprefixer from 'gulp-autoprefixer'
import combineMq from 'gulp-combine-mq'
import cssnano from 'gulp-cssnano'
import header from 'gulp-header'
import cssUrlAdjuster from 'gulp-css-url-adjuster'

import config from '../../config'


gulp.task('build:styles', () => {
  gulp.src(config.styles.src.main)
    .pipe(plumber(config.plumber))
    .pipe(stylus({
      use: poststylus([
        postcssSvg({
          ei: false,
          svgo: true
        })
      ])
    }))
    .pipe(base64(config.styles.base64.fonts))
    .pipe(cssUrlAdjuster({
      replace: ['../img/', '../../app/frontend/img/']
    }))
    .pipe(base64({
      extensions: ['png', 'svg', 'jpg'],
      maxImageSize: 1024 * 10
    }))
    .pipe(cssUrlAdjuster({
      replace: ['../../app/frontend/img/', '../img/']
    }))
    .pipe(autoprefixer(config.styles.autoprefixer))
    .pipe(combineMq())
    .pipe(cssnano())
    .pipe(header(config.headerCat))
    .pipe(gulp.dest(config.styles.dest))

  return gulp.src(config.styles.src.fonts)
    .pipe(plumber(config.plumber))
    .pipe(stylus())
    .pipe(base64(config.styles.base64.fonts))
    .pipe(autoprefixer(config.styles.autoprefixer))
    .pipe(cssnano({
      discardUnused: {
        fontFace: false
      }
    }))
    .pipe(gulp.dest(config.styles.dest))
})
