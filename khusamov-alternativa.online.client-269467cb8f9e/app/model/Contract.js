
Ext.define("Alternativa.model.Contract", {
	
	extend: "Alternativa.model.base.Document",
	
	proxy: {
		url: "application/rest/contract"
	},
	
	fields: [{
		name: "contract_payment",
		type: "number"
	}, {
		name: "contract_subject",
		type: "string"
	}, {
		name: "contract_provider_id",
		type: "int"
	}, {
		name: "contract_consumer_id",
		type: "int"
	}, {
		name: "contract_provider_title_short",
		type: "string"
	}, {
		name: "contract_consumer_title_short",
		type: "string"
	}, {
		name: "contract_provider_title",
		type: "string"
	}, {
		name: "contract_consumer_title",
		type: "string"
	}, {
		name: "contract_provider_type",
		type: "string"
	}, {
		name: "contract_consumer_type",
		type: "string"
	}]
	
});