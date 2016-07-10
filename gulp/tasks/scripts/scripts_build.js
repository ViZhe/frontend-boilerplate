
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import rigger from 'gulp-rigger'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import header from 'gulp-header'

import config from '../../config'


gulp.task('scripts_build', () => {
  gulp.src(config.scripts.src.main)
    .pipe(plumber(config.plumber))
    .pipe(rigger())
    .pipe(babel())
    .pipe(rigger())
    .pipe(uglify())
    .pipe(header(config.headerCat))
    .pipe(gulp.dest(config.scripts.dest.main))

  return gulp.src(config.scripts.src.lib)
    .pipe(plumber(config.plumber))
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.dest.lib))
})
