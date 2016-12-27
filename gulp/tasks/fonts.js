
import gulp from 'gulp'
import gIf from 'gulp-if'
import plumber from 'gulp-plumber'
import stylus from 'gulp-stylus'
import base64 from 'gulp-base64'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'

import config from '../config'


class Fonts {
  static build() {
    return gulp.src(config.fonts.src)
      .pipe(plumber(config.plumber))
      .pipe(stylus())
      .pipe(base64(config.fonts.base64))
      .pipe(autoprefixer(config.fonts.autoprefixer))
      .pipe(gIf(config.isProd, cssnano({
        discardUnused: {
          fontFace: false
        }
      })))
      .pipe(gulp.dest(config.fonts.dest))
  }
}

export default Fonts
