
Ext.define("Zevs.model.project.Construction", {
	
	extend: "Ext.data.Model",
	
	fields: [{
		name: "id",
		type: "int"
	}, {
		name: "itemId",
		type: "int",
		reference: "Zevs.model.project.Item"
	}, {
		name: "projectId",
		type: "int",
		reference: "Zevs.model.project.Project"
	}]
	
});