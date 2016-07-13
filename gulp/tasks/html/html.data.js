
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import mergeJson from 'gulp-merge-json'

import config from '../../config'


gulp.task('html:data', () => {
  return gulp.src(config.html.data.src)
    .pipe(plumber(config.plumber))
    .pipe(mergeJson(config.html.data.fileName))
    .pipe(gulp.dest(config.html.data.dest))
})
