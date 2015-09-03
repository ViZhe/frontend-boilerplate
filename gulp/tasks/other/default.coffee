
gulp.task 'default', $.sequence(
    ['dev']
    ['watch']
    ['browser-sync']
)
