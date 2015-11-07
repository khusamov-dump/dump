
Ext.define("Test.Individual", {
	
	extend: "Test.RestSimlet",
	
	url: /application\/rest\/individual\/*(\d*)/,
	
	data: function() {
		var result = [];
		for (var i = 1; i < 50; i++) {
			result.push({
				document_id: i,
				document_parent_id: null,
				document_number: "23",
				document_date_start: "2015-05-28",
				document_date_end: null,
				document_subject: null,
				document_notes: null,
				document_deleted: "f",
				contractor_id: "20",
				contractor_type: "Физическое лицо",
				contractor_title: "Физическое лицо " + i,
				contractor_title_short: "",
				individual_id: "16",
				individual_first_name: "Петр",
				individual_surname: "Иванов",
				individual_patronymic: "Сидорович"
			});
		}
		return result;
	}
	
}, function (Simlet) {
	Ext.ux.ajax.SimManager.register(new Simlet);
});