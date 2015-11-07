Мой инсталятор пакетов для composer
===================================

Аннотация
---------

Мой инсталятор добавляет новые функции к базовому инсталятору LibraryInstaller (type: "library"). На данный момент это только одна функция:
* Изменение пути установки пакета в его описании в файле composer.json.

Установка
---------

Для того, чтобы подключить инсталлер к своему пакету, нужно добавить в файл composer.json следующие инструкции:

```json
{
    "type": "khusamov-library",
    "require": {
        "khusamov/composer.installer": "1.0"
    },
    "extra": {
        "install-path": "library/install/path"
    }
}
```

Здесь install-path путь установки библиотеки, относительно директории, где расположен файл composer.json.
 