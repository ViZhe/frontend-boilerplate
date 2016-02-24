
version = v: require('./../package.json')
headerCat = [
  '/*!'
  ' * @author ${v.author.name}'
  ' * @version ${v.version}'
  ' *'
  ' *                  $$____________$$'
  ' *                  $___$________$___$'
  ' *                  $_____$$$$$$_____$'
  ' *                 $_____sss___sss____$'
  ' *                $______ii_____ii_____$'
  ' *                 $_______$$$________$'
  ' *     $$$$$$$$     $_______$________$'
  ' *   $$________$       $$_________$$'
  ' *    $_________$     $___$$$$$___$'
  ' *       $______$    $__$________$__$'
  ' *       $_____$    $__$__________$__$'
  ' *      $____$   $$$$__$___hope___$__$$$$'
  ' *     $___$    $____$__$________$___$___$'
  ' *     $__$     $____$__$________$__$____$'
  ' *    $___$      $____$__$____$_$__$____$'
  ' *      $__$      $____$___$_$_____$___$'
  ' *       $___$$$$$_$___$___$_$____$___$'
  ' *          $$$$$_$____$____$_____$____$'
  ' *                $$$_$_____$______$_$$$'
  ' *                     $$$$___$$$$$'
  ' */'
  ''
].join('\n')

path =
    src: './source/'
    dest: './app/'


global['config'] =
    version: version
    headerCat: headerCat
    src: path.src
    dest: path.dest
    styles:
        src:
            main: path.src + 'styles/hoppas.styl'
            fonts: path.src + 'styles/fonts/fonts.styl'
        dest: path.dest + 'frontend/css/'
        watch: path.src + '**/*.styl'
        base64:
            fonts:
                extensions: ['woff']
                maxImageSize: 1024 * 1024 * 10 # 10 mb
        autoprefixer:
            browser: ['last 2 versions',
                      'Explorer >= 10',
                      'Android >= 4.1',
                      'Safari >= 7',
                      'iOS >= 7']
    docs:
        src: path.src + 'styles/hoppas.styl'
        dest: path.dest + 'docs/'

    html:
        data:
            src: path.src + 'modules/**/data.json'
            fileName: 'data.json'
            dest: path.dest + 'tmp/'
        tpl:
            src: path.src + 'pages/*.jade'
            pathToJson: path.dest + 'tmp/data.json'
            dest: path.dest
        watch: [
            path.src + 'modules/**/data.json'
            path.src + '**/*.jade'
            path.src + 'modules/**/*.jade'
        ]

    scripts:
        src:
            main: path.src + 'scripts/*.coffee'
            lib: path.src + 'scripts/lib/*.js'
        dest:
            main: path.dest + 'frontend/js/'
            lib: path.dest + 'frontend/js/lib/'
        watch: path.src + '**/*.{js,coffee}'
        closureCompilerService:
            compilation_level: 'SIMPLE_OPTIMIZATIONS'

    images:
        src: path.src + 'img/**/*'
        dest: path.dest + 'frontend/img/'
        watch: path.src + 'img/**/*'
        tinypngCompress:
            key: 'R0pdfmQ54wn5qqaERw6yUgWbuhBOqhty'
