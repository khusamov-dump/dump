
Ext.define("Alternativa.model.contractor.Legal", {
	
	extend: "Alternativa.model.base.Contractor",
	
	proxy: {
		url: "application/rest/legal"
	},
	
	fields: [{
		name: "legal_form_id",
		type: "int"
	}, {
		name: "legal_form_title",
		type: "string"
	}, {
		name: "legal_form_title_short",
		type: "string"
	}, {
		name: "legal_title",
		type: "string"
	}, {
		name: "legal_title_short",
		type: "string"
	}, {
		name: "legal_id",
		type: "int"
	}]
	
});