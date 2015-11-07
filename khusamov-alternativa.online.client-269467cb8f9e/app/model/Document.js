
// Пока не используется. Возможно потом удалить надо - так как запрос document_view затратный.

Ext.define("Alternativa.model.Document", {
	
	extend: "Alternativa.model.base.Base",
	
	proxy: {
		url: "application/rest/document"
	},
	
	idProperty: "document_id",
	
	fields: [{
		name: "document_id",
		type: "int"
	}, {
		name: "parent_id",
		type: "int"
	}, {
		name: "number",
		type: "string"
	}, {
		name: "date_start",
		type: "date",
		dateFormat: "Y-m-d"
	}, {
		name: "notes",
		type: "string"
	}, {
		name: "deleted",
		type: "boolean"
	}, {
		name: "type",
		type: "string"
	}, {
		name: "title",
		type: "string"
	}, {
		name: "title_short",
		type: "string"
	}]
	
});