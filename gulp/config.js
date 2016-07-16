
import imageminPngquant from 'imagemin-pngquant'
import util from 'gulp-util'
import yargs from 'yargs'

import packageJson from '../package.json'


const headerCat = `
/*!
 * @author ${packageJson.author.name}
 * @version ${packageJson.version}
 *
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
 *      $____$   $$$$__$___hope___$__$$$$
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


const errorHandler = function (err) {
  util.log([(`${err.name} in ${err.plugin}`).bold.red, '', err.message, ''].join('\n'))
  if (util.env.beep) {
    util.beep()
  }
  this.emit('end')
}


const path = {
  src: './source/',
  dest: './app/'
}

const config = {
  isProd: yargs.boolean('prod').argv.prod,
  headerCat,
  src: path.src,
  dest: path.dest,
  plumber: {
    errorHandler
  },
  styles: {
    src: path.src + 'styles/hoppas.styl',
    dest: path.dest + 'frontend/css/',
    watch: path.src + '**/*.styl',
    base64: {
      extensions: ['png', 'svg', 'jpg'],
      maxImageSize: 1024 * 10
    },
    autoprefixer: {
      browser: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7']
    }
  },
  fonts: {
    src: path.src + 'fonts/fonts.styl',
    dest: path.dest + 'frontend/css/',
    base64: {
      extensions: ['woff'],
      maxImageSize: 1024 * 1024 * 10
    },
    autoprefixer: {
      browser: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7']
    }
  },
  docs: {
    src: path.src + 'styles/hoppas.styl',
    dest: path.dest + 'docs/'
  },
  html: {
    data: {
      src: path.src + 'modules/**/data.json',
      fileName: 'data.json',
      dest: path.dest + 'tmp/'
    },
    tpl: {
      src: path.src + 'pages/*.pug',
      pathToJson: path.dest + 'tmp/data.json',
      dest: path.dest
    },
    watch: [path.src + 'modules/**/data.json', path.src + '**/*.pug', path.src + 'modules/**/*.pug']
  },
  scripts: {
    src: {
      main: path.src + 'scripts/*.js',
      lib: path.src + 'scripts/lib/*.js'
    },
    dest: {
      main: path.dest + 'frontend/js/',
      lib: path.dest + 'frontend/js/'
    },
    watch: path.src + '**/*.{js}'
  },
  images: {
    src: path.src + 'img/**/*',
    dest: path.dest + 'frontend/img/',
    watch: path.src + 'img/**/*',
    imagemin: {
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        {
          removeViewBox: false
        }
      ],
      use: [imageminPngquant()]
    }
  }
}

export default config
