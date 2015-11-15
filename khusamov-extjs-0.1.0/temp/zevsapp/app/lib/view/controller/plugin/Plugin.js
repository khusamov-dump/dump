
/**
 * Базовый класс плагина контроллера вида.
 * Помошник в отличие от плагина предоставляет дополнительные методы, не меняя процесс работы контроллера.
 * Плагин обычно ничего не предоставляет, а самостоятельно встраивается в контроллер и самостоятельно работает.
 */

Ext.define("Zevs.lib.view.controller.plugin.Plugin", {
	
	alternateClassName: "Zevs.lib.view.controller.Plugin",
	
	config: {
		
		/**
		 * Контроллер вида.
		 * @property {Ext.app.ViewController}
		 */
		controller: null
		
	},
	
	constructor: function(config) {
		var me = this;
		me.initConfig(config);
	},
	
	/**
	 * Получить модель вида.
	 */
	getViewModel: function() {
		return this.getController().getViewModel();
	},
	
	/**
	 * Получить вид.
	 */
	getView: function() {
		return this.getController().getView();
	},
	
	getPluginName: function() {
		var classpath = this.self.getName().split(".");
		var name = classpath.filter(function(name, index, classpath) {
			if (name == "plugin") {
				classpath._test = true;
				return false;
			}
			return classpath._test;
		});
		
		name[1] = name[1].toLowerCase()
		
		return name.join("/");
	}
	
});