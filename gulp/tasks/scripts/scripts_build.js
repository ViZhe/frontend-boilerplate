
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import rigger from 'gulp-rigger'
import coffee from 'gulp-coffee'
import closureCompilerService from 'gulp-closure-compiler-service'
import uglify from 'gulp-uglify'
import header from 'gulp-header'

import config from '../../config'


gulp.task('scripts_build', () => {
  gulp.src(config.scripts.src.main)
    .pipe(plumber(config.plumber))
    .pipe(rigger())
    .pipe(coffee())
    .pipe(rigger())
    .pipe(closureCompilerService(config.scripts.closureCompilerService))
    .pipe(uglify())
    .pipe(header(config.headerCat))
    .pipe(gulp.dest(config.scripts.dest.main))

  return gulp.src(config.scripts.src.lib)
    .pipe(plumber(config.plumber))
    .pipe(closureCompilerService(config.scripts.closureCompilerService))
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.dest.lib))
})
