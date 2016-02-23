
gulp.task 'html_tpl', ->
    fs = require('fs')
    gulp.src(config.html.tpl.src)
        .pipe($.plumber())
        .pipe($.jade(
            doctype: 'HTML'
            pretty: '    '
            data: JSON.parse(
                fs.readFileSync(config.html.tpl.pathToJson, {'utf8'})
            )
        ))
        .pipe(gulp.dest(config.html.tpl.dest))
