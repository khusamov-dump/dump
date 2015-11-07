
Ext.define("Sultana.grid.Panel", {
	extend: "Ext.grid.Panel",
	alias: "widget.sGridPanel",
	
	requires: ["Sultana.menu.context.Menu"],
	
	/**
	 * Закрепить контекстное меню за таблицей.
	 * @param Sultana.menu.context.Menu | {} menu
	 */
	setContextMenu: function(menu) {
		var me = this;
		
		if (!(menu instanceof Sultana.menu.context.Menu)) {
			menu = Ext.create("Sultana.menu.context.Menu", menu);
		}
		
		me.on("itemcontextmenu", function(grid, record, item, index, event) {
			menu.showAt(event.getXY());
			event.stopEvent();
		});
		
		me.on("itemdblclick", function(grid, record, item, index, event) {
			menu.items.each(function(item) {
				if (item.hasFlag("default")) item.handler.call(item.scope, item, event);
			});
		});
		
		me.on("containercontextmenu", function(grid, event) {
			grid.getSelectionModel().deselectAll();
			menu.showAt(event.getXY());
			event.stopEvent();
		});
		
		menu.on("beforeshow", function(menu) {
			var selection = me.getSelectionModel().getSelection();
			var select = "multi";
			switch (selection.length) {
				case 0: select = "empty"; break;
				case 1: select = "single"; break;
			}
			menu.items.each(function(item) {
				item.enable();
				if (item.hasFlag("single") && (select == "empty" || select == "multi")) {
					item.disable();
				}
				if (item.hasFlag("multi") && (select == "empty")) {
					item.disable();
				}
			});
		});
		/*
		menu.on("click", function(menu, item) {
			if (item && !item.isDisabled()) {
				var selection = me.getSelectionModel().getSelection();
				//var controller = me.getController();
				var action = item.getItemId() + "Action";
				//if (!Ext.isFunction(controller[action])) throw new Error("В контроллере «" + controller.$className + "» не найдено действие «" + action + "».");
				controller[action](selection[0], selection, grid, me.getItemId());
			}
		});
		*/
	}

});


