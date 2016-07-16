
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'

import config from '../config'

/**
 * HTML task
 * @class Html
 */
class Html {
  /**
   * Build templates
   * @returns {*}
   */
  static build() {
    return gulp.src(config.html.src)
      .pipe(plumber(config.plumber))
      .pipe(pug({
        doctype: 'HTML',
        pretty: '  '
      }))
      .pipe(gulp.dest(config.html.dest))
  }
}

export default Html
