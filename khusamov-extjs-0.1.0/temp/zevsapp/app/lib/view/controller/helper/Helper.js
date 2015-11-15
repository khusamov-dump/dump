
/**
 * Базовый класс помощника контроллера вида.
 * Помошник в отличие от плагина предоставляет дополнительные методы, не меняя процесс работы контроллера.
 * Плагин обычно ничего не предоставляет, а самостоятельно встраивается в контроллер и самостоятельно работает.
 */

Ext.define("Zevs.lib.view.controller.helper.Helper", {
	
	alternateClassName: "Zevs.lib.view.controller.Helper",
	
	htype: null,
	
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
		if (!me.htype) me.htype = me.alias[0].split(".")[1];
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
	
	getHelperShortName: function() {
		var classpath = this.self.getName().split(".");
		var classname = classpath[classpath.length - 1];
		return classname.replace("Helper", "");
	},
	
});