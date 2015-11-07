
/**
 * Рабочий стол
 */

Ext.define("Sultana.view.Desktop", {
	extend: "Ext.container.Viewport",
	alias: "widget.sdDesktop",

	requires: ["Sultana.view.desktop.Panel"],

	layout: "fit",

	items: [{
		xtype: "sdPanel"
	}]

});

