
Ext.define("Carousel.MaterialStore", {
	extend: "Ext.data.Store",
	
	model: "Carousel.MaterialModel",
	
	proxy: {
		type: "ajax",
		url: "carousel/MaterialData.json",
		reader: {
			type: "json",
			root: "materials"
		}
	}

});

