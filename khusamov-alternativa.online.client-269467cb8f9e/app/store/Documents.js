
// Пока не используется. Возможно потом удалить надо - так как запрос document_view затратный.

Ext.define("Alternativa.store.Documents", {
	
	extend: "Ext.data.Store",
	
	alias: "store.documents",
	
	model: "Alternativa.model.contractor.Document"
	
});