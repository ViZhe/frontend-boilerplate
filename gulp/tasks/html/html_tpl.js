
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import jade from 'gulp-jade'

import config from '../../config'


gulp.task('html_tpl', () => {
  const fs = require('fs')

  return gulp.src(config.html.tpl.src)
    .pipe(plumber(config.plumber))
    .pipe(jade({
      doctype: 'HTML',
      pretty: '    ',
      data: JSON.parse(fs.readFileSync(config.html.tpl.pathToJson, {
        utf8: 'utf8'
      }))
    }))
    .pipe(gulp.dest(config.html.tpl.dest))
})
