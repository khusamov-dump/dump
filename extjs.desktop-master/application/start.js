
Ext.Loader.setPath("Ext.ux", "/alternativa/library/extjs/4.2.1/examples/ux");

Ext.Loader.setPath("Sultana", "/alternativa/library/sultana/2.00");


Ext.require("Sultana.Application", function() {
	
	Ext.onReady(function() {
		
		var app = Sultana.createApplication({
			
			name: "Alternativa",
			folder: "/alternativa",
			modules: [".Employees"]
			
		});
		
		app.exec();
		
	});
	
});



