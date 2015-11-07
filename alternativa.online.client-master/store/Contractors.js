
/**
 * Хранилище Контрагенты.
 */

Ext.define("Alternativa.store.Contractors", {
	extend: "Ext.data.Store",

	model: "Alternativa.model.Contractor",

	autoLoad: true,
	pageSize: 100,
	
	remoteSort: true,
	remoteFilter: true,
	remoteGroup: true,
	
	//buffered: true,
	//leadingBufferZone: 300,
	//trailingBufferZone: 400,
	//purgePageCount: 5,
	
	proxy: {
		type: "rest",
		url: "/alternativa/rest/contractors/",
		reader: {
			type: "json",
			root: "data"
		}
	}
	
});


