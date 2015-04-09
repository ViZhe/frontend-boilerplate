#Hoppas

HTML (Slim), CSS (Stylus) Kit Starter.

## Поддержка браузеров
* Последние Chrome и Firefox
* IE10+
* Safari 7+

##Настройка gulp

0) Для Slim'a нужны [Ruby и DevKit](http://rubyinstaller.org/downloads/)
 * Открываем Start Command Prompt with Ruby и устанавливаем

 ```
ruby dk.rb init
ruby dk.rb review
ruby dk.rb install
gem source --add http://rubygems.org
gem install bundle slim
 ```
 * Добавляем в ```(Путь до папки Ruby и DevKit)\lib\ruby\gems\2.1.0\gems\slim-3.0.2\lib\slim.rb```

 ```
 require 'slim/include'
 ```

1) Установить зависимости
 ```
npm i
 ```

2) Запустить gulp
 * Cобираем dev билд, запускаем локальный серве
 ```
gulp
 ```
 * Cобираем dev версию
 ```
gulp dev
 ```
 * Cобираем релизную версию
 ```
gulp build
 ```
