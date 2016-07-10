
gulp.task('browser-sync', () => {
  return $.browserSync({
    files: config.dest,
    server: {
      baseDir: config.dest
    }
  })
})
