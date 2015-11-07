<?php

/**
 * Инсталятор проектов.
 * 
 * Внимание, содержимое веб-папки удаляется без предупреждения!
 * Вместо веб-папки устанавливается симлинк на папку public текущего релиза.
 * 
 * После инсталяции проекта получается следующая структура:
 * 
 * /install/path
 * 	/current -> /install/path/releases/20140812131123
 * 	/releases
 * 		/20140809150234
 * 		/20140801145678
 * 		/20140812131123
 * 			/public
 * 				/data -> /install/path/data/public
 * 	/data
 * 		/public
 * 
 * /document/root/path -> /install/path/current
 * 
 */

/* Пример файла для конкретного проекта

$name = "Alternativa Online 2014";
require("../deploy.php");

// Настройки проекта.

$ip = "000.000.000.000";
$login = "alternativa";
$homedir = "/var/www/$login/data";

set("packageName", "khusamov/alternativa.online");
set("installPath", "$homedir/alternativa-online");
set("documentRootPath", "$homedir/www/alternativa-online.fvds.ru");

// Настройка сервера.

server("main", $ip)
	->path(get("installPath", null))
	->user($login)
	->pubKey("key.pub", "key.ppk");
*/

/**
 * Настройки.
 */

set("keepReleases", 3);

// Вспомогательные функции

function makeSymLink($name, $target) {
	return run("ln -sf $target $name");
}

function makeDir($path, $raw = false) {
	return run("if [ ! -d '$path' ]; then mkdir $path; fi", $raw);
}

function copyFile($from, $to) {
	return run("cp $from $to");
}

function composer($command) {
	return run ("composer $command");
}

function isDir($path, $raw = false) {
	return trim(run("if [ -d $path ]; then echo 'true'; fi", $raw)) == "true";
}

function isFile($path, $raw = false) {
	return trim(run("if [ -f $path ]; then echo 'true'; fi", $raw)) == "true";
}

function installed() {
	$installPath = config()->getPath();
	return isDir("$installPath/releases", true) && isDir("$installPath/data", true);
}

/**
 * Подготовка сервера.
 * Создание структуры директорий.
 */	
task("deploy:setup", function() {
	$installPath = config()->getPath();
	makeDir($installPath, true);
	makeDir("$installPath/releases");
	makeDir("$installPath/data");
	makeDir("$installPath/data/public");
	$documentRootPath = get("documentRootPath", null);
	run("rm -rf $documentRootPath");
	makeSymLink($documentRootPath, "$installPath/current/public");
	info(PHP_EOL . "Warning! Deleted content of directory $documentRootPath");
})->desc("Preparing server for deploy");

/**
 * Загрузка кода в новый релиз.
 */
task("deploy:download", function() {
	if (installed()) {
		$installPath = config()->getPath();
		$packageName = get("packageName", null);
		if ($packageName) {
			$name = date("Ymd") . substr((string)time(), -5);
			$newReleasePath = "$installPath/releases/$name";
			makeDir($newReleasePath);
		
			env()->setReleasePath($newReleasePath);
			//env()->set("isNewRelease", true);

			$output = composer("create-project -s dev $packageName $newReleasePath");
			file_put_contents("composer.log", $output);
			makeSymLink("$newReleasePath/public/data", "$installPath/data/public");
		}
	}
})->desc("Download Project into new release (composer create-project -s dev)");

/**
 * Создание симлинка на текущий релиз.
 */
task("deploy:current", function() {
	if (installed()) {
		$installPath = config()->getPath();
		$newReleasePath = env()->getReleasePath();
		run("rm -f $installPath/current");
		makeSymLink("$installPath/current", $newReleasePath);
	}
})->desc("Creating current symlink to new release");	

/**
 * Удаление всех релизов кроме последних трех.
 */
task("deploy:cleanup", function() {
	if (installed()) {
		$installPath = config()->getPath();
		$releasesPath = "$installPath/releases";
		$releases = env()->getReleasesByTime();
		$keep = get("keepReleases", 3);
		while ($keep > 0) { array_shift($releases); --$keep; }
		foreach ($releases as $release) run("rm -rf $releasesPath/$release");
	} else {
		info(PHP_EOL . "No installed Project.");
	}
})->desc("Cleanup prev releases");

/**
 * Развертывание приложения.
 */
task("app:deploy", [
	"deploy:download", 
	"deploy:current", 
	"deploy:cleanup"
])->desc("Deploy new Project Release");

/**
 * Откат до предыдущего релиза.
 */
task("app:rollback", function() {
	$installPath = config()->getPath();
	$releases = env()->getReleases();
	$currentReleasePath = env()->getReleasePath();
	if (isset($releases[1])) {
		$prevReleasePath = "$installPath/releases/{$releases[1]}";
		// Предыдущий релиз делаем текущим
		run("rm -f $installPath/current");
		makeSymLink("$installPath/current", $prevReleasePath);
		env()->setReleasePath($prevReleasePath);
		// Удаляем текущий релиз
		run("rm -rf $currentReleasePath");
	} else {
		info(PHP_EOL . "No more releases you can revert to.");
	}
})->desc("Rollback to previous Project Release");

/**
 * Обновить проект.
 * Новый релиз не создается, но текущий релиз обновляется composer-ом.
 * Это быстрее работает, чем app:deploy, но откат невозможен.
 */
task("app:update", function() {
	if (installed()) {
		cd(env()->getReleasePath());
		$output = composer("update");
		writeln(PHP_EOL . $output);
	} else {
		info(PHP_EOL . "No installed Project.");
	}
})->desc("Update current Project Release");

/**
 * Инсталяция проекта.
 * Сначала нужно инсталировать проект командой app:install.
 * В дальнейшем только обновлять командой app:deploy или app:update.
 */
task("app:install", [
	"deploy:setup", 
	"deploy:download", 
	"deploy:current", 
	"deploy:cleanup"
])->desc("Install Project '$name'");

/**
 * Удаление проекта.
 * Каталог с данными пользователя (install/path/data) сохраняется (если опция --with-data != yes).
 * Внимание, файл .htaccess из веб-папки будет удален.
 */
task("app:uninstall", function($input) {
	if (installed()) {
		$installPath = config()->getPath();
		$documentRootPath = get("documentRootPath", null);
		run("rm -f $documentRootPath");
		makeDir($documentRootPath);
		
		info(PHP_EOL);
		info("Restored directory $documentRootPath");
		
		if ($input->getOption("with-data") == "yes") {
			run("rm -rf $installPath");
			info("Deleted directory $installPath");
		} else {
			run("rm -f $installPath/current");
			run("rm -rf $installPath/releases");
			info("Deleted symlink $installPath/current");
			info("Deleted directory $installPath/releases");
		}
	} else {
		info(PHP_EOL . "No installed Project.");
	}
})->desc("Uninstall Project '$name' (--with-data)")->option("with-data", null, "Delete with user data directory (no|yes)", "no");


