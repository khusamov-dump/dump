
Ext.define("Alternativa.view.base.tab.gridtab.Grid", {
	
	extend: "Ext.grid.Panel",
	
	requires: [
		"Alternativa.view.base.tab.gridtab.GridController",
		"Alternativa.view.base.tab.gridtab.GridModel",
		"Alternativa.view.base.tab.gridtab.ContextMenu",
		"Alternativa.view.base.tab.gridtab.Dialog"
	],
	
	controller: "gridtab",
	
	viewModel: {
		type: "gridtab"
	},
	
	subViews: {
		form: null,
		dialog: null,
		contextMenu: null
	},
	
	selModel: {
		mode: "multi"
	},
	
	bind: {
		title: "{title}",
		store: "{gridStore}"
	},
	
	listeners: {
		itemcontextmenu: "onItemContextMenu",
		containercontextmenu: "onContainerContextMenu",
		containerclick: "onContainerClick"
	},
	
	bbar: {
		xtype: "pagingtoolbar",
		displayInfo: true,
		bind: {
			store: "{gridStore}"
		}
	}
	
});