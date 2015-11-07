
/**
 * Модель данных Контрагент - Юридическое лицо.
 */

Ext.define("Alternativa.model.contractor.Legal", {
	extend: "Ext.data.Model",
	
	fields: [{
		name: "id",
		type: "int"
	}, {
		name: "created",
		type: "date"
	}, {
		name: "changed",
		type: "date"
	}, {
		name: "contractor_id",
		type: "int"
	}, {
		name: "name",
		type: "string"
	}, {
		name: "ownership_type_id",
		type: "int",
		defaultValue: 1
	}],
	
	proxy: {
		type: "rest",
		url: "/application/rest/contractors/legal/",
		reader: {
			type: "json",
			root: "data"
		}
	}

});


