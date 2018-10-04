
import gulp from 'gulp'
import gIf from 'gulp-if'
import plumber from 'gulp-plumber'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import postcssScss from 'postcss-scss'
import postcssEasyImport from 'postcss-easy-import'
import postcssColorHwb from 'postcss-color-hwb'
import postcssColorFunction from 'postcss-color-function'
import postcssCssVariables from 'postcss-css-variables'
import postcssCalc from 'postcss-calc'
import postcssAssets from 'postcss-assets'
import postcssCustomMedia from 'postcss-custom-media'
import postcssMediaMinmax from 'postcss-media-minmax'
import postcssImageSetFunction from 'postcss-image-set-function'
import postcssReporter from 'postcss-reporter'
import cssMqpacker from 'css-mqpacker'
import stylelint from 'stylelint'
import autoprefixer from 'autoprefixer'
import cssnano from 'gulp-cssnano'
import header from 'gulp-header'

import config from '../config'


class Styles {
  static build() {
    return gulp.src(config.styles.src.main)
      .pipe(plumber(config.plumber))
      .pipe(postcss([
        postcssEasyImport({
          extensions: ['.css', '.scss'],
        }),
        postcssColorHwb(),
        postcssCssVariables(),
        postcssColorFunction(),
        postcssCalc(),
        postcssAssets(config.styles.postcss.assets),
        postcssImageSetFunction(),
        postcssCustomMedia(),
        postcssMediaMinmax(),
        autoprefixer(config.styles.postcss.autoprefixer),
        cssMqpacker(),
      ], {
        parser: postcssScss,
      }))
      .pipe(sass(config.styles.sass).on('error', sass.logError))
      .pipe(gIf(config.isProd, cssnano()))
      .pipe(gIf(config.isProd, header(config.headerCat)))
      .pipe(gulp.dest(config.styles.dest))
  }

  static lint() {
    return gulp.src(config.styles.src.all)
      .pipe(postcss([
        stylelint(),
        postcssReporter({
          clearAllMessages: true,
        }),
      ]))
  }

  static travis() {
    return gulp.src(config.styles.src.all)
      .pipe(postcss([
        stylelint(),
        postcssReporter({
          throwError: true,
        }),
      ]))
  }
}


export default Styles
