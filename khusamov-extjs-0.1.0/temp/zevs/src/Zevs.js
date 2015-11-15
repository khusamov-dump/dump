
Ext.define("Zevs", {
	extend: "Ext.panel.Panel",
	
	title: "Построитель окон и дверей «Зевс»",
	
	height: "100%",
	bodyPadding: 10,
	
	project: null,
	
	config: {
		onRequestParam1ListValues: Ext.emptyFn,
		onSaveProject: Ext.emptyFn
	},
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		
		var store = Ext.create("Ext.data.ArrayStore", {
			fields: ["name", "value"]
		});
		
		me.down("combo").setStore(store);
		
		store.loadData([{name: "Значение 1", value: 1}, {name: "Значение 2", value: 2}, {name: "Значение 3", value: 3}]);
		
		me.down("combo").setValue(2);
		
		
		me.down("combo").on("expand", function() {
			if (!me.down("combo").getStore().getCount()) {
				var request = me.getOnRequestParam1ListValues();
				request(function(data) {
					me.down("combo").getStore().loadData(data);
				});
			}
		});
		
	},
	
	load: function(project) {
		var me = this;
		me.project = project;
		me.down("textfield").setValue(project.title);
		return me;
	}, 
	
	items: [{
		xtype: "form",
	    title: 'Проект окна',
	    width: 500,
	    bodyPadding: 10,
	    items: [{
	        xtype: 'textfield',
	        name: 'title',
	    	labelWidth: 130,
	        fieldLabel: 'Название проекта'
	    }, {
	        xtype: 'combo',
	        name: 'param1',
	    	labelWidth: 130,
	        fieldLabel: 'Параметр № 1',
	        displayField: 'name',
    		valueField: 'value',
    		queryMode: "local",
    		editable: false
	    }],
	    buttons: [{
	    	text: "Новый набор значений параметра № 1",
	    	handler: function() {
	    		this.up("form").down("combo").clearValue();
	    		this.up("form").down("combo").getStore().removeAll();
	    	}
	    }, {
	    	text: "Сохранить проект",
	    	handler: function() {
	    		var project = {
	    			title: this.up("form").down("textfield").getValue(),
	    			param1: this.up("form").down("combo").getValue()
	    		};
	    		var zevs = this.up("form").up();
	    		var request = zevs.getOnSaveProject();
	    		request(project);
	    	}
	    }]
	}]
	
});


