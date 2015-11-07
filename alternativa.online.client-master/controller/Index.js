
Ext.define("Alternativa.controller.Index", {
	extend: "Ext.app.Controller",
	
	views: ["Index"],
	
	init: function() {
		var me = this;
		
		var desktop = me.getController("Sultana.controller.Desktop");
		var window = me.getView("Index").create();
		
		desktop.add(window);
		
		window.show();
		
		
		
		desktop.add(Ext.create("Sultana.StartMenuItem", {
			text: "Тестовая кнопка в стартовом меню"
		}));
		
		
	}

});


