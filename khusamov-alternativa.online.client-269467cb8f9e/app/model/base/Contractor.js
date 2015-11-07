
Ext.define("Alternativa.model.base.Contractor", {
	
	extend: "Alternativa.model.base.Document",
	
	proxy: {
		url: "application/rest/individual"
	},
	
	fields: [{
		name: "contractor_id",
		type: "int"
	}, {
		name: "contractor_type",
		type: "string"
	}, {
		name: "contractor_title",
		type: "string"
	}]
	
});