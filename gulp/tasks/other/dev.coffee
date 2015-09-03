
# Собираем дев
gulp.task 'dev', $.sequence(
    ['clean']
    ['stylus_dev', 'jade', 'js_dev', 'img_dev']
    ['styleguide']
)
