
/**
 * Главное меню рабочего стола.
 */

Ext.define("Sultana.view.desktop.StartMenu", {
	extend: "Ext.menu.Menu",
	alias: "widget.sdStartMenu",

	requires: ["Sultana.view.desktop.StartMenuItem"],
	
	items: ["-", {
 		itemId: "restart",
 		text: "Перезагрузить",
 		iconCls: "icon-restart",
 		href: "/"
	}, {
		itemId: "logoff",
 		text: "Закрыть",
 		iconCls: "icon-logoff",
 		handler: function() {
 			window.close();
 		}
	}],
	
	index: 0,
	
	addStartMenuItem: function(item) {
		var me = this;
		me.insert(me.index++, item);
	}
	
});


