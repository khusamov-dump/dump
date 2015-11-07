
Ext.define("Sultana.application.module.desktop.Module", {
	extend: "Sultana.application.Module",
	
	views: ["Viewport"],
	
	exec: function() {
		var me = this;
		//me.getView("Viewport").create();
		
		Ext.create("Sultana.application.module.desktop.view.Viewport");
		
	}
	
});


