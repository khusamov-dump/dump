
Ext.define("Alternativa.view.main.Main", {
	
	extend: "Ext.panel.Panel",
	
	requires: [
		"Alternativa.view.main.MainModel", 
		"Alternativa.view.main.MainController"
	],
	
	plugins: "viewport",
	
	controller: "main",
	
	viewModel: {
		type: "main"
	},
	
	layout: "border",
	border: false,
	
	items: [{
		xtype: "tabpanel",
		reference: "desktop",
		itemId: "desktop",
		region: "center",
		border: false,
		
		defaults: {
			border: false
		}
		
	}, {
		xtype: "treepanel",
		reference: "mainmenu",
		itemId: "mainmenu",
		title: "Альтернатива Онлайн 2015",
		region: "west",
		split: true,
		width: 400,
		border: false,
		store: "MainMenu"
	}]
	
});