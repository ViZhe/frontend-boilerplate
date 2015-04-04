"use strict";

/*
 *
 *	REQUIRE SECTION
 *
 */

var	gulp			= require('gulp'), // Gulp JS
	vinylPaths		= require('vinyl-paths'),
	del				= require('del'),
	colors			= require('colors/safe'), // Раскрашиваем текст
	watch			= require('gulp-watch'), // Следим за файлами
	includeFile		= require('gulp-file-include'), // Инклюдинг файлов
	sequence 		= require('gulp-sequence'), // Последовательность выполения тасков

	browserSync		= require("browser-sync"), // http://www.browsersync.io/docs/gulp/
	notify			= browserSync.notify,
	reload			= browserSync.reload,

	stylus			= require('gulp-stylus'),
	base64			= require('gulp-base64'),
	urlAdjuster		= require('gulp-css-url-adjuster'), // Правим путь
	autoprefixer	= require('gulp-autoprefixer'), // Префиксы
	cleancss		= require('gulp-cleancss'), // Минификация CSS

	slim			= require('gulp-slim'),

	changed			= require('gulp-changed'), // Обрабатываем только измененные файлы(картинки)
	imagemin		= require('gulp-image'), // Минификация png, jpg, gif, svg.
	teenypng		= require('gulp-teenypng'),  // png & jpg < 5mb / 500 шт в месяц  -  https://tinypng.com

	babel			= require("gulp-babel"),
	uglify			= require('gulp-uglify'); // Минификация JS



/*
 *
 *	LOG SECTION
 *
 */

function log(error) {
	console.log([
		'',
		colors.red("---------- ERROR MESSAGE START ----------"),
		colors.red.inverse("[" + error.name + " in " + error.plugin + "]"),
		error.message,
		colors.red("---------- ERROR MESSAGE END ------------"),
		''
	].join('\n'));
	this.end();
}



/*
 *
 *	STYLUS SECTION
 *
 */

gulp.task('stylus_dev', function() {
	return gulp.src(['./source/styl/[^-]*.styl', './source/styl/fonts/[^-]*.styl'])
		.pipe(stylus())
		.on('error', log)
		.pipe(base64({
			extensions: ['woff'],
			maxImageSize: 1024*1024 // 1 mb
		}))
		.pipe(urlAdjuster({
			replace:  ['../../img/','../img/']
		}))
		.pipe(autoprefixer({
			browser: ['> 5%', 'last 2 versions', 'android 4']
		}))
		.pipe(gulp.dest('./frontend/css/'))
		.pipe(reload({stream:true}));
});



gulp.task('stylus_build', function () {
	return gulp.src(['./source/styl/[^-]*.styl', './source/styl/fonts/[^-]*.styl'])
		.pipe(stylus())
		.on('error', log)
		.pipe(base64({
			extensions: ['woff'],
			maxImageSize: 1024*1024 // 1 mb
		}))
		.pipe(urlAdjuster({
			replace:  ['../../img/','../../frontend/img/'] // Меняем пути чтобы брать минимизированные картинки для base64
		}))
		.pipe(base64({
			extensions: ['png','svg','jpg'],
			maxImageSize: 10*1024 // 10 kb
		}))
		.pipe(urlAdjuster({
			replace:  ['../../frontend/img/','../img/']
		}))
		.pipe(autoprefixer({
			browser: ['> 5%', 'last 2 versions', 'android 4']
		}))
		.pipe(cleancss())
		.pipe(gulp.dest('./frontend/css/'));
});



/*
 *
 *	SLIM SECTION
 *
 */

// http://rubyinstaller.org/downloads/
// Ruby 2.1.5 (2 последних чекбокса в процессе установки )
// DevKit (распаковать в туже папку)
//
// Запускаем "Start Command Prompt with Ruby"
//
// ruby dk.rb init
// ruby dk.rb review
// ruby dk.rb install
// gem source --add http://rubygems.org
// gem install bundle slim
//
// (Путь до папки Ruby и DevKit)\lib\ruby\gems\2.1.0\gems\slim-3.0.2\lib\slim.rb
// require 'slim/include'
gulp.task('slim_dev', function () {
	return gulp.src('./source/slim/[^-]*.slim')
		.pipe(slim({
			pretty: true
		}))
		.on('error', log)
		.pipe(gulp.dest('./'))
		.pipe(reload({stream:true}));
});

gulp.task('slim_build', function () {
	return gulp.src('./source/slim/[^-]*.slim')
		.pipe(slim({
			pretty: true
		}))
		.on('error', log)
		.pipe(gulp.dest('./'));
});



/*
 *
 *	JAVASCRIPT SECTION
 *
 */

gulp.task('js_dev', function () {
	return gulp.src('./source/js/[^-]*.js')
		.pipe(includeFile())
		.pipe(babel())
		.pipe(gulp.dest('./frontend/js'))
		.pipe(reload({stream:true}));
});


gulp.task('js_build', function () {
	return gulp.src('./source/js/[^-]*.js')
		.pipe(includeFile())
		.pipe(babel())
		.pipe(uglify())
		.on('error', log)
		.pipe(gulp.dest('./frontend/js'));
});



/*
 *
 *	IMAGE SECTION
 *
 */

gulp.task('img_dev', function () {
	return gulp.src('./source/img/**/*')
		.pipe(changed('./frontend/img/'))
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img/'))
		.pipe(reload({stream:true}));
});

gulp.task('img_build', sequence(
	['img_build_imagemin'],
	['img_build_teenypng']
));

gulp.task('img_build_imagemin', function () {
	return gulp.src(['./source/img/**/*.{svg,ico,gif}'])
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img/'));
});

gulp.task('img_build_teenypng', function () {
	return gulp.src(['./source/img/**/*.{png,jpg}'])
		.pipe(teenypng({"apikey": "fCeE49eA1dVhUEepFD0-XuqQq7bTcr3J" }))
		.pipe(gulp.dest('./frontend/img/'));
});



/*
 *
 *	LOCAL SERVER SECTION
 *
 */

gulp.task('browser-sync', function() {
	return browserSync({
		server: {
			baseDir: "./",
			proxy: "hoppas.dev",
			notify: true
		}
	});
});



/*
 *
 *	CLEAR SECTION
 *
 */

gulp.task('clean', function() {
   return gulp.src(['./frontend/','./*.html'])
      .pipe(vinylPaths(del));
});



/*
 *
 *	WORK SECTION
 *
 */

// Собираем релиз
gulp.task('build', sequence(
	['clean'],
	['img_build'],
	['stylus_build','slim_build','js_build']
));


// Собираем дев
gulp.task('dev', sequence(
	['clean'],
	['stylus_dev','slim_dev','js_dev','img_dev']
));


// Cледим за изменениями
gulp.task('watch', function() {
	watch('./source/**/*.styl', function () {
		gulp.start(['stylus_dev']);
	});
	watch('./source/**/*.slim', function () {
		gulp.start(['slim_dev']);
	});
	watch('./source/**/*.js', function () {
		gulp.start(['js_dev']);
	});
	watch('./source/img/**/*', function () {
		gulp.start(['img_dev']);
	});
});


gulp.task('default', sequence(
	['dev'],
	['watch'],
	['browser-sync']
));
