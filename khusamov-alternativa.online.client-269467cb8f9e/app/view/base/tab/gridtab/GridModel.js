
Ext.define("Alternativa.view.base.tab.gridtab.GridModel", {
	
	extend: "Ext.app.ViewModel",
	
	alias: "viewmodel.gridtab",
	
	stores: {
		gridStore: {
			model: "{gridDataModel}",
			autoLoad: true
		}
	}
	
});


