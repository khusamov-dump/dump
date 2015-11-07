
Ext.define("Carousel.MaterialGrid", {
	extend: "Ext.grid.Panel",
	
	store: Ext.create("Carousel.MaterialStore"),

	title: "Материал корпуса",
	width: 1000,
	height: 200,
	renderTo: Ext.getBody(),
	
	columns: [{
		header: "№",
		dataIndex: "Material_id",
		width: 30
	}, {
		header: "Название",
		dataIndex: "Material_Title",
		flex: 1
	}, {
		header: "Артикул",
		dataIndex: "Material_Marking",
		width: 80
	}, {
		header: "Цвет названия",
		dataIndex: "Material_Title_Color",
		width: 100
	}, {
		header: "Категория материала",
		dataIndex: "Material_Category_Title",
		width: 130
	}, {
		header: "Материал: Цвет",
		dataIndex: "Material_Color",
		width: 100
	}, {
		header: "Материал: путь к текстуре",
		dataIndex: "Material_Texture_Url",
		flex: 1
	}]

});
