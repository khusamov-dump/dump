
Ext.define("Sultana.Application", {
	
	mixins: {
		observable: "Ext.util.Observable"
	},
	
	statics: {
		
		instance: null,
		
		createApplication: function(config) {
			var me = this;
			if (me.instance) throw new Error("Больше одного приложения определять нельзя.");
			config = Ext.Object.merge({ name: name }, config || {});
			me.instance = Ext.create("Sultana.Application", config);
			return me.instance;
		}
		
	},
	
	launched: false,
	
	launch: Ext.emptyFn,
	
	config: {
		name: null,
		folder: null,
		modules: {},
		autoexec: ["Sultana.Desktop"]
	},
	
	constructor: function(config) {
		var me = this;
		
		me.mixins.observable.constructor.call(me, config);
		me.addEvents("launch");
		
		
		
		
		config.modules = me._prepareConfigModules(config.modules);
		
		
		// Добавляем стандартные модули
		config.modules = Ext.Object.merge(config.modules, {
			"Sultana.Desktop": true
		});
		
		
		
		me.initConfig(config);
		
		
		
		
		Ext.Loader.setPath(me.getName(), me.getFolder());
	},
	
	
	/**
	 * Приведение в норму списка модулей. 
	 * Если он в виде массива, то конвертирует в объект.
	 * @param Object | Array modules
	 * @returns Object
	 */
	_prepareConfigModules: function(modules) {
		var result = {};
		if (modules && Ext.isArray(modules)) {
			Ext.Array.each(modules, function(module) {
				result[module] = true;
			});
		}
		return result;
	},
	
	
	applyModules: function(modulenames) {
		var me = this;
		var modules = {};
		Ext.Object.each(modulenames, function(name, params) {
			params = Ext.isBoolean(params) ? {} : params;
			// Получаем короткое имя модуля
			var shortname = name[0] == "." ? me.getName() + name : name;
			// Конвертируем краткое имя модуля в имя класса модуля
			var split = shortname.split(".");
			var moduleNameTpl = new Ext.Template("{namespace}.application.module.{module}.Module");
			var classname = moduleNameTpl.apply({
				namespace: split[0],
				module: split[1].toLowerCase()
			});
			// Сохраняем результат
			modules[shortname] = {
				classname: classname,
				params: params,
				instance: null
			};
		});
		return modules;
	},
	
	_autoexec: function() {
		var me = this;
		Ext.Array.each(me.getAutoexec(), function(name) {
			me.getModule(name).exec();
		});
	},
	
	exec: function() {
		var me = this;
		me._autoexec();
		me.launch();
		me.launched = true;
		me.fireEvent("launch", me);
	},
	
	getModule: function(shortname) {
		var me = this;
		var module = me.getModules()[shortname];
		if (!module) throw new Error("Не найден модуль с именем: " + shortname);
		if (!module.instance) {
			module.instance = Ext.create(module.classname, Ext.Object.merge({
				application: me
			}, module.params));
		}
		return module.instance;
	}
	
}, function() {
	
	Sultana.createApplication = function() {
		return Sultana.Application.createApplication.apply(Sultana.Application, arguments);
	};
	
});


