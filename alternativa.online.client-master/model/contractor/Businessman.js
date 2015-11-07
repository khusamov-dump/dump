
/**
 * Модель данных Контрагент - Индивидуальный предприниматель.
 */

Ext.define("Alternativa.model.contractor.Businessman", {
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
		name: "individual_entity_id",
		type: "int"
	}]

});


