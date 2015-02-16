"use strict";

/*
 *
 *	REQUIRE SECTION
 *
 */

var	gulp = require('gulp'), // Gulp JS
	sourcemaps = require('gulp-sourcemaps'),
	gzip = require('gulp-gzip'),// Gzip сжатие - проверить пользу. Если есть польза протестить в паре с gulp-csscomb.
	concat = require('gulp-concat'), // Склейка файлов
	del = require('del'),

	browserSync = require("browser-sync"), // http://www.browsersync.io/docs/gulp/
	reload = browserSync.reload,

	stylus = require('gulp-stylus'),
	rebaseUrls = require('gulp-css-rebase-urls'), // Относительный путь в css - оттестить
	autoprefixer = require('gulp-autoprefixer'), // Префиксы
	cleancss = require('gulp-cleancss'), // Минификация CSS

	slim = require('gulp-slim'),

	imagemin = require('gulp-image'),// Минификация png, jpg, gif, svg.
	teenypng = require('gulp-teenypng'),  // png & jpg < 5mb / 500 шт в месяц  -  https://tinypng.com

	uglify = require('gulp-uglify'); // Минификация JS



/*
 *
 *	LOG SECTION
 *
 */

function log(error) {
	console.log([
		'',
		"----------ERROR MESSAGE START----------".bold.red.underline,
		("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
		error.message,
		"----------ERROR MESSAGE END----------".bold.red.underline,
		''
	].join('\n'));
	this.end();
}



/*
 *
 *	STYLUS SECTION
 *
 */

gulp.task('stylus-main', function() {
	gulp.src('./source/styl/[^-]*.styl')
		.pipe(stylus())
		.on('error', log)
		.pipe(rebaseUrls())
		.pipe(autoprefixer({
			browser: ['last 7 versions']
		}))
		.pipe(gulp.dest('./frontend/css/'))
		.pipe(reload({stream:true}));

});

gulp.task('stylus-fonts', function() {
	gulp.src('./source/styl/fonts/[^-]*.styl')
		.pipe(stylus())
		.on('error', log)
		// Все включения должны быть в base64
		.pipe(autoprefixer({
			browser: ['last 7 versions']
		}))
		.pipe(gulp.dest('./frontend/css/fonts/'))
		.pipe(reload({stream:true}));
});


gulp.task('build:stylus', function () {
	gulp.src('./source/styl/[^-]*.styl')
		.pipe(stylus())
		.on('error', log)
		.pipe(rebaseUrls())
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


// ==========================================================================================
//
// base64   https://www.npmjs.com/package/gulp-base64
//
// ==========================================================================================



/*
 *
 *	SLIM SECTION
 *
 */

// http://rubyinstaller.org/downloads/
// Ruby 2.1.5 and DevKit
//
// gem install bundler
// gem install slim
//
// C:\Program Files\Ruby21-x64\lib\ruby\gems\2.1.0\gems\slim-3.0.2\lib\slim.rb
// require 'slim/include'
gulp.task('multi:slim', function () {
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

gulp.task('js', function () {
	gulp.src('./source/js/[^-]*.js')
		.pipe(concat("hoppas.js"))
		.pipe(gulp.dest('./frontend/js'))
		.pipe(reload({stream:true}));
});


gulp.task('build:js', function () {
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

gulp.task('imagemin-style', function () {
	gulp.src('./source/img/**/*')
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img/'))
		.pipe(reload({stream:true}));
});

gulp.task('imagemin-content', function () {
	gulp.src('./source/img-c/**/*')
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img-c/'))
		.pipe(reload({stream:true}));
});


gulp.task('build:imagemin', function () {
	gulp.src(['./source/img/**/*.gif', './source/img/**/*.svg', './source/img/**/*.ico'])
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img/'));

	gulp.src(['./source/img/**/*.png', './source/img/**/*.jpg'])
		.pipe(teenypng({"apikey": "fCeE49eA1dVhUEepFD0-XuqQq7bTcr3J" }))
		.pipe(gulp.dest('./frontend/img/'));

	gulp.src(['./source/img-c/**/*.gif', './source/img-c/**/*.svg'])
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img-c/'));

	gulp.src(['./source/img-c/**/*.png', './source/img-c/**/*.jpg'])
		.pipe(teenypng({"apikey": "fCeE49eA1dVhUEepFD0-XuqQq7bTcr3J" }))
		.pipe(gulp.dest('./frontend/img-c/'));
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
			notify: false // Сообщения в браузере
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
	console.log("123");
});



/*
 *
 *	WORK SECTION
 *
 */

// Собираем релиз
gulp.task('build',['clean'], function() {
	setTimeout(function () {
		gulp.start(['build:stylus','multi:slim','build:js','build:imagemin']);
	}, 500);

});


// Собираем дев и следим за изменениями
// Возможно нужно будет следить за всеми стилями и шаблонами проверить
gulp.task('watch',['clean'], function() {
	setTimeout(function () {
		gulp.start(['stylus-main','stylus-fonts','multi:slim','js','imagemin-style','imagemin-content','browser-sync']);
	}, 500);

	gulp.watch('./source/styl/*.styl', ['stylus-main']);
	gulp.watch('./source/styl/fonts/*.styl', ['stylus-fonts']);

	gulp.watch('./source/slim/*.slim', ['multi:slim']);

	gulp.watch('./source/js/*.js', ['js']);

	gulp.watch('./source/img/**/*', ['imagemin-style']);
	gulp.watch('./source/img-c/**/*', ['imagemin-content']);
});

gulp.task('default', ['watch']);
