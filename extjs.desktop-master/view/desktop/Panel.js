
/**
 * Основная панель рабочего стола.
 */

Ext.define("Sultana.view.desktop.Panel", {
	extend: "Ext.panel.Panel",
	alias: "widget.sdPanel",
   
   requires: ["Sultana.view.desktop.TaskBar"],
	
   border: false,
   
   tbar: {
   	xtype: "sdTaskBar"
   },
   
   /**
    * Добавить окно в рабочую зону рабочего стола.
    * @param window
    */
   addDesktopWindow: function(window) {
		var me = this;
		me.add(window);
		// При первом показе окна каскадировать его относительно рабочей зоны
		window.on("show", function() {
			me.moveToCascade(window);
		}, me, { single: true });
   },
	
	cascade: {
		count: 1
	},
   
	/**
	 * Каскадирование окон относительно тела панели вьюпорта.
	 * @param window
	 */
   moveToCascade: function(window) {
		var me = this;
   	
		var width = window.getSize().width;
		var height = window.getSize().height;
		
		var offset = 25;
		var x = offset * me.cascade.count;
		var y = offset * me.cascade.count;
		
		var desktopBody = me.body;
		var desktopWidth = desktopBody.getWidth();
		var desktopHeight = desktopBody.getHeight();
		
		// TODO Сделать обработку ситуации, когда размер окна при первом появлении превышает размер рабочего стола
		
		if (x + offset >= desktopWidth - width || y + offset >= desktopHeight - height) {
			me.cascade.count = 1;
		} else {
			me.cascade.count++;
		}
		
		window.setPosition(x, y);
   }



   
 	/*_____tbar: [{
 		itemId: "start",
 		text: "Старт",
 		menu: {
 			items: [{
 				itemId: "orders",
	    		text: "Заказы"
 			}, {
 				itemId: "jobs",
	    		text: "Сменные задания"
 			}, {
 				itemId: "mapcuts",
	    		text: "Карты раскроя"
 			},
 				text: "Настройки",
 				hideOnClick: false,
 				menu: {
 					items: [{
 			    		itemId: "db",
 						text: "Подключения к базам данных"
 					}, {
 						itemId: "configsets",
 						text: "Конфигурационные файлы"
 					}]
 				}
	    	"-", {
	    		itemId: "options",
	    		text: "Настройки программы"
 			}, {
	    		itemId: "about",
	    		text: "О программе"
 			}, "-", {
	    		itemId: "exit",
	    		text: "Выход",
	    		handler: function() {
	    			window.close();
	    		}
 			}]
 		}
 	}, "->", {
 		xtype: "tbtext",
 		text: "Линейный раскрой, версия 1.00"
 	}, "-", {
 		xtype: "tbtext",
 		text: "Sencha Ext JS, версия " + Ext.getVersion()
 	}]*/



	
	
});


