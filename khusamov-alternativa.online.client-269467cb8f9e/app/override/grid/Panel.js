
Ext.define("Alternativa.override.grid.Panel", {
	
	override: "Ext.grid.Panel",
	
	emptyText: "Данных для отображения нет.",
	
	viewConfig: { 
		deferEmptyText: false 
	},
	
	rowLines: false
	
});