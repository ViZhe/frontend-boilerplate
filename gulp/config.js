
import imageminPngquant from 'imagemin-pngquant'
import util from 'gulp-util'
import yargs from 'yargs'


const headerCat = `
/*!
 *                  $$____________$$
 *                  $___$________$___$
 *                  $_____$$$$$$_____$
 *                 $_____sss___sss____$
 *                $______ii_____ii_____$
 *                 $_______$$$________$
 *     $$$$$$$$     $_______$________$
 *   $$________$       $$_________$$
 *    $_________$     $___$$$$$___$
 *       $______$    $__$________$__$
 *       $_____$    $__$__________$__$
 *      $____$   $$$$__$__________$__$$$$
 *     $___$    $____$__$________$___$___$
 *     $__$     $____$__$________$__$____$
 *    $___$      $____$__$____$_$__$____$
 *      $__$      $____$___$_$_____$___$
 *       $___$$$$$_$___$___$_$____$___$
 *          $$$$$_$____$____$_____$____$
 *                $$$_$_____$______$_$$$
 *                     $$$$___$$$$$
 */
`

function errorHandler(err) {
  util.log([(`${err.name} in ${err.plugin}`).bold.red, '', err.message, ''].join('\n'))
  if (util.env.beep) {
    util.beep()
  }
  this.emit('end')
}

const path = {
  src: 'source/',
  dest: 'app/',
}

const config = {
  isProd: yargs.boolean('prod').argv.prod,
  headerCat,
  src: path.src,
  dest: path.dest,
  plumber: {
    errorHandler,
  },
  styles: {
    src: {
      main: `${path.src}styles/index.scss`,
      all: `${path.src}styles/**/*.scss`,
    },
    dest: `${path.dest}frontend/styles/`,
    watch: `${path.src}styles/**/*.scss`,
    postcss: {
      assets: {
        loadPaths: [
          `${path.dest}frontend/media`,
        ],
        relative: true,
        cache: true,
        cachebuster: true,
      },
      autoprefixer: {
        browsers: [
          '> 5%',
          'last 2 versions',
          'Explorer >= 10',
          'iOS >= 7.1',
        ],
      },
    },
    sass: {
      outputStyle: 'expanded',
    },
  },
  fonts: {
    src: `${path.src}fonts/fonts.css`,
    dest: `${path.dest}frontend/styles/`,
    watch: `${path.src}fonts/*.css`,
    base64: {
      extensions: ['woff'],
      maxImageSize: 1024 * 1024 * 10,
    },
  },
  html: {
    src: `${path.src}templates/*.ejs`,
    dest: path.dest,
    watch: [
      `${path.src}**/*.ejs`,
      `${path.src}modules/**/*.ejs`,
    ],
  },
  scripts: {
    src: {
      main: `${path.src}scripts/index.js`,
      all: `${path.src}scripts/**/*.js`,
    },
    dest: `${path.dest}frontend/scripts/`,
    watch: `${path.src}scripts/**/*.js`,
  },
  images: {
    src: `${path.src}media/**/*`,
    dest: `${path.dest}frontend/media/`,
    watch: `${path.src}media/**/*`,
    imagemin: {
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        {cleanupIDs: false},
        {removeViewBox: false},
      ],
      use: [imageminPngquant()],
    },
  },
}


export default config
