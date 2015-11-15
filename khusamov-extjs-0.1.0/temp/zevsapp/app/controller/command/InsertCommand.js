
Ext.define("Zevs.controller.command.InsertCommand", {
	
	extend: "Zevs.lib.app.controller.Command",
	
	
	/**
	 * 
	 * 
	 * insert.product({frame: [[10, 20], [30, 40], [50, 60]], productjoint: 1012})
	 * 
	 * 
	 */
	product: function(params) {
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
		
	},
	
	frameBeam: function(frameSides) {
		var me = this;
		
		if (!Ext.isArray(frameSides)) frameSides = [frameSides];
		
		frameSides.forEach(function(frameSide) {
			var frameBeam = Zevs.project.Item.createFrameBeam();
			frameSide.add(frameBeam);
		});
	},
	
	productJoint: function(frameBeamOrProductJoint) {
		var me = this;
		
		var productJoint = Zevs.project.Item.createProductJoint();
		frameBeamOrProductJoint.add(productJoint);
		
	}
	
});