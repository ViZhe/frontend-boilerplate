"use strict";

/*
 *
 *	REQUIRE SECTION
 *
 */

var	gulp			= require('gulp'), // Gulp JS
	sourcemaps		= require('gulp-sourcemaps'),
	gzip 			= require('gulp-gzip'),// Gzip сжатие - проверить пользу. Если есть польза протестить в паре с gulp-csscomb.
	concat			= require('gulp-concat'), // Склейка файлов
	del				= require('del'),
	colors			= require('colors/safe'), // Раскрашиваем текст
	saneWatch		= require('gulp-sane-watch'), // Следим за файлами

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
	imagemin		= require('gulp-image'),// Минификация png, jpg, gif, svg.
	teenypng		= require('gulp-teenypng'),  // png & jpg < 5mb / 500 шт в месяц  -  https://tinypng.com

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

gulp.task('stylus-main_watch', function() {
	gulp.src('./source/styl/[^-]*.styl')
		.pipe(stylus())
		.on('error', log)
		.pipe(urlAdjuster({
			replace:  ['../../img/','../img/']
		}))
		.pipe(autoprefixer({
			browser: ['last 7 versions']
		}))
		.pipe(gulp.dest('./frontend/css/'))
		.pipe(reload({stream:true}));

});

gulp.task('stylus-fonts_watch', function() {
	gulp.src('./source/styl/fonts/[^-]*.styl')
		.pipe(stylus())
		.on('error', log)
		.pipe(base64({
			extensions: ['woff'],
			maxImageSize: 1024*1024
		}))
		.pipe(autoprefixer({
			browser: ['last 7 versions']
		}))
		.pipe(gulp.dest('./frontend/css/fonts/'))
		.pipe(reload({stream:true}));
});


gulp.task('stylus_build', function () {
	gulp.src('./source/styl/[^-]*.styl')
		.pipe(stylus())
		.on('error', log)
		.pipe(urlAdjuster({
			replace:  ['../../img/','../../frontend/img/'] // Меняем пути чтобы брать минимизированные картинки для base63
		}))
		.pipe(base64({
			extensions: ['png','svg','jpg'],
			maxImageSize: 10*1024 // 10 kb
		}))
		.pipe(urlAdjuster({
			replace:  ['../../frontend/img/','../img/']
		}))
		.pipe(autoprefixer({
			browser: ['last 7 versions']
		}))
		.pipe(sourcemaps.init())
		.pipe(cleancss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./frontend/css/'))
		.pipe(gzip())
		.pipe(gulp.dest('./frontend/css/'));

	gulp.src('./source/styl/fonts/[^-]*.styl')
		.pipe(stylus())
		.on('error', log)
		.pipe(base64({
			extensions: ['woff'],
			maxImageSize: 1024*1024 // 1 mb
		}))
		.pipe(autoprefixer({
			browser: ['last 7 versions']
		}))
		.pipe(sourcemaps.init())
		.pipe(cleancss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./frontend/css/fonts/'))
		.pipe(gzip())
		.pipe(gulp.dest('./frontend/css/fonts/'));
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
gulp.task('slim_watch', function () {
	gulp.src('./source/slim/[^-]*.slim')
		.pipe(slim({
			pretty: true
		}))
		.on('error', log)
		.pipe(gulp.dest('./'))
		.pipe(reload({stream:true}));
});

gulp.task('slim_build', function () {
	gulp.src('./source/slim/[^-]*.slim')
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

gulp.task('js_watch', function () {
	gulp.src('./source/js/[^-]*.js')
		.pipe(concat("hoppas.js"))
		.pipe(gulp.dest('./frontend/js'))
		.pipe(reload({stream:true}));
});


gulp.task('js_build', function () {
	gulp.src('./source/js/[^-]*.js')
		.pipe(concat("hoppas.js"))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.on('error', log)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./frontend/js'))
		.pipe(gzip())
		.pipe(gulp.dest('./frontend/js'));
});



/*
 *
 *	IMAGE SECTION
 *
 */

gulp.task('img_watch', function () {
	gulp.src('./source/img/**/*')
		.pipe(changed('./frontend/img/'))
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img/'))
		.pipe(reload({stream:true}));
});

gulp.task('images_build', function () {
	gulp.src(['./source/img/**/*.{svg,ico,gif}'])
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img/'));

	gulp.src(['./source/img/**/*.{png,jpg}'])
		.pipe(teenypng({"apikey": "fCeE49eA1dVhUEepFD0-XuqQq7bTcr3J" }))
		.pipe(gulp.dest('./frontend/img/'));
});



/*
 *
 *	LOCAL SERVER SECTION
 *
 */


gulp.task('browser-sync', function() {
	browserSync({
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
	del(['./frontend/','./*.html']);
});



/*
 *
 *	WORK SECTION
 *
 */

// Собираем релиз
gulp.task('build',['clean'], function() {
	setTimeout(function () {
		gulp.start(['stylus_build','slim_build','js_build','images_build']);
	}, 1000);	// Ждем пока файлы удалятся физически

});

// Собираем дев
gulp.task('watch',['stylus-main_watch','stylus-fonts_watch','slim_watch','js_watch','img_watch'], function() {
	gulp.start(['browser-sync']);
});


// Cледим за изменениями
gulp.task('sane-watch',['clean'], function() {
	setTimeout(function () {
		gulp.start(['watch']);
	}, 1000);	// Ждем пока файлы удалятся физически

	saneWatch(['./source/styl/*.styl','./source/styl/base/*.styl','./source/components/**/*.styl','./source/blocks/**/*.styl'], {debounce: 500}, function() {
		gulp.start(['stylus-main_watch']);
	});

	saneWatch(['./source/styl/fonts/*.styl'], {debounce: 500}, function() {
		gulp.start(['stylus-fonts_watch']);
	});

	saneWatch(['./source/slim/*.slim','./source/slim/base/*.slim','./source/components/**/*.slim','./source/blocks/**/*.slim'], {debounce: 500}, function() {
		gulp.start(['slim_watch']);
	});

	saneWatch(['./source/js/*.js'], {debounce: 500}, function() {
		gulp.start(['js_watch']);
	});

	saneWatch(['./source/img/**/*'], {debounce: 500}, function() {
		gulp.start(['img_watch']);
	});
});

gulp.task('default', ['sane-watch']);