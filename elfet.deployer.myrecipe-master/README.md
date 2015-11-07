Мой рецепт для elfet/deployer
=============================

My recipe for https://github.com/elfet/deployer 

Инсталятор проектов.

Внимание, содержимое веб-папки удаляется без предупреждения!
Вместо веб-папки устанавливается симлинк на папку public текущего релиза.

После инсталяции проекта получается следующая структура:

```
/install/path
	/current -> /install/path/releases/20140812131123
	/releases
		/20140809150234
		/20140801145678
		/20140812131123
			/public
				/data -> /install/path/data/public
	/data
		/public

/document/root/path -> /install/path/current
```
