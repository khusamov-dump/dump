
Ext.define("Alternativa.view.grid.Contractors", {
	extend: "Sultana.grid.Panel",
	alias: "widget.altContractors",
	
	store: "Contractors",
	
	columns: [{
		dataIndex: "id",
		text: "Номер",
		width: 50
	}, {
		dataIndex: "title",
		text: "Контрагент",
		flex: 2
	}, {
		dataIndex: "contractor_type_title",
		text: "Тип контрагента",
		flex: 1
	}, {
		dataIndex: "created",
		text: "Создана запись",
		renderer: Ext.util.Format.dateRenderer("d.m.Y"),
		flex: 1
	}, {
		dataIndex: "changed",
		text: "Изменена запись",
		renderer: Ext.util.Format.dateRenderer("d.m.Y"),
		flex: 1
	}],
	
	bbar: {
		xtype: "pagingtoolbar",
		store: "Contractors",
		displayInfo: true
	}

});


