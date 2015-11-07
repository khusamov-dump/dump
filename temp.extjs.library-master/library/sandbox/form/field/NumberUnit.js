
/**
 * Поле число с единицей измерения в виде файлд-контейнера.
 */

/*
	Хоть класс и построен на основе fieldcontainer
	но конфиг нужно строить как для класса numberfield
	с той лишь разницей, что есть новое поле unit где нужно указать единицу измерения.
*/

Ext.define("Khusamov.sandbox.form.field.NumberUnit", {
	extend: "Ext.form.FieldContainer",
	alias: "widget.khusamov.sandbox.numberunitfield",
	
	constructor: function(config) {
		var me = this;
		
		config = Ext.Object.merge({}, {
			unit: "у.е.",
			width: 200
		}, config);

		var numberfield = Ext.Object.merge({}, config, {
			xtype: "numberfield",
			hideLabel: true,
			flex: 1
		});
		
		delete numberfield.width;
		
		var fieldcontainer = Ext.Object.merge({}, config, {
			layout: "hbox",
			items: [numberfield, {
				xtype: "tbspacer",
				width: 5
			}, {
				xtype: "label",
				text: config.unit,
				margin: "3px 0px 0px 0px" // баг наверное
			}]
		});
		
		me.callParent([fieldcontainer]);
	}
	
});
