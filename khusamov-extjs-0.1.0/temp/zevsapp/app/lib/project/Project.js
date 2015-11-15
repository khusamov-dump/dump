
/**
 * Проект оконной конструкции.
 */

Ext.define("Zevs.lib.project.Project", {
	
	alternateClassName: "Zevs.Project",
	
	extend: "Zevs.lib.project.item.Item",
	
	requires: ["Zevs.lib.project.item.Construction"],
	
	isProject: true,
	
	itemConfig: {
		type: "project",
		name: "Проект"
	},
	
	singleton: true,
	
	/**
	 * Инициализация проекта.
	 * В проекте всегда есть конструкция, которая создается автоматически.
	 */
	initItem: function() {
		var me = this;
		me.add(Zevs.project.Item.createConstruction());
	},
	
	/**
	 * Получить коллекцию всех элементов проекта.
	 * Получить коллекцию элементов определенного типа.
	 * @return {Ext.util.Collection}
	 */
	getItems: function(type) {
		return Zevs.project.Item.getItems(type);
	},
	
	hasItems: function(type) {
		return Zevs.project.Item.hasItems(type);
	},
	
	/**
	 * Получить конструкцию.
	 * Конструкция единственный дочерний элемент проекта.
	 * @return {Zevs.lib.project.item.Construction}
	 */
	getConstruction: function() {
		return this.items.first();
	}
	
});


