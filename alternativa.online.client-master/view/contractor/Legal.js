
/**
 * Окно Контрагент.  
 */

Ext.define("Alternativa.view.contractor.Legal", {
	extend: "Sultana.window.Modal",
	
	config: {
		mode: "insert"
	},
	
	//requires: ["Alternativa.view.grid.Contractors"],
	
	title: "Контрагент",
	//taskBarTitle: "Контрагенты",
	
	width: 440,
	height: 250,
	
	layout: "fit",
	
	items: [{
		xtype: "form",
		bodyPadding: 5,
		layout: "anchor",
		fieldDefaults: {
			labelAlign: "top",
			anchor: "100%"
		},
		items: [{
			xtype: "hiddenfield",
			name: "contractor_id"
		}, {
			xtype: "combobox",
			name: "ownership_type_id",
			fieldLabel: "Организационно-правовая форма",
			editable: false,
			value: 1,
			queryMode: "remote",
			valueField: "id",
			store: Ext.create("Ext.data.Store", {
				fields: ["id", "text"],
				autoLoad: true,
				proxy: {
					type: "rest",
					url: "/alternativa/rest/ref/",
					extraParams: { ref: "ownership_type" },
					reader: {
						type: "json",
						root: "data"
					}
				}
			})
		}, {
			xtype: "textfield",
			name: "name",
			fieldLabel: "Название компании"
		}]
	}],
	
	buttons: [{
		itemId: "ok",
		text: "Создать"
	}, {
		itemId: "cancel",
		text: "Отмена",
		handler: function() {
			this.up("window").hide();
		}
	}],
	
	applyMode: function(mode) {
		var me = this;
		switch (mode) {
			case "insert": 
				me.setTitle("Новое юридическое лицо");
				break;
			case "update": 
				me.setTitle("Юридическое лицо");
				break;
		}
		return mode;
	}
	
});


