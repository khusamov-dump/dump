
Ext.define("Carousel.MaterialModel", {
	extend: "Ext.data.Model",
	
	idProperty: "Material_id",
	
	fields: [{
		// Номер материала
		name: "Material_id",
		type: "integer"
	}, {
		// Название материала
		name: "Material_Title",
		type: "string"
	}, {
		// Артикул или код материала
		name: "Material_Marking",
		type: "string"
	}, {
		// Цвет названия (в формате #RRGGBB) 
		// Это на случай, если фон темный, то чтобы надпись была видна здесь нужно задать белый цвет.
		name: "Material_Title_Color",
		type: "string"
	}, {
		// Название категории материала
		name: "Material_Category_Title",
		type: "string"
	}, {
		// Сам материал: либо цвет (в формате #RRGGBB)
		name: "Material_Color",
		type: "string"
	}, {
		// Сам материал: либо путь к текстуре материала
		name: "Material_Texture_Url",
		type: "string"
	}]

});

