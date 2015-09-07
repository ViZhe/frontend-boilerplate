
# Запускаем локальный сервер
gulp.task 'browser-sync', ->
    $.browserSync
        files: config.dest
        server:
            baseDir: config.dest
            proxy: 'hoppas.dev'
