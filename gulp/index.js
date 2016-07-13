
import gulp from 'gulp'

import Styles from './tasks/styles'
import Scripts from './tasks/scripts'
import Html from './tasks/html'
import Fonts from './tasks/fonts'
import Images from './tasks/images'
import Clean from './tasks/clean'
import Server from './tasks/server'
import config from './config'


gulp.task('scripts:build', Scripts.build)
gulp.task('scripts:vendor', Scripts.vendor)
// gulp.task('scripts:lint', Scripts.lint) // TODO: scripts.lint
gulp.task('styles:build', Styles.build)
gulp.task('fonts:build', Fonts.build) // TODO: fonts
// gulp.task('styles:lint', Styles.lint) // TODO: linter for styles
gulp.task('styles:guide', Styles.guide) // TODO: 'styles:guide' only for production
gulp.task('html:build', gulp.series([Html.data, Html.tpl]))
gulp.task('images:build', Images.build)
gulp.task('clean', Clean.delete)
gulp.task('server', Server.run)

gulp.task('build', gulp.series([
  'clean',
  'images:build',
  'styles:build', 'styles:guide',
  'fonts:build',
  'scripts:build', 'scripts:vendor',
  'html:build'
]))

gulp.task('watch', () => {
  gulp.watch(config.styles.watch, gulp.series('styles:build'))
  gulp.watch(config.html.watch, gulp.series('html:build'))
  gulp.watch(config.scripts.watch, gulp.series('scripts:build'))
  gulp.watch(config.images.watch, gulp.series('images:build'))
})

gulp.task('default',
  gulp.series([
    'build',
    gulp.parallel(['watch', 'server'])
  ]
))
