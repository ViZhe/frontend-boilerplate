
# Собираем релиз
gulp.task 'build', $.sequence(
    ['clean']
    ['img_build']
    ['stylus_build', 'jade', 'js_build']
    ['styleguide']
)
