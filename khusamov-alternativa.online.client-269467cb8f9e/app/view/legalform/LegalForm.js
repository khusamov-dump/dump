
Ext.define("Alternativa.view.legalform.LegalForm", {
	
	extend: "Alternativa.view.base.tab.gridtab.Grid",
	
	requires: ["Alternativa.view.legalform.LegalFormForm"],
	
	title: "Организационно-правовые формы",
	
	viewModel: {
		data: {
			gridDataModel: "LegalForm"
		},
		// http://javascript.ru/forum/extjs/56267-kak-otklyuchit-ext-data-chainedstore-v-vidakh-esli-samo-khranilishhe-v-kontrollere.html
		// TODO Предлагают использовать алиасы
		/*stores: {
			gridStore: "OwnershipTypes"
		}*/
	},
	
	subViews: {
		form: "legalformform",
		dialog: {
			width: 500,
			viewModel: {
				data: {
					insertTitle: "Новая организационно-правовая форма"
				},
				formulas: {
					updateTitle: function(get) {
						return get("record.title");
					}
				}
			}
		}
	},
	
	columns: [{
		dataIndex: "legal_form_id",
		text: "№",
		width: 60
	}, {
		dataIndex: "title_short",
		text: "Сокращенное наименование",
		flex: 1
	}, {
		dataIndex: "title",
		text: "Полное наименование",
		flex: 3
	}]
	
});