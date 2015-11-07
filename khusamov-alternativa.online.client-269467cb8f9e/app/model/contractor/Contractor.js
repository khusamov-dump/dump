
Ext.define("Alternativa.model.contractor.Contractor", {
	
	extend: "Alternativa.model.base.Document",
	
	proxy: {
		url: "application/rest/contractor"
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
	}, {
		name: "contractor_title_short",
		type: "string"
	}]
	
});