
import gulp from 'gulp'
import gIf from 'gulp-if'
import plumber from 'gulp-plumber'
import eslint from 'gulp-eslint'
import rigger from 'gulp-rigger'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import header from 'gulp-header'

import config from '../config'


class Scripts {
  static build() {
    return gulp.src(config.scripts.src.main)
      .pipe(plumber(config.plumber))
      .pipe(rigger())
      .pipe(babel())
      .pipe(gIf(config.isProd, uglify()))
      .pipe(gIf(config.isProd, header(config.headerCat)))
      .pipe(gulp.dest(config.scripts.dest))
  }

  static vendor() {
    return gulp.src(config.scripts.src.vendor)
      .pipe(plumber(config.plumber))
      .pipe(gIf(config.isProd, uglify()))
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest(config.scripts.dest))
  }

  static lint() {
    return gulp.src(config.scripts.src.all)
      .pipe(eslint())
      .pipe(eslint.format())
  }

  static travis() {
    return gulp.src(config.scripts.src.all)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  }
}

export default Scripts
