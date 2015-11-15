
Ext.define("Zevs.controller.Root", {
	
	extend: "Ext.app.Controller",
	
	refs: [{
		ref: "desktopPanel",
		selector: "zevs-view-desktop"
	}],
	
	init: function(application) {
		
	},
	
	onLaunch: function(application) {
		var me = this;
		
		application.getMainView().on("requestcommandhelper", "onRequestCommandHelper", me);
		
		
		me.getDesktopPanel().getController().on({
			scope: me,
			plugincancel: "onDesktopPluginCancel",
			pluginfinish: "onDesktopPluginFinish",
			pluginconflict: "onDesktopPluginConflict"
		});
		
		
	},
	
	onRequestCommandHelper: function(commandHelperName) {
		var me = this;
		me.getDesktopPanel().getSelectManager().freeze();
		me.getDesktopPanel().getController().getPlugin(commandHelperName).start();
	},
	
	
	
	onDesktopPluginFinish: function(result, plugin) {
		var me = this;
		me.getDesktopPanel().getSelectManager().unfreeze();
		
		
		var command = plugin.getPluginName().split("/");
		command = command[1] + "." + command[0];
		Zevs.app.execCommand(command, [result]);
	},
	
	onDesktopPluginCancel: function(result, plugin) {
		var me = this;
		me.getDesktopPanel().getSelectManager().unfreeze();
	},
	
	onDesktopPluginConflict: function(plugin, conflicted) {
		var message = new Ext.Template("Вы пытаетесь запустить команду '{conflicted}' не завершив команду '{plugin}'.");
		message = message.apply({
			plugin: plugin.getPluginName(),
			conflicted: conflicted.getPluginName()
		});
		Ext.toast(message, "Ошибка");
	},
	
	
});