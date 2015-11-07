Альтернатива Онлайн 2014
=======================

Введение
------------
Программа "Альтернатива Онлайн 2014" позволяет вести учет расходов/доходов по предприятию.

Требования
----------

PHP 5.3.3  
PostgreSQL 9.*  
Zend Framework 2.* (включена в поставку)  
Sencha Ext JS 4.2.1 (включена в поставку)  

Установка
---------
Предполагается что в системе доступны команды `curl` и `php`. Вместо `path/to/install` пропишите путь, куда следует установить программу.

    curl -s https://getcomposer.org/installer | php --
    php composer.phar create-project --keep-vcs -s dev khusamov/alternativa.online path/to/install

Установка в среде Windows
-------------------------
Предполагается, что установлен PHP версии 5.3.3 или выше и доступен в командной строке по команде `php`. Вместо `path/to/install` пропишите путь, куда следует установить программу.

    php -r "readfile('https://getcomposer.org/installer');" | php
    php composer.phar create-project --keep-vcs -s dev khusamov/alternativa.online path/to/install

Здесь, можно первую строку (скачивание устилиты composer) пропустить, если скачать файл `composer.phar` отдельно со страницы [getcomposer.org/download](https://getcomposer.org/download/).

Если composer установлен при помощи [инсталятора Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe), то можно воспользоваться более простой командой:

    composer create-project --keep-vcs -s dev khusamov/alternativa.online path/to/install

Альтернативная установка
------------------------
Предполагается, что установлен [git](http://git-scm.com/).

    cd path/to/install
    git clone git://github.com/khusamov/alternativa.online.git
    cd alternativa.online
    php composer.phar self-update
    php composer.phar install

Настройка веб-сервера
---------------------

После установки программы необходимо настроить веб-сервер так, чтобы публично доступной папкой стала `public` (которая находится в корне установленной программы).

В качестве базы данных следует установить/использовать PostgreSQL.

Ссылки
------

Описание                   | Ссылка
---------------------------|--------------------------------------
                           | https://getcomposer.org/
                           | https://packagist.org/
Книжка Pro Git             | https://github.com/progit/progit
Книжка Pro Git (перевод)   | http://habrahabr.ru/post/150673/
                           | http://githowto.com/ru
Командная строка msysgit   | http://msysgit.github.io/
Официальный сайт Git       | http://git-scm.com/
PHP для Windows            | http://windows.php.net/download/
GUI для Git                | https://code.google.com/p/tortoisegit/
GUI для Git                | http://www.syntevo.com/smartgit/
  
####Разное
https://github.com/composer/composer  
http://www.yiiframework.com/forum/index.php/topic/48736-yii-composer-yiicomposer/  
https://github.com/MihailDev/yii2-test-theme/blob/master/composer.json  
https://github.com/MihailDev/yii2-thememanager/blob/master/composer.json 
