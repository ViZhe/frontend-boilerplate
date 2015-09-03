
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
#	CONFIG SECTION
#
###

path =
    src: './source/'
    dest: './app/'

config =
    style:
        src:
            main: path.src + 'styl/[^-]*.styl'
            fonts: path.src + 'styl/fonts/[^-]*.styl'
        dest: path.dest + 'frontend/css/'
        watch: path.src + '**/*.styl'
    docs:
        src: path.src + 'styl/[^-]*.styl'
        dest: path.dest + 'docs/'
    tpl:
        src: path.src + 'tpl/*.jade'
        dest: path.dest
        watch: path.src + '**/*.jade'
    js:
        src:
            main: path.src + 'js/*.coffee'
            lib: path.src + 'js/lib/*.js'
        dest:
            main: path.dest + 'frontend/js/'
            lib: path.dest + 'frontend/js/lib/'
        watch: path.src + '**/*.{js,coffee}'
    img:
        src: path.src + 'img/**/*'
        dest: path.dest + 'frontend/img/'
        watch: path.src + 'img/**/*'



###
#
#	STYLUS SECTION
#
###

gulp.task 'stylus_dev', ->
    gulp.src(config.style.src.main)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(base64(
            extensions: ['woff']
            maxImageSize: 1024 * 1024 * 10 # 10 mb
        ))
        .pipe(urlAdjuster(
            replace: ['../../img/', '../img/']
        ))
        .pipe(autoprefixer(
            browser: ['> 5%', 'last 2 versions']
        ))
        .pipe(gulp.dest(config.style.dest))

    gulp.src(config.style.src.fonts)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(base64(
            extensions: ['woff']
            maxImageSize: 1024 * 1024 * 10 # 10 mb
        ))
        .pipe(autoprefixer(
            browser: ['> 5%', 'last 2 versions']
        ))
        .pipe(gulp.dest(config.style.dest))



gulp.task 'stylus_build', ->
    gulp.src(config.style.src.main)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(base64(
            extensions: ['woff']
            maxImageSize: 1024 * 1024 * 10 # 10 mb
        ))
        .pipe(urlAdjuster(
            replace: ['../../img/', '../../app/frontend/img/']
        ))
        .pipe(base64(
            extensions: ['png', 'svg', 'jpg']
            maxImageSize: 1024 * 1024 # 1 mb
        ))
        .pipe(urlAdjuster(
            replace: ['../../app/frontend/img/','../img/']
        ))
        .pipe(autoprefixer(
            browser: ['> 5%', 'last 2 versions']
        ))
        .pipe(cleancss())
        .pipe(header(headerCat, version))
        .pipe(gulp.dest(config.style.dest))

    gulp.src(config.style.src.fonts)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(base64(
            extensions: ['woff']
            maxImageSize: 1024 * 1024 * 10 # 10 mb
        ))
        .pipe(autoprefixer(
            browser: ['> 5%', 'last 2 versions']
        ))
        .pipe(cleancss())
        .pipe(gulp.dest(config.style.dest))



###
#
#	STYLE GUIDE SECTION
#
###

gulp.task 'styleguide', ->
    gulp.src(config.docs.src)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(styledown(
            config: './source/docs/config.styl'
            filename: 'index.html'
        ))
        .pipe(gulp.dest(config.docs.dest))



###
#
#	JADE SECTION
#
###

gulp.task 'jade', ->
    gulp.src(config.tpl.src)
        .pipe(plumber())
        .pipe(jade(
            pretty: '    '
        ))
        .pipe(gulp.dest(config.tpl.dest))



###
#
#	JAVASCRIPT SECTION
#
###

gulp.task 'js_dev', ->
    gulp.src(config.js.src.main)
        .pipe(plumber())
        .pipe(includeFile())
        .pipe(coffee())
        .pipe(gulp.dest(config.js.dest.main))

    gulp.src(config.js.src.lib)
        .pipe(gulp.dest(config.js.dest.lib))



gulp.task 'js_build', ->
    gulp.src(config.js.src.main)
        .pipe(plumber())
        .pipe(includeFile())
        .pipe(coffee())
        .pipe(closure(compilation_level: 'SIMPLE_OPTIMIZATIONS'))
        .pipe(uglify())
        .pipe(header(headerCat, version))
        .pipe(gulp.dest(config.js.dest.main))

    gulp.src(config.js.src.lib)
        .pipe(plumber())
        .pipe(closure(compilation_level: 'SIMPLE_OPTIMIZATIONS'))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.dest.lib))



###
#
#	IMAGE SECTION
#
###

gulp.task 'img_dev', ->
    gulp.src(config.img.src)
        .pipe(changed(config.img.dest))
        .pipe(gulp.dest(config.img.dest))


gulp.task 'img_build', ->
    gulp.src(config.img.src)
        .pipe(teenypng('apikey': '0Q30pqGuD4mYEKXFcCzCXbgXK6MWK7rR'))
        .pipe(gulp.dest(config.img.dest))



###
#
#	WORK SECTION
#
###

# Удаляем dest
gulp.task 'clean', ->
    del.sync(
        path.dest
        force: true
    )


# Собираем релиз
gulp.task 'build', sequence(
    ['clean']
    ['img_build']
    ['stylus_build', 'jade', 'js_build']
    ['styleguide']
)


# Собираем дев
gulp.task 'dev', sequence(
    ['clean']
    ['stylus_dev', 'jade', 'js_dev', 'img_dev']
    ['styleguide']
)


# Cледим за изменениями
gulp.task 'watch', ->
    watch(config.style.watch, ->
        gulp.start ['stylus_dev', 'styleguide']
        return
    ).on('change', reload)
    watch(config.tpl.watch, ->
        gulp.start ['jade']
        return
    ).on('change', reload)
    watch(config.js.watch, ->
        gulp.start ['js_dev']
        return
    ).on('change', reload)
    watch(config.img.watch, ->
        gulp.start ['img_dev']
        return
    ).on('change', reload)
    return


# Запускаем локальный сервер
gulp.task 'browser-sync', ->
    browserSync server:
        baseDir: path.dest
        proxy: 'hoppas.dev'


gulp.task 'default', sequence(
    ['dev']
    ['watch']
    ['browser-sync']
)
