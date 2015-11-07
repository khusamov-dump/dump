
Ext.define("Alternativa.model.contractor.Individual", {
	
	extend: "Alternativa.model.base.Contractor",
	
	proxy: {
		url: "application/rest/individual"
	},
	
	fields: [{
		name: "individual_id",
		type: "int"
	}, {
		name: "individual_first_name",
		type: "string"
	}, {
		name: "individual_surname",
		type: "string"
	}, {
		name: "individual_patronymic",
		type: "string"
	}]
	
});