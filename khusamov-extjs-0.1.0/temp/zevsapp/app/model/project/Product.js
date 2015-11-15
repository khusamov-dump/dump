
Ext.define("Zevs.model.project.Product", {
	
	extend: "Zevs.model.project.Item",
	
	fields: [{
		name: "construction",
		reference: "Zevs.model.project.Construction"
	}]
	
});