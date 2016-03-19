
gulp.task 'dev', (callback) ->
    $.sequence(
        ['clean']
        ['images_dev']
        ['styles_dev', 'html', 'scripts_dev']
        ['styleguide']
    ) callback
