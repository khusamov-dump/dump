
Ext.define("Alternativa.model.PaymentOrder", {
	
	extend: "Alternativa.model.base.Document",
	
	proxy: {
		url: "application/rest/payment-order"
	},
	
	fields: [{
		name: "sender_id",
		type: "int"
	}, {
		name: "recipient_id",
		type: "int"
	}, {
		name: "payment",
		type: "int"
	}]
	
});