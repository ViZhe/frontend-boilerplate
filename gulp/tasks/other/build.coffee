
gulp.task 'build', (callback) ->
    $.sequence(
        ['clean']
        ['images_build']
        ['styles_build', 'html', 'scripts_build']
        ['styleguide']
    ) callback
