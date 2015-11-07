
/**
 * Модель данных Контрагент.
 */

Ext.define("Alternativa.model.Contractor", {
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
		name: "contractor_type_title",
		type: "string"
	}, {
		name: "title",
		type: "string"
	}]

});


