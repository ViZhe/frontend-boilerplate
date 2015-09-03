
# Запускаем локальный сервер
gulp.task 'browser-sync', ->
    $.browserSync server:
        baseDir: config.dest
        proxy: 'hoppas.dev'
