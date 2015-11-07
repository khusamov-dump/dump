
/**
 * Контроллер рабочего стола.
 */

Ext.define("Sultana.controller.Desktop", {
	extend: "Ext.app.Controller",
	
	views: ["Desktop"],
	
	viewport: null,
	
	init: function() {
		var me = this;
		me.viewport = me.getView("Desktop").create();
	},
	
	/**
	 * Добавление элемента на рабочий стол.
	 * @param item
	 */
	add: function(item) {
		var me = this;
		
		// Добавление окна на рабочий стол
		if (item instanceof Sultana.view.desktop.Window) {
			me.viewport.down("sdPanel").addDesktopWindow(item);
			me.viewport.down("sdWindowBar").addDesktopWindow(item);
		}
		
		// Добавление кнопки в главное меню рабочего стола
		if (item instanceof Sultana.view.desktop.StartMenuItem) {
			me.viewport.down("sdStartMenu").addStartMenuItem(item);
		}
		
		
	}

});


