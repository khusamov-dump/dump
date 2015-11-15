
Ext.define("Zevs.view.main.MainController", {
	
	extend: "Ext.app.ViewController",
	
	alias: "controller.main",
	
	init: function() {
		var me = this;
		me.getViewModel().set("applicationTitle", Zevs.app.getTitle());
		
	},
	
	requestCommandHelper: function(name) {
		var me = this;
		me.fireViewEvent("requestcommandhelper", name);
	},
	
	onDesktopPluginFinish: function(result, plugin) {
		var me = this;
		me.lookupReference("commandToolbar").query(">*").forEach(function(button) {
			button.setPressed(false);
		});
	},
	
	onDesktopPluginCancel: function(result, plugin) {
		var me = this;
		me.lookupReference("commandToolbar").query(">*").forEach(function(button) {
			button.setPressed(false);
		});
	},
	
	onSetNeptuneTheme: function() {
		Ext.getBody().parent().down("head > link#ext-theme").set({
			href: "/ext-5.1.0/packages/ext-theme-neptune/build/resources/ext-theme-neptune-all.css"
		});
		Ext.toast("Подключена тема Нептун", "Смена темы");
	},
	
	onChangeSelection: function(selection) {
		var me = this;
		me.logSelection(selection);
	},
	
	logSelection: function(selection) {
		if (selection.getCount() == 1) {
			var item = selection.first().getProjectItem();
			console.log("Выбран элемент:", item.getId(), item.self.getName());
		} else if (selection.getCount() > 1) {
			console.log("Выбрано элементов: " + selection.getCount() + " эл.");
		} else {
			console.log("Ничего не выбрано.");
		}
	}
	
});