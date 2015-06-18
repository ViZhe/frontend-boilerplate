
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
	// Последовательность выполения тасков
	sequence 		= require('gulp-sequence'),

	// http://www.browsersync.io/docs/gulp/
	browserSync		= require('browser-sync'),
	notify			= browserSync.notify,
	reload			= browserSync.reload,

	stylus			= require('gulp-stylus'),
	base64			= require('gulp-base64'),
	urlAdjuster		= require('gulp-css-url-adjuster'), // Правим путь
	autoprefixer	= require('gulp-autoprefixer'), // Префиксы
	cleancss		= require('gulp-cleancss'), // Минификация CSS

	styledown		= require('gulp-styledown'), // Style Guide

	jade			= require('gulp-jade'),

	// Обрабатываем только измененные файлы(картинки)
	changed			= require('gulp-changed'),
	// Минификация png, jpg, gif, svg.
	imagemin 		= require('gulp-imagemin'),
	// png & jpg < 5mb / 500 шт в месяц  -  https://tinypng.com
	teenypng		= require('gulp-teenypng'),

	babel			= require('gulp-babel'),
	closure			= require('gulp-closure-compiler-service'); // Google jsmin



/*
 *
 *	LOG SECTION
 *
 */

function log (error) {
	console.log([
		'',
		colors.red('---------- ERROR MESSAGE START ----------'),
		colors.red.inverse('[' + error.name + ' in ' + error.plugin + ']'),
		error.message,
		colors.red('---------- ERROR MESSAGE END ------------'),
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
	return gulp.src(['./source/styl/[^-]*.styl',
					 './source/styl/fonts/[^-]*.styl'])
		.pipe(stylus())
		.on('error', log)
		.pipe(base64({
			extensions: ['woff'],
			maxImageSize: 1024 * 1024 // 1 mb
		}))
		.pipe(urlAdjuster({
			replace: ['../../img/', '../img/']
		}))
		.pipe(autoprefixer({
			browser: ['> 5%', 'last 2 versions', 'android 4']
		}))
		.pipe(gulp.dest('./frontend/css/'))
		.pipe(reload({stream: true}));
});



gulp.task('stylus_build', function () {
	return gulp.src(['./source/styl/[^-]*.styl',
					 './source/styl/fonts/[^-]*.styl'])
		.pipe(stylus())
		.on('error', log)
		.pipe(base64({
			extensions: ['woff'],
			maxImageSize: 1024 * 1024 // 1 mb
		}))
		.pipe(urlAdjuster({
			// Меняем пути чтобы брать минимизированные картинки для base64
			replace: ['../../img/', '../../frontend/img/']
		}))
		.pipe(base64({
			extensions: ['png', 'svg', 'jpg'],
			maxImageSize: 10 * 1024 // 10 kb
		}))
		.pipe(urlAdjuster({
			replace: ['../../frontend/img/', '../img/']
		}))
		.pipe(autoprefixer({
			browser: ['> 5%', 'last 2 versions', 'android 4']
		}))
		.pipe(cleancss())
		.pipe(gulp.dest('./frontend/css/'));
});



/*
 *
 *	STYLE GUIDE SECTION
 *
 */

gulp.task('styleguide', function() {
	return gulp.src('./source/styl/[^-]*.styl')
		.pipe(stylus())
		.pipe(styledown({
			config: './source/docs/config.styl',
			filename: 'index.html'
		}))
		.pipe(gulp.dest('./frontend/docs/'))
		.pipe(reload({stream: true}));
});



/*
 *
 *	JADE SECTION
 *
 */

gulp.task('jade_dev', function () {
	return gulp.src('./source/tpl/[^-]*.jade')
		.pipe(jade({
			pretty: true
		}))
		.on('error', log)
		.pipe(gulp.dest('./'))
		.pipe(reload({stream: true}));
});

gulp.task('jade_build', function () {
	return gulp.src('./source/tpl/[^-]*.jade')
		.pipe(jade({
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

gulp.task('js_dev_main', function () {
	return gulp.src('./source/js/[^-]*.js')
		.pipe(includeFile())
		//.pipe(babel())
		.on('error', log)
		.pipe(gulp.dest('./frontend/js'))
		.pipe(reload({stream: true}));
});

gulp.task('js_dev_lib', function () {
	return gulp.src('./source/js/lib/[^-]*.js')
		.on('error', log)
		.pipe(gulp.dest('./frontend/js/lib/'))
		.pipe(reload({stream: true}));
});

gulp.task('js_dev', sequence(
	['js_dev_main'],
	['js_dev_lib']
));


gulp.task('js_build_main', function () {
	return gulp.src('./source/js/[^-]*.js')
		.pipe(includeFile())
		//.pipe(babel())
		.pipe(closure({
			compilation_level: 'ADVANCED_OPTIMIZATIONS'
		}))
		.on('error', log)
		.pipe(gulp.dest('./frontend/js'));
});

gulp.task('js_build_lib', function () {
	return gulp.src('./source/js/lib/[^-]*.js')
		.pipe(closure({
			compilation_level: 'ADVANCED_OPTIMIZATIONS'
		}))
		.on('error', log)
		.pipe(gulp.dest('./frontend/js/lib/'));
});

gulp.task('js_build', sequence(
	['js_build_main'],
	['js_build_lib']
));


/*
 *
 *	IMAGE SECTION
 *
 */

gulp.task('img_dev', function () {
	return gulp.src('./source/img/**/*')
		.pipe(changed('./frontend/img/'))
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img/'))
		.pipe(reload({stream: true}));
});


gulp.task('img_build_imagemin', function () {
	return gulp.src(['./source/img/**/*.{svg,ico,gif}'])
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./frontend/img/'));
});

gulp.task('img_build_teenypng', function () {
	return gulp.src(['./source/img/**/*.{png,jpg}'])
		.pipe(teenypng({'apikey': 'fCeE49eA1dVhUEepFD0-XuqQq7bTcr3J'}))
		.pipe(gulp.dest('./frontend/img/'));
});

gulp.task('img_build', sequence(
	['img_build_imagemin'],
	['img_build_teenypng']
));

/*
 *
 *	LOCAL SERVER SECTION
 *
 */

gulp.task('browser-sync', function() {
	return browserSync({
		server: {
			baseDir: './',
			proxy: 'hoppas.dev',
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
	return gulp.src(['./frontend/', './*.html'])
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
	['stylus_build', 'jade_build', 'js_build'],
	['styleguide']
));


// Собираем дев
gulp.task('dev', sequence(
	['clean'],
	['stylus_dev', 'jade_dev', 'js_dev', 'img_dev'],
	['styleguide']
));


// Cледим за изменениями
gulp.task('watch', function() {
	watch('./source/**/*.styl', function () {
		gulp.start(['stylus_dev', 'styleguide']);
	});
	watch('./source/**/*.jade', function () {
		gulp.start(['jade_dev']);
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
