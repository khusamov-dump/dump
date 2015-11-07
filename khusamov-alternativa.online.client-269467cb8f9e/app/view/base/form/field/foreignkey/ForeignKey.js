
Ext.define("Alternativa.view.base.form.field.foreignkey.ForeignKey", {
	
	extend: "Ext.form.field.ComboBox",
	
	/*requires: [
		"Alternativa.view.base.form.field.foreignkey.ForeignKeyController", 
		"Alternativa.view.base.form.field.foreignkey.ForeignKeyDialog"
	],*/
	
	xtype: "foreignkeyfield",
	
	//controller: "foreignkey",
	
	/*config: {
		valueField: null,
		displayField: null,
		dialogTitle: null,
		grid: {},
		dialog: {}
	},*/
	
	
	/*triggers: {
		foreign: {
			scope: "this",
			handler: "onForeignTriggerClick"
		}
	},
	
	listeners: {
		element: "inputEl",
		click: "onForeignTriggerClick"
	},
	
	onForeignTriggerClick: function() {
		this.getController().onForeignTriggerClick();
	},*/
	
	editable: false,
	
	//masterRecord: null,
	
	/*rawToValue: function(rawValue) {
		rawValue = Number(rawValue);
		return rawValue ? rawValue : null;
	},*/
	
	setValue: function(value, masterRecord) {
		var me = this;
		me.masterRecord = masterRecord;
		return me.callParent([value]);
	},
	
	valueToRaw: function(value) {
		var me = this;
		
		
		//value = me.callParent([value]);
		
		var raw = value;
		var store = Ext.data.StoreManager.lookup(me.getGrid().store);
		var masterModel = store.getModel();
		
		/*if (me.masterRecord) {
			raw = me.masterRecord.get(masterModel.idProperty);
		} else {
			masterModel.load(value, {
				success: function(masterRecord) {
					me.masterRecord = masterRecord;
					me.setRawValue(masterRecord.get(masterModel.idProperty));
				}
			});
		}*/
		
		
		
		if (me.masterRecord) {
			//raw = me.masterRecord.get("contractor_title");
			raw = me.masterRecord.get(me.getDisplayField());
		} else {
			//Alternativa.model.contractor.Contractor.load(value, {
			/*masterModel.load(value, {
				success: function(masterRecord) {
					me.masterRecord = masterRecord;
					me.setRawValue(masterRecord.get("contractor_title"));
				}
			});*/
		}
		
		return value ? raw : "";
	},
	
	
	
	
	matchFieldWidth: false,
	
	createPicker: function() {
		var me = this;
		var gridConfig = me.getGrid();
		var gridDefaultConfig = {
			
			reference: "grid",
			floating: true,
			hidden: true,
			width: 700,
			height: 300,
			title: "Выбор отправителя",
			bbar: {
				xtype: "pagingtoolbar",
				displayInfo: true,
				store: gridConfig.store
			}
		};
		gridConfig = Ext.Object.merge(gridDefaultConfig, gridConfig)
		return Ext.create(gridConfig);
	}
	
	

	createPicker: function() {
		var me = this,
		picker,
		pickerCfg = Ext.apply({
			xtype: "grid",
			
			
			
			
			pickerField: me,
			selectionModel: me.pickerSelectionModel,
			floating: true,
			hidden: true,
			store: me.getPickerStore(),
			displayField: me.displayField,
			
			
			
		}, me.listConfig, me.defaultListConfig);
		
		picker = me.picker = Ext.widget(pickerCfg);
		if (me.pageSize) {
			picker.pagingToolbar.on('beforechange', me.onPageChange, me);
		}
		
		// We limit the height of the picker to fit in the space above
		// or below this field unless the picker has its own ideas about that.
		if (!picker.initialConfig.maxHeight) {
			picker.on({
				beforeshow: me.onBeforePickerShow,
				scope: me
			});
		}
		picker.getSelectionModel().on({
			beforeselect: me.onBeforeSelect,
			beforedeselect: me.onBeforeDeselect,
			scope: me
		});
		
		picker.getNavigationModel().navigateOnSpace = false;
		
		return picker;
	},
	
	
	
	
	
});