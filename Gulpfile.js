// Для работы нужны: nodejs, npm

"use strict";


var	gulp = require('gulp'), // Gulp JS
	sourcemaps = require('gulp-sourcemaps'),
	gzip = require('gulp-gzip'),// Gzip сжатие - проверить пользу. Если есть польза протестить в паре с gulp-csscomb.
	stylus = require('gulp-stylus'),
	rebaseUrls = require('gulp-css-rebase-urls'), // Относительный путь в css - оттестить
	autoprefixer = require('gulp-autoprefixer'), // Префиксы
	cleancss = require('gulp-cleancss'), // Минификация CSS
	slim = require('gulp-slim'),
	imagemin = require('gulp-imagemin'), // Минификация изображений - Попробовать  imagemin-optipng и др надстройки
	uglify = require('gulp-uglify'), // Минификация JS
	concat = require('gulp-concat'), // Склейка файлов
	//rimraf = require('gulp-rimraf'), // Удаление папки
	browserSync = require("browser-sync"), // http://www.browsersync.io/docs/gulp/
	reload = browserSync.reload;



// Собираем Stylus
gulp.task('stylus-main', function() {
	gulp.src(['./source/styl/*.styl','!./source/styl/-*.styl'])
		.pipe(stylus())
		.on('error', console.log)
		.pipe(rebaseUrls())
		.pipe(autoprefixer({
			browser: ['last 7 versions']
		}))
		.pipe(sourcemaps.init())
		.pipe(cleancss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./frontend/css/'))
		.pipe(gzip())
		.pipe(gulp.dest('./frontend/css/'))
		.pipe(reload({stream:true}));

});

gulp.task('stylus-fonts', function() {
	gulp.src(['./source/styl/fonts/*.styl','!./source/styl/fonts/-*.styl'])
		.pipe(stylus())
		.on('error', console.log)
		.pipe(autoprefixer({
			browser: ['last 7 versions']
		}))
		.pipe(sourcemaps.init())
		.pipe(cleancss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./frontend/css/fonts/'))
		.pipe(gzip())
		.pipe(gulp.dest('./frontend/css/fonts/'))
		.pipe(reload({stream:true}));
});


// http://rubyinstaller.org/downloads/
// Ruby 2.1.5 and DevKit
//
// gem install bundler
// gem install slim
//
// C:\Program Files\Ruby21-x64\lib\ruby\gems\2.1.0\gems\slim-3.0.2\lib\slim.rb
// require 'slim/include'

gulp.task('slim', function () {
	gulp.src(['./source/slim/*.slim','./source/slim/-*.slim'])
		.pipe(slim({
			pretty: true
		}))
		.on('error', console.log)
		.pipe(gulp.dest('./'));
});


//
// base64   https://www.npmjs.com/package/gulp-base64
// удалять файлы из папки
//

gulp.task('js', function () {
	gulp.src(['./source/js/*.js', '!./source/js/-*.js'])
		.pipe(concat("hoppas.js"))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./frontend/js'))
		.pipe(gzip())
		.pipe(gulp.dest('./frontend/js'))
		.pipe(reload({stream:true}));
});


gulp.task('imagemin-style', function () {
	gulp.src('./source/img/**/*')
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest('./frontend/img/'))
		.pipe(reload({stream:true}));
});

gulp.task('imagemin-content', function () {
	gulp.src('./source/img-c/**/*')
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest('./frontend/img-c/'))
		.pipe(reload({stream:true}));
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./",
			proxy: "hoppas.dev",
			notify: false // Сообщения в браузере
		}
	});
});


// Возможно нужно будет следить за всеми стилями и шаблонами проверить

gulp.task('default',['stylus-main','stylus-fonts','slim','js','imagemin-style','imagemin-content','browser-sync'], function() {
	gulp.watch('./source/styl/*.styl', ['stylus-main']);
	gulp.watch('./source/styl/fonts/*.styl', ['stylus-fonts']);

	gulp.watch('./source/slim/*.slim', ['slim']);

	gulp.watch('./source/js/*.js', ['js']);

	gulp.watch('./source/img/**/*', ['imagemin-style']);
	gulp.watch('./source/img-c/**/*', ['imagemin-content']);
});