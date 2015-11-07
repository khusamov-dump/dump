
Ext.define("Test.Legal", {
	
	extend: "Ext.ux.ajax.JsonSimlet",
	
	url: "application/rest/legal",
	
	data: [{
		"document_id": "23",
		"document_parent_id": null,
		"document_number": "23",
		"document_date_start": "2015-05-28",
		"document_notes": null,
		"document_deleted": "f",
		"contractor_id": "20",
		"contractor_type": "Юридическое лицо",
		"contractor_title": "ООО «Колосок»",
		"legal_id": "16",
		"legal_title": "Колосок",
		"legal_title_short": "Колосок",
		"ownership_type_id": "23",
		"ownership_type_title": "Общество с ограниченной ответственностью",
		"ownership_type_title_short": "ООО"
	}, {
		"document_id": "24",
		"document_parent_id": null,
		"document_number": "23",
		"document_date_start": "2015-05-28",
		"document_notes": null,
		"document_deleted": "f",
		"contractor_id": "20",
		"contractor_type": "Юридическое лицо",
		"contractor_title": "ООО «Колосок»",
		"legal_id": "16",
		"legal_title": "Колосок",
		"legal_title_short": "Колосок",
		"ownership_type_id": "23",
		"ownership_type_title": "Общество с ограниченной ответственностью",
		"ownership_type_title_short": "ООО"
	}]
	
}, function (Simlet) {
	Ext.ux.ajax.SimManager.register(new Simlet);
});