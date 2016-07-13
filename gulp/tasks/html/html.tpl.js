
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'

import config from '../../config'


gulp.task('html:tpl', () => {
  const fs = require('fs')

  return gulp.src(config.html.tpl.src)
    .pipe(plumber(config.plumber))
    .pipe(pug({
      doctype: 'HTML',
      pretty: '    ',
      data: JSON.parse(fs.readFileSync(config.html.tpl.pathToJson, {
        utf8: 'utf8'
      }))
    }))
    .pipe(gulp.dest(config.html.tpl.dest))
})
