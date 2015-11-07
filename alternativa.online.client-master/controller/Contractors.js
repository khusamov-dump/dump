
/**
 * Контроллер таблицы Контрагенты.  
 */

Ext.define("Alternativa.controller.Contractors", {
	extend: "Ext.app.Controller",
	
	views: ["Contractors"],

	models: ["Contractor"],
	
	stores: ["Contractors"],
	
	windows: {},
	
	init: function() {
		var me = this;
		
		var desktop = me.getController("Sultana.controller.Desktop");
		
		desktop.add(Ext.create("Sultana.StartMenuItem", {
			text: "Контрагенты",
			handler: function() {
				var window = me.getWindowContractors();
				desktop.add(window);
				window.show();
			}
		}));
	},
	
	getWindowContractors: function() {
		var me = this;
		if (!me.windows.contractors) me.windows.contractors = me.getView("Contractors").create();
		
		
		
		var win = me.windows.contractors;
		
		
		win.down("grid").setContextMenu({
			items: [{
				flags: ["single", "default"],
				text: "Редактировать",
				handler: me.contractors_edit,
				scope: me
			}, {
				text: "Добавить: Юридическое лицо",
				handler: me.contractors_insert_legal,
				scope: me
			}, {
				text: "Добавить: Физическое лицо",
				handler: me.contractors_insert_individual,
				scope: me
			}, {
				text: "Добавить: Индивидуального предпринимателя",
				handler: me.contractors_insert_businessman,
				scope: me
			}, {
				flags: ["multi"],
				text: "Удалить",
				handler: me.contractors_delete,
				scope: me
			}]
		});
		
		
		
		return me.windows.contractors;
	},
	
	contractors_edit: function() {
		var me = this;
		
	},
	
	contractors_insert_legal: function() {
		var me = this;
		me.getController("Contractor").openWindowLegal();
	},
	
	contractors_insert_individual: function() {
		var me = this;
		
	},
	
	contractors_insert_businessman: function() {
		var me = this;
		
	},
	
	contractors_delete: function() {
		var me = this;
		
	}

});


