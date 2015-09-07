
version = v: require('./../version.json')
headerCat = [
  '/*!'
  ' * @author ViZhe (Barsik^)'
  ' * @version ${v.major}.${v.minor}.${v.patch}-${v.prerelease}/${v.project}'
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
