
/**
 * Моя загрузочная маска 
 * с небольшими корректировками.
 */

Ext.define("Khusamov.sandbox.LoadMask", {
	extend: "Ext.LoadMask",
	
	constructor: function(comp, config) {
		// Специальный патч, позволяющий создавать маску 
		// при выключенном окне или панели comp.
		var patch = false;
		if (!comp.zIndexManager) {
			patch = true;
			comp.zIndexManager = {};
		}
		
		// Коррекция затемняющей маски и текстовки.
		if (!config) config = {};
		config.maskCls = "x-mask khusamov-sandbox-mask";
		this.msg = "Подождите!..";
		
		// Родной конструктор.
		this.callParent(arguments);
		
		// Если патч применялся, то тут продолжение его работы.
		// Обязательно после вызова родительского конструктора.
		if (patch) delete comp.zIndexManager;
	},

	onDestroy: function() {
		this.bindStore(null);
		this.callParent(arguments);
	}

});