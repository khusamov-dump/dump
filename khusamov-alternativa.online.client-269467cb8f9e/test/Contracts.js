
Ext.define("Test.Contracts", {
	
	extend: "Test.RestSimlet",
	
	//url: /application\/rest\/payment-order\/*(\d*)/,
	url: "application/rest/contract",
	
	data: [{
		"document_id": "1",
		"document_parent_id": null,
		"document_number": "23",
		"document_date_start": "2015-05-28",
		"document_notes": null,
		"document_deleted": "f",
		"sender_contractor_title": "Иванов Петр Сидорович",
		"recipient_contractor_title": "Иванов Петр Сидорович",
		"contract_payment": "$5,454.00",
	}, {
		"document_id": "2",
		"document_parent_id": null,
		"document_number": "23",
		"document_date_start": "2015-05-28",
		"document_notes": null,
		"document_deleted": "f",
		"sender_contractor_title": "Иванов Петр Сидорович",
		"recipient_contractor_title": "Иванов Петр Сидорович",
		"contract_payment": "$5,454.00",
	}, {
		"document_id": "3",
		"document_parent_id": null,
		"document_number": "23",
		"document_date_start": "2015-05-28",
		"document_notes": null,
		"document_deleted": "f",
		"sender_contractor_title": "Иванов Петр Сидорович",
		"recipient_contractor_title": "Иванов Петр Сидорович",
		"contract_payment": "$5,454.00",
	}]
	
}, function (Simlet) {
	Ext.ux.ajax.SimManager.register(new Simlet);
});