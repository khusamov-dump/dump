
Ext.define("Alternativa.model.LegalForm", {
	
	extend: "Alternativa.model.base.Base",
	
	proxy: {
		url: "application/rest/legal-form"
	},
	
	idProperty: "legal_form_id",
	
	fields: [{
		name: "legal_form_id",
		type: "int"
	}, {
		name: "title",
		type: "string"
	}, {
		name: "title_short",
		type: "string"
	}]
	
});