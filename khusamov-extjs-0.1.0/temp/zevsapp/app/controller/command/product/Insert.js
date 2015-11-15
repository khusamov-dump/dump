
Ext.define("Zevs.controller.command.product.Insert", {
	
	extend: "Zevs.controller.command.Command",
	
	exec: function(params) {
		var me = this;
		
		var polygon = params.polygon;
		var productJoint = params.selectedProductJoint;
		
		var product = Zevs.project.Item.createProduct();
		product.getFrame().setPolygon(polygon);
		
		var construction = Zevs.Project.getConstruction();
		
		// Первый случай.
		// В конструкции нет изделия.
		
		if (!construction.hasProduct()) {
			construction.add(product);
		}
		
		// Второй случай.
		// В конструкции есть изделие и указан соединитель.
		
		else if (productJoint) {
			productJoint.add(product);
		}
		
	}
	
});