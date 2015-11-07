
Ext.define("Alternativa.view.base.form.field.foreignkey.ForeignKeyController", {
	
	extend: "Ext.app.ViewController",
	
	alias: "controller.foreignkey",
	
	onForeignTriggerClick: function() {
		var me = this;
		var dialog = Ext.create(me.getDialogConfig());
		dialog.show();
	},
	
	getDialogConfig: function() {
		var me = this;
		var dialogConfig = me.getView().getDialog();
		var valueField = me.getView().getValueField();
		var dialogDefaultConfig = {
			xtype: "foreignkeydialog",
			reference: "dialog",
			valueField: valueField,
			items: me.getGridConfig(),
			viewModel: {
				parent: me.getViewModel()
			},
			listeners: {
				scope: me,
				select: "onForeignkeySelect"
			}
		};
		var title = me.getView().getDialogTitle();
		if (title) dialogDefaultConfig.title = title;
		return Ext.Object.merge(dialogDefaultConfig, dialogConfig);
	},
	
	getGridConfig: function() {
		var me = this;
		var gridConfig = me.getView().getGrid();
		var gridDefaultConfig = {
			xtype: "grid",
			reference: "grid",
			border: false,
			bbar: {
				xtype: "pagingtoolbar",
				displayInfo: true,
				store: gridConfig.store
			}
		};
		return Ext.Object.merge(gridDefaultConfig, gridConfig);
	},
	
	onForeignkeySelect: function(foreignkey, masterRecord) {
		this.getView().setValue(foreignkey, masterRecord);
	}
	
});