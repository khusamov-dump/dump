
Ext.define("Alternativa.view.legalform.LegalFormForm", {
	
	extend: "Alternativa.view.base.tab.gridtab.Form",
	
	xtype: "legalformform",
	
	items: [{
		xtype: "fieldset",
		title: "Наименование организационно-правовой формы",
		defaults: {
			xtype: "textfield",
			anchor: "100%"
		},
		items: [{
			name: "title",
			fieldLabel: "Полное",
			allowBlank: false,
			bind: "{record.title}"
		}, {
			name: "title_short",
			fieldLabel: "Сокращенное",
			bind: "{record.title_short}"
		}]
	}]
	
});