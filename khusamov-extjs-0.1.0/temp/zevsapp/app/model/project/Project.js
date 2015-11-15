
Ext.define("Zevs.model.project.Project", {
	
	extend: "Ext.data.Model",
	
	fields: [{
		name: "id",
		type: "int"
	}, {
		name: "itemId",
		type: "int",
		reference: "Zevs.model.project.Item"
	}]
	
});