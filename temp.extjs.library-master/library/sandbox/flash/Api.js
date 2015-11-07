
/**
 * Компонент, реализующий мост с флешкой.
 * Флешка должна реализовывать следующий интерфейс:
 * _OnReady() - флешка вызывает когда готова к приему команд.
 * _OnChange(type, data) - вызывает, когда что-то изменилось в ее содержимом.
 * swf.api(method, params) - через эту функцию предоставляет свой API. 
 */

Ext.define("Khusamov.sandbox.flash.Api", {
	extend: "Ext.flash.Component",
	alias: "widget.khusamov.sandbox.flash.api",
	
	flashVersion: "11.0.0",
	
	/**
	 * Флаг готовности API к приему команд.
	 */
	ready: false,
	
	/**
	 * Конструктор.
	 * @param config
	 */
	constructor: function(config) {
		var me = this;
		
		me.addEvents("ready", "change");
		
		// Передаем уникальный номер флешки во флешку
		config.flashVars = config.flashVars || {};
		config.flashVars.id = me.getFlashId();
		
		// Регистрируем обработчик состояния готовности флешки
		me.registerCallback("OnReady", me.onReady);

		// Генерируем флешку
		me.callParent([config]);
	},
	
	/**
	 * Базовый обработчик события.
	 */
	onReady: function() {
		var me = this;
		try {
			me.ready = true;
			me.registerCallback("OnChange", me.onChange);
			me.fireEvent("ready");
		} catch (error) {
			me.onFlashErrorCatch(error);
		}
	},

	/**
	 * Базовый обработчик события.
	 */
	onChange: function(type, data) {
		var me = this;
		try {
			/*me.fireEvent("change", {
				type: type, 
				data: data
			});*/
			me.fireEvent("change", type, data);
		} catch (error) {
			me.onFlashErrorCatch(error);
		}
	},
	
	onFlashErrorCatch: function(error) {
		// Так приходится ловить ошибки из-за того, 
		// что после первого вызова JS-функции из флешки консоль не выдает ошибки должным образом.
		// Тема на форуме "Использование ExternalInterface блокирует вывод JS-ошибок"
		// http://javascript.ru/forum/showthread.php?p=156175
		// http://javascript.ru/forum/misc/25543-ispolzovanie-externalinterface-blokiruet-vyvod-js-oshibok.html
		var skip = Ext.isWebKit ? 1 : 0;
		var line = Ext.String.trim(error.stack.split("\n")[skip]);
		
		line = line.replace("http:/", "").replace("function:", "");
		if (Ext.isWebKit) {
			line = line.split("(")[1].split(":");
			line = line[0] + ":" + line[1];
		} else {
			line = line.split("@");
			line = line[1];
		}

		var message = Ext.String.trim(error.message);
		line = Ext.String.trim(line);
		
		var args = ["Error { " + message + " } in file { " + line + " }"];
		if (error.stack) {
			args.push("Stack:");
			args.push({ stack: error.stack.split("\n") });
		}
		console.error.apply(console, args);
		
		throw error;
	},
	
	/**
	 * Возвращает элемент-контейнер флешки.
	 * @return HTMLElement
	 */
	getFlashEl: function() {
		var me = this;
		return me.swf;
	},
	
	/**
	 * Уникальный номер элемента-контейнер флешки.
	 */
	getFlashId: function() {
		var me = this;
		return me.getSwfId();
	},
	
	/**
	 * Регистрация нового обработчика вызовов флешки.
	 * Добавляет в window функцию, которая вызывается из флешки.
	 */
	registerCallback: function(name, callback, scope) {
		var me = this;
		var fname = me.getFlashId() + "_" + name;
		scope = me;
		window[fname] = function() {
			callback && callback.apply(scope, arguments);
		};
		return me;
	},

	/**
	 * Возвращает true, если API флешки готов к приему команд.
	 */
	isReady: function() {
		var me = this;
		return me.ready;
	},
	
	/**
	 * Пользовательский интерфейс флешки.
	 * Вызов функций флешки.
	 */
	api: function(method, params) {
		var me = this, result = null;
		result = me.getFlashEl().dom.api(method, params);
		return result;
	}
	
});

