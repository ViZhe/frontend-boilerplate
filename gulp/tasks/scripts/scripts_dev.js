
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import rigger from 'gulp-rigger'
import babel from 'gulp-babel'

import config from '../../config'


gulp.task('scripts_dev', () => {
  gulp.src(config.scripts.src.main)
    .pipe(plumber(config.plumber))
    .pipe(rigger())
    .pipe(babel())
    .pipe(rigger())
    .pipe(gulp.dest(config.scripts.dest.main))

  return gulp.src(config.scripts.src.lib)
    .pipe(gulp.dest(config.scripts.dest.lib))
})
