
import gulp from 'gulp'
import gIf from 'gulp-if'
import plumber from 'gulp-plumber'
import stylus from 'gulp-stylus'
import poststylus from 'poststylus'
import postcssSvg from 'postcss-svg'
import base64 from 'gulp-base64'
import autoprefixer from 'gulp-autoprefixer'
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import cssnano from 'gulp-cssnano'
import header from 'gulp-header'
import cssUrlAdjuster from 'gulp-css-url-adjuster'
import styledown from 'gulp-styledown'
import stylint from 'gulp-stylint'

import config from '../config'


class Styles {
  static build() {
    return gulp.src(config.styles.src.main)
      .pipe(plumber(config.plumber))
      .pipe(stylus({
        use: poststylus([
          postcssSvg({
            ei: false,
            svgo: false
          })
        ])
      }))
      .pipe(base64(config.fonts.base64))
      .pipe(gIf(config.isProd, base64(config.styles.base64)))
      .pipe(cssUrlAdjuster(config.styles.cssUrlAdjuster))
      .pipe(autoprefixer(config.styles.autoprefixer))
      .pipe(groupCssMediaQueries())
      .pipe(gIf(config.isProd, cssnano()))
      .pipe(gIf(config.isProd, header(config.headerCat)))
      .pipe(gulp.dest(config.styles.dest))
  }

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

  static lint() {
    return gulp.src(config.styles.src.all)
      .pipe(stylint())
      .pipe(stylint.reporter())
  }

  static travis() {
    return gulp.src(config.styles.src.all)
      .pipe(stylint())
      .pipe(stylint.reporter('fail', {
        failOnWarning: true
      }))
  }
}

export default Styles
