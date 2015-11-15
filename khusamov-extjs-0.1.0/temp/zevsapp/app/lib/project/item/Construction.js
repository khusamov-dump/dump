
/**
 * Конструкция.
 */

Ext.define("Zevs.lib.project.item.Construction", {
	
	extend: "Zevs.lib.project.item.Item",
	
	uses: [
		"Zevs.lib.project.item.Product",
		"Zevs.lib.project.item.ProductJoint"
	],
	
	isConstruction: true,
	
	itemConfig: {
		type: "construction",
		name: "Конструкция"
	},
	
	/**
	 * В конструкции имеется первое изделие, которое является первым созданным изделием.
	 * Остальные изделия являются дочерними элементами соединителей.
	 * @return {Zevs.lib.project.item.Product}
	 */
	getProduct: function() {
		return this.items.first();
	},
	
	hasProduct: function() {
		return !!this.getProduct();
	}
	
}, function() {
	
	Zevs.lib.project.item.Item.createConstruction = function() {
		return Ext.create.apply(Ext, ["Zevs.lib.project.item.Construction"].concat(Ext.Array.slice(arguments)));
	};
	
});