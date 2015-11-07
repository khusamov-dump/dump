
Ext.define("Test.LegalForm", {
	
	extend: "Ext.ux.ajax.JsonSimlet",
	
	url: "application/rest/legal-form",
	
	data: [{
		"legal_form_id": "23",
		"title": "Общество с ограниченной ответственностью",
		"title_short": "ООО"
	}, {
		"legal_form_id": "24",
		"title": "Закрытое акционерное общество",
		"title_short": "ЗАО"
	}, {
		"legal_form_id": "25",
		"title": "Открытое акционерное общество",
		"title_short": "ОАО"
	}, {
		"legal_form_id": "27",
		"title": "Товарищество собственников жилья",
		"title_short": "ТСЖ"
	}, {
		"legal_form_id": "27",
		"title": "Государственное бюджетное учреждение культуры",
		"title_short": "ГБУК"
	}]
	
}, function (Simlet) {
	Ext.ux.ajax.SimManager.register(new Simlet);
});