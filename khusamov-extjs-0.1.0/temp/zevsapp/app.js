
/**
 * Демонстрационное приложение.
 * Прототип построителя оконных изделий.
 * Основные функции: создание изделий, соединителей, рам, балок рамы, импостов.
 */

Ext.Loader.setPath("Khusamov.svg", "../../src");
Ext.Loader.setPath("Zevs", "app");
Ext.require(["Khusamov.svg.override.dom.Element"]);
Ext.onReady(function() { Ext.FocusManager.enable(); });

Ext.application("Zevs.Application");

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// console

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
		args.unshift("Zevs", "|");
		//args.push("|", caller());
		return console.$log.apply(console, args);
	};
	
	console.$info = console.info;
	console.info = function() {
		var args = Ext.Array.slice(arguments);
		args.unshift("Zevs", "|");
		args.push("|", caller());
		return this.$info.apply(console, args);
	};
	
})();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Делегируемые методы

/*
	Пример:
	delegates: {
		points: {
			addPoint: {
				chainable: true,
				name: "addPoint"
			},
			setPointXY: true
		}
	}
*/

Ext.ClassManager.registerPostprocessor("delegates", function(name, cls, data) {
	var overrideConfig = {};
	Ext.Object.each(data.delegates, function(delegate, methods) {
		Ext.Object.each(methods, function(delegateMethodName, method) {
			method = Ext.isObject(method) ? method : { chainable: method };
			var overrideMethodName = method.name ? method.name : delegateMethodName;
			overrideConfig[overrideMethodName] = function() {
				var result = this[delegate][delegateMethodName].apply(this[delegate], arguments);
				return method.chainable ? this : result;
			};
		});
	});
	cls.override(overrideConfig);
});