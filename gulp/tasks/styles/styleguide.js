
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import stylus from 'gulp-stylus'
import poststylus from 'poststylus'
import postcssSvg from 'postcss-svg'
import styledown from 'gulp-styledown'

import config from '../../config'


gulp.task('styleguide', () => {
  return gulp.src(config.docs.src)
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(stylus({
      use: poststylus([
        postcssSvg({
          ei: false
        })
      ])
    }))
    .pipe(styledown({
      config: './source/docs/config.styl',
      filename: 'index.html',
      indentSize: 4
    }))
    .pipe(gulp.dest(config.docs.dest))
})
