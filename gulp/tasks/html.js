
import fs from 'fs'
import gulp from 'gulp'
import mergeJson from 'gulp-merge-json'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'

import config from '../config'

/**
 * HTML task
 * @class Html
 */
class Html {
  /**
   * Build json data file for jade
   * @returns {*}
   */
  static data() {
    return gulp.src(config.html.data.src)
      .pipe(plumber(config.plumber))
      .pipe(mergeJson(config.html.data.fileName))
      .pipe(gulp.dest(config.html.data.dest))
  }
  /**
   * Build template
   * @returns {*}
   */
  static tpl() {
    return gulp.src(config.html.tpl.src)
      .pipe(plumber(config.plumber))
      .pipe(pug({
        doctype: 'HTML',
        pretty: '  ',
        data: JSON.parse(fs.readFileSync(config.html.tpl.pathToJson, {
          utf8: 'utf8'
        }))
      }))
      .pipe(gulp.dest(config.html.tpl.dest))
  }
}

export default Html
