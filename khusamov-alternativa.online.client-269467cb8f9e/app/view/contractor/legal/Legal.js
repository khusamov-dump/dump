
Ext.define("Alternativa.view.contractor.legal.Legal", {
	
	extend: "Alternativa.view.base.tab.gridtab.Grid",
	
	requires: ["Alternativa.view.contractor.legal.LegalForm"],
	
	title: "Юридические лица",
	
	viewModel: {
		data: {
			gridDataModel: "contractor.Legal"
		},
	},
	
	subViews: {
		form: "legalform",
		dialog: {
			width: 500,
			viewModel: {
				data: {
					insertTitle: "Новое юридическое лицо"
				},
				formulas: {
					updateTitle: function(get) {
						var ownershipType = get("record.ownership_type_title_short");
						var legalTitle = get("record.legal_title");
						return ownershipType + " «" + legalTitle + "»";
					}
				}
			}
		}
	},
	
	columns: [{
		dataIndex: "document_id",
		text: "Техномер",
		width: 60,
		hidden: true
	}, {
		dataIndex: "document_number",
		text: "ИНН",
		width: 80
	}, {
		dataIndex: "document_date_start",
		text: "Регистрация",
		width: 160,
		xtype: "datecolumn",
		format: "Y-m-d"
	}, {
		dataIndex: "contractor_title_short",
		text: "Юридическое лицо",
		flex: 2
	}, {
		dataIndex: "document_notes",
		text: "Заметки",
		flex: 4
	}]
	
});