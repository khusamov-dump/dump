
/**
 * Добавляется в контроллер вида.
 * Делает возможность создавать плагины для контроллера.
 * Плагин можно запустить, прервать, дождаться завершения.
 * Второй плагин нельзя запустить, если запущен первый.
 * 
 * Нужно добавить миксин в контроллер вида.
 * Контроллер вида наследовать от Zevs.lib.view.controller.Pluginable.
 * 
 * Плагины наследовать от Zevs.lib.view.controller.plugin.Modal.
 * и размещать в каталоге вида в ./plugin
 * 
 */

Ext.define("Zevs.lib.view.controller.mixin.Pluginable", {
	
	extend: "Ext.Mixin",
	
	mixinConfig: {
		id: "pluginable"
	},
	
	plugins: {},
	
	pluginClassNamePrefix: null,
	
	privates: {
		
		getPluginClass: function(name) {
			var result = Ext.ClassManager.get(this.getPluginClassName(name));
			if (!result) throw new Error("Не найден плагин '" + name + "' для контроллера " + this.self.getName());
			return result;
		},
		
		getPluginClassName: function(name) {
			name = name.split("/");
			var last = name[name.length - 1];
			last = last[0].toUpperCase() + last.substr(1);
			name[name.length - 1] = last;
			return this.pluginClassNamePrefix + name.join(".");
		},
		
	},
	
	constructor: function(config) {
		var me = this;
		me.initConfig(config);
		
		var classpath = me.self.getName().split(".");
		classpath.pop();
		classpath.push("plugin");
		me.pluginClassNamePrefix = classpath.join(".") + ".";
	},
	
	getPlugin: function(name) {
		var me = this;
		if (!me.plugins[name]) me.plugins[name] = me.getPluginClass(name).create({
			controller: me
		});
		return me.plugins[name];
	},
	
	onPluginStart: Ext.emptyFn,
	
	onPluginFinish: Ext.emptyFn,
	
	onPluginCancel: Ext.emptyFn,
	
	onPluginConflict: Ext.emptyFn
	
});