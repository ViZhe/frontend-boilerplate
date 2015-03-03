#Hoppas

Универсальный HTML (Slim), CSS (Stylus) Framework.


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
npm install
 ```

2) Запустить gulp
 ```
gulp
 ```
