
import gulp from 'gulp'
import gIf from 'gulp-if'
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
import styledown from 'gulp-styledown'

import config from '../config'


/**
 * Styles task
 * @class Styles
 */
class Styles {
  /**
   * Build style
   * @returns {*}
   */
  static build() {
    return gulp.src(config.styles.src)
      .pipe(plumber(config.plumber))
      .pipe(stylus({
        use: poststylus([
          postcssSvg({
            ei: false,
            svgo: config.isProd
          })
        ])
      }))
      .pipe(base64(config.fonts.base64))
      .pipe(gIf(config.isProd, cssUrlAdjuster({
        replace: ['../img/', '../../app/frontend/img/']
      })))
      .pipe(gIf(config.isProd, base64(config.styles.base64)))
      .pipe(gIf(config.isProd, cssUrlAdjuster({
        replace: ['../../app/frontend/img/', '../img/']
      })))
      .pipe(autoprefixer(config.styles.autoprefixer))
      .pipe(combineMq())
      .pipe(gIf(config.isProd, cssnano()))
      .pipe(gIf(config.isProd, header(config.headerCat)))
      .pipe(gulp.dest(config.styles.dest))
  }

  /**
   * Build styleguide for style
   * @returns {*}
   */
  static guide() {
    return gulp.src(config.docs.src)
      .pipe(plumber({
        errorHandler: config.errorHandler
      }))
      .pipe(stylus({
        use: poststylus([
          postcssSvg({
            ei: false
          })
        ])
      }))
      .pipe(styledown({
        config: './source/docs/config.styl',
        filename: 'index.html',
        indentSize: 4
      }))
      .pipe(gulp.dest(config.docs.dest))
  }
}

export default Styles
