
Ext.define("Sultana.menu.context.Item", {
	extend: "Ext.menu.Item",
	alias: "widget.sContextMenuItem",
	
	config: {

		/**
		 * Имя действия контроллера.
		 * При клике по пункту меню запускается метод с именем action из контроллера.
		 * Пока это используется только в Sultana.window.desktop.Grid.
		 */
		action: null,
		
		/**
		 * Флаги: single, multi, default.
		 */
		flags: []

	},
	
	/**
	 * Инициализация.
	 */
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		
		if (me.hasFlag("default")) {
			me.addCls("sultana-menuitem-default");
		}
	},
	
	/**
	 * Проверка наличия флажка.
	 * @param flag
	 * @returns
	 */
	hasFlag: function(flag) {
		var me = this;
		return Ext.Array.contains(me.getFlags(), flag);
	}

});


