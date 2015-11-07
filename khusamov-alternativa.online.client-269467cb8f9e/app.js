
/**
 * Запуск приложения «Альтернатива Онлайн 2015».
 */

Ext.application("Alternativa.Application");

/**
 * Функции вывода в консоли.
 * TODO Перенести в библиотеку Khusamov.*
 */

(function() {
	
	var path = window.location.pathname.split("/");
	path.pop();
	var folderApp = path.join("/") + "/";
	
	function caller(line) {
		try { throw Error(); } catch(e) {
			var part = e.stack.split("\n")[line || 4].split("(");
			var file = part[1].split(")")[0].split(":");
			var lineno = file[2];
			var fname = part[0].split("at ")[1].trim();
			file = file[1].split(window.location.hostname)[1].split("?")[0];
			//file = file.split(folderApp)[1];
			file = file.replace(folderApp, "");
			return file + ":" + lineno;
			/*return { "Вызов": {
				"Функция": fname,
				"Файл": file,
				"Строка": line
			}};*/
		}
	}
	
	console.$log = console.log;
	console.log = function() {
		var args = Ext.Array.slice(arguments);
		args.unshift("Alternativa", "|");
		//args.push("|", caller());
		return console.$log.apply(console, args);
	};
	
	console.$info = console.info;
	console.info = function() {
		var args = Ext.Array.slice(arguments);
		args.unshift("Alternativa", "|");
		args.push("|", caller());
		return this.$info.apply(console, args);
	};
	
})();

