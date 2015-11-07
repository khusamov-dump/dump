
Ext.onReady(function () {
	
	var gridMaterials = Ext.create("Carousel.MaterialGrid", {
		margin: "0px 0px 30px 0px"
	});
	
	var store = gridMaterials.getStore();

	var field = Ext.create("Ext.form.TextField", {
		fieldLabel: "Номер выбранного материала",
		labelWidth: 200,
		width: 270,
		margin: "0px 0px 30px 0px",
		renderTo: Ext.getBody()
	});
	
	Ext.create("Khusamov.sandbox.carousel.Materials", {
		store: store,
		field: field,
		renderTo: Ext.getBody()
	});

	store.load();

	
	
	
	
	/*function getColorItems(color) {
		var arr = [];
		for (var i = 0; i < 50; i++) {
			arr.push({
				width: 110, height: 40, 
				html: "Материал № " + (i + 1),
				padding: 5,
				style: {
					color: "white",
					fontSize: "80%",
					backgroundColor: color
				}
			});
		}
		return arr;
	}
	
	var colors = ["green", "red", "yellow"];
	
	var carousels = [];
	Ext.each(colors, function(color) {
		carousels.push(Ext.create("Khusamov.sandbox.carousel.Carousel", {
			itemId: color,
			border: false,
			items: getColorItems(color)
		}));
	});
	
	var comboboxData = [];
	Ext.each(colors, function(color, index) {
		comboboxData.push({
			text: color,
			value: index
		});
	});
	
	Ext.create("Ext.panel.Panel", {
		width: 430,
		renderTo: Ext.getBody(),
		
		layout: "card",
		items: carousels,
		
		tbar: [{
			iconCls: "icon-arrow-left"
		}, "-", "Материал корпуса:", "->", {
			xtype: "combobox",
			hideLabel: true,
			valueField: "value",
			value: 0,
			editable: false,
			store: Ext.create("Ext.data.Store", {
				fields: ["text", "value"],
				data: comboboxData
			}),
			listeners: {
				change: function(combo, index) {
					this.up("panel").getLayout().setActiveItem(index);
				}
			}
		}, "-", {
			iconCls: "icon-arrow-right"
		}]
	});*/
	
	
	
});

