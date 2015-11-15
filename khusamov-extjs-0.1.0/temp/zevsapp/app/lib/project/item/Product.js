
/**
 * Изделие.
 * В изделие входит: Рама окна.
 */

Ext.define("Zevs.lib.project.item.Product", {
	
	extend: "Zevs.lib.project.item.Item",
	
	requires: ["Zevs.lib.project.Project", "Zevs.lib.project.item.Frame"],
	
	isProduct: true,
	
	itemConfig: {
		type: "product",
		name: "Изделие"
	},
	
	/**
	 * Инициализация изделия.
	 * В изделии всегда есть рама окна, которая создается автоматически.
	 */
	initItem: function() {
		var me = this;
		me.add(Zevs.project.Item.createFrame());
	},
	
	/**
	 * Получить конструкцию.
	 * Родительским элементов изделия всегда является конструкция.
	 * В конструкции может быть только одно дочернее изделие. Остальные изделия крепятся к соединителям.
	 * @return {Zevs.lib.project.item.Construction}
	 */
	getConstruction: function() {
		return this.getParent();
	},
	
	/**
	 * Получить раму окна.
	 * Рама окна единственный дочерний элемент изделия.
	 * @return {Zevs.lib.project.item.Frame}
	 */
	getFrame: function() {
		return this.items.first();
	}
	
}, function() {
	
	Zevs.lib.project.item.Item.createProduct = function() {
		return Ext.create.apply(Ext, ["Zevs.lib.project.item.Product"].concat(Ext.Array.slice(arguments)));
	};
	
});