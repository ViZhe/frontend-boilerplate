
require('coffee-script')

###
#
#	REQUIRE SECTION
#
###

gulp = require('gulp')
del = require('del')
plumber = require('gulp-plumber')
# Следим за файлами
watch = require('gulp-watch')
# Инклюдинг файлов
includeFile = require('gulp-file-include')
# Вставляет заголовок в файлы
header = require('gulp-header')
# Последовательность выполения тасков
sequence = require('gulp-sequence')
# http://www.browsersync.io/docs/gulp/
browserSync = require('browser-sync')
notify = browserSync.notify
reload = browserSync.reload
stylus = require('gulp-stylus')
base64 = require('gulp-base64')
# Правим путь
urlAdjuster = require('gulp-css-url-adjuster')
autoprefixer = require('gulp-autoprefixer')
# Минификация CSS
cleancss = require('gulp-cleancss')
# Style Guide
styledown = require('gulp-styledown')
jade = require('gulp-jade')
# Обрабатываем только измененные файлы(картинки)
changed = require('gulp-changed')
# png & jpg < 5mb / 500 шт в месяц  -  https://tinypng.com
teenypng = require('gulp-teenypng')
coffee = require('gulp-coffee')
# Google jsmin
closure = require('gulp-closure-compiler-service')
uglify = require('gulp-uglify')



###
#
#	HEADER SECTION
#
###

version = require('./version.json')
version = v: version
headerCat = ['/*!',
' *	@author ViZhe (Barsik^)',
' *	@version ${v.major}.${v.minor}.${v.patch}-${v.prerelease}/${v.project}',
' *',
' *	                   $$____________$$',
' *	                  $___$________$___$',
' *	                  $_____$$$$$$_____$',
' *	                 $_____sss___sss____$',
' *	                $______ii_____ii_____$',
' *	                 $_______$$$________$',
' *	     $$$$$$$$     $_______$________$',
' *	   $$________$       $$_________$$',
' *	    $_________$     $___$$$$$___$',
' *	       $______$    $__$________$__$',
' *	       $_____$    $__$__________$__$',
' *	      $____$   $$$$__$___hope___$__$$$$',
' *	     $___$    $____$__$________$___$___$',
' *	     $__$     $____$__$________$__$____$',
' *	    $___$      $____$__$____$_$__$____$',
' *	      $__$      $____$___$_$_____$___$',
' *	       $___$$$$$_$___$___$_$____$___$',
' *	          $$$$$_$____$____$_____$____$',
' *	                $$$_$_____$______$_$$$',
' *	                     $$$$___$$$$$',
' */',
''].join('\n')



###
#
#	STYLUS SECTION
#
###

gulp.task 'stylus_dev', ->
    gulp.src([
        './source/styl/[^-]*.styl'
        './source/styl/fonts/[^-]*.styl'
    ])
    .pipe(plumber())
    .pipe(stylus())
    .pipe(base64(
        extensions: ['woff']
        maxImageSize: 10 * 1024 # 10 mb
    ))
    .pipe(urlAdjuster(
        replace: ['../../img/', '../img/']
    ))
    .pipe(autoprefixer(
        browser: ['> 5%', 'last 2 versions']
    ))
    .pipe(gulp.dest('./frontend/css/'))
    .pipe(reload(stream: true))


gulp.task 'stylus_build', ->
    gulp.src([
        './source/styl/[^-]*.styl'
        './source/styl/fonts/[^-]*.styl'
    ])
    .pipe(plumber())
    .pipe(stylus())
    .pipe(base64(
        extensions: ['woff']
        maxImageSize: 10 * 1024 # 10 mb
    ))
    .pipe(urlAdjuster(
        replace: ['../../img/', '../../frontend/img/']
    ))
    .pipe(base64(
        extensions: ['png', 'svg', 'jpg']
        maxImageSize: 10 * 1024 # 10 mb
    ))
    .pipe(urlAdjuster(
        replace: ['../../frontend/img/','../img/']
    ))
    .pipe(autoprefixer(
        browser: ['> 5%', 'last 2 versions']
    ))
    .pipe(cleancss())
    .pipe(header(headerCat, version))
    .pipe(gulp.dest('./frontend/css/'))




###
#
#	STYLE GUIDE SECTION
#
###

gulp.task 'styleguide', ->
    gulp.src('./source/styl/[^-]*.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(styledown(
            config: './source/docs/config.styl'
            filename: 'index.html'
        ))
        .pipe(gulp.dest('./frontend/docs/'))
        .pipe(reload(stream: true))



###
#
#	JADE SECTION
#
###

gulp.task 'jade_dev', ->
    gulp.src('./source/tpl/[^-]*.jade')
        .pipe(plumber())
        .pipe(jade(
            pretty: '    '
        ))
        .pipe(gulp.dest('./'))
        .pipe(reload(stream: true))


gulp.task 'jade_build', ->
    gulp.src('./source/tpl/[^-]*.jade')
        .pipe(plumber())
        .pipe(jade(
            pretty: '    '
        ))
        .pipe(gulp.dest('./'))



###
#
#	JAVASCRIPT SECTION
#
###

gulp.task 'js_dev_main', ->
    gulp.src('./source/js/[^-]*.coffee')
        .pipe(plumber())
        .pipe(includeFile())
        .pipe(coffee())
        .pipe(gulp.dest('./frontend/js'))
        .pipe(reload(stream: true))

gulp.task 'js_dev_lib', ->
    gulp.src('./source/js/lib/[^-]*.js')
        .pipe(gulp.dest('./frontend/js/lib/'))
        .pipe(reload(stream: true))

gulp.task 'js_dev', sequence(
    ['js_dev_main']
    ['js_dev_lib']
)


gulp.task 'js_build_main', ->
    gulp.src('./source/js/[^-]*.coffee')
        .pipe(plumber())
        .pipe(includeFile())
        .pipe(coffee())
        .pipe(closure(compilation_level: 'SIMPLE_OPTIMIZATIONS'))
        .pipe(uglify())
        .pipe(header(headerCat, version))
        .pipe(gulp.dest('./frontend/js'))

gulp.task 'js_build_lib', ->
    gulp.src('./source/js/lib/[^-]*.js')
        .pipe(plumber())
        .pipe(closure(compilation_level: 'SIMPLE_OPTIMIZATIONS'))
        .pipe(uglify())
        .pipe(gulp.dest('./frontend/js/lib/'))

gulp.task 'js_build', sequence(
    ['js_build_main']
    ['js_build_lib']
)



###
#
#	IMAGE SECTION
#
###

gulp.task 'img_dev', ->
    gulp.src('./source/img/**/*')
        .pipe(changed('./frontend/img/'))
        .pipe(gulp.dest('./frontend/img/'))
        .pipe(reload(stream: true))


gulp.task 'img_build', ->
    gulp.src(['./source/img/**/*'])
        .pipe(teenypng('apikey': '0Q30pqGuD4mYEKXFcCzCXbgXK6MWK7rR'))
        .pipe(gulp.dest('./frontend/img/'))



###
#
#	LOCAL SERVER SECTION
#
###

gulp.task 'browser-sync', ->
    browserSync server:
        baseDir: './'
        proxy: 'hoppas.dev'
        notify: true



###
#
#	CLEAR SECTION
#
###

gulp.task 'clean', ->
    del.sync(
        ['./frontend/', './*.html']
        force: true
    )



###
#
#	WORK SECTION
#
###

# Собираем релиз
gulp.task 'build', sequence(
    ['clean']
    ['img_build']
    ['stylus_build', 'jade_build', 'js_build']
    ['styleguide']
)


# Собираем дев
gulp.task 'dev', sequence(
    ['clean']
    ['stylus_dev', 'jade_dev', 'js_dev', 'img_dev']
    ['styleguide']
)


# Cледим за изменениями
gulp.task 'watch', ->
    watch './source/**/*.styl', ->
        gulp.start ['stylus_dev', 'styleguide']
        return
    watch './source/**/*.jade', ->
        gulp.start ['jade_dev']
        return
    watch ['./source/**/*.js', './source/**/*.coffee'], ->
        gulp.start ['js_dev_main', 'js_dev_lib']
        return
    watch './source/img/**/*', ->
        gulp.start ['img_dev']
        return
    return



gulp.task 'default', sequence(
    ['dev']
    ['watch']
    ['browser-sync']
)
