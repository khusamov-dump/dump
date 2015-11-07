
Ext.define("Alternativa.view.base.form.field.foreignkey.ForeignKeyDialog", {
	
	extend: "Alternativa.view.base.window.Modal",
	
	xtype: "foreignkeydialog",
	
	layout: "fit",
	
	height: 350,
	
	width: 700,
	
	bodyPadding: 0,
	
	config: {
		valueField: null
	},
	
	buttons: [{
		text: "Ок",
		bind: {
			text: "Выбрать",
			disabled: "{!grid.selection}"
		},
		handler: function() {
			
			// TODO разобраться, почему он таблицы по ссылке не может найти
			//console.info(this.up("window").lookupReference("grid"));
			
			var dialog = this.up("window");
			var grid = dialog.down("grid");
			var selection = grid.getSelection();
			if (selection.length) {
				var selected = selection[0];
				var foreignkey = selected.get(dialog.getValueField());
				dialog.fireEvent("select", foreignkey, selected);
				this.up("window").close();
			}
		}
	}, {
		text: "Отмена",
		handler: function() {
			this.up("window").close();
		}
	}],
	
});