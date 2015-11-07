
/**
 * Окно Контрагенты.  
 */

Ext.define("Alternativa.view.Contractors", {
	extend: "Sultana.view.desktop.Window",
	
	requires: ["Alternativa.view.grid.Contractors"],
	
	title: "Контрагенты",
	taskBarTitle: "Контрагенты",
	
	width: 700,
	height: 400,
	
	layout: "fit",
	
	items: [{
		xtype: "altContractors"
	}]
	
});


