
Ext.define("Zevs.controller.command.productjoint.Insert", {
	
	extend: "Zevs.controller.command.Command",
	
	exec: function(frameBeamOrProductJoint) {
		var me = this;
		
		var productJoint = Zevs.project.Item.createProductJoint();
		frameBeamOrProductJoint.add(productJoint);
		
	}
	
});