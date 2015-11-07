
/**
 * Модель данных Контрагент - Физическое лицо.
 */

Ext.define("Alternativa.model.contractor.Individual", {
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
		name: "surname",
		type: "string"
	}, {
		name: "patronymic",
		type: "string"
	}]

});


