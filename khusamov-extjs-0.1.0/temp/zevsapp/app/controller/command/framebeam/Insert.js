
Ext.define("Zevs.controller.command.framebeam.Insert", {
	
	extend: "Zevs.controller.command.Command",
	
	exec: function(frameSides) {
		var me = this;
		
		if (!Ext.isArray(frameSides)) frameSides = [frameSides];
		
		frameSides.forEach(function(frameSide) {
			var frameBeam = Zevs.project.Item.createFrameBeam();
			frameSide.add(frameBeam);
		});
		
		
		
	}
	
});