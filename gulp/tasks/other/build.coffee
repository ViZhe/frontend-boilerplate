
gulp.task 'build', (callback) ->
    $.sequence(
        ['clean']
        ['images_build']
        ['styles_dev', 'html', 'scripts_build']
        ['styleguide']
    ) callback
