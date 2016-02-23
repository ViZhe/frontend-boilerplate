
# Собираем дев
gulp.task 'dev', (callback) ->
    $.sequence(
        ['clean']
        ['styles_dev', 'html', 'scripts_dev', 'images_dev']
        ['styleguide']
    ) callback
