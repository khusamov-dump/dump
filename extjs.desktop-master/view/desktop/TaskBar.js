
/**
 * Панель задач рабочего стола.
 */

Ext.define("Sultana.view.desktop.TaskBar", {
	extend: "Ext.toolbar.Toolbar",
	alias: "widget.sdTaskBar",
   
	requires: ["Sultana.view.desktop.StartMenu", "Sultana.view.desktop.WindowBar"],
	
	items: [{
		itemId: "start",
    	text: "Старт",
    	menu: {
    		xtype: "sdStartMenu"
    	}
	}, "-", {
		
		// TODO Сделать чтобы панель занимала 100% места, сейчас занимает только 50%
		
    	itemId: "windowbar",
		xtype: "sdWindowBar"
	}, "->", "-", {
 		xtype: "tbtext",
 		text: "Sencha Ext JS, версия " + Ext.getVersion()
 	}]
	
});


