
/**
 * Часть панели задач рабочего стола.
 * Панель с открытыми окнами рабочего стола.
 */

Ext.define("Sultana.view.desktop.WindowBar", {
	extend: "Ext.toolbar.Toolbar",
	alias: "widget.sdWindowBar",
	
	border: false,
	padding: 0,
	
	enableOverflow: true,
	flex: 1,
	
	/**
	 * Добавление кнопки в панель задач 
	 * для управления окном рабочего стола.
	 * @param window
	 * @returns
	 */
	addDesktopWindow: function(window) {
		var me = this;
		return me.add({
			text: window.getTaskBarTitle(),
			handler: function() {
				if (window.isHidden()) window.show(); else window.hide();
			}
		});
	}
	
});


