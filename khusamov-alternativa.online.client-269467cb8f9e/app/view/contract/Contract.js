
Ext.define("Alternativa.view.contract.Contract", {
	
	extend: "Alternativa.view.base.tab.gridtab.Grid",
	
	requires: ["Alternativa.view.contract.ContractForm"],
	
	title: "Договора",
	
	viewModel: {
		data: {
			gridDataModel: "Contract"
		},
	},
	
	subViews: {
		form: "contractform",
		dialog: {
			viewModel: {
				data: {
					insertTitle: "Новый договор"
				},
				formulas: {
					updateTitle: function(get) {
						// TODO Когда поле не валидно, то по bind-у его значение не передается.
						/*var title = [];
						var surname = get("record.individual_surname");
						title.push(surname);
						var name = get("record.individual_first_name");
						if (name) title.push(name[0] + ".");
						var patronymic = get("record.individual_patronymic");
						if (patronymic) title.push(patronymic[0] + ".");*/
						return "Договор «договор»";
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
		text: "Номер",
		width: 80
	}, {
		dataIndex: "document_date_start",
		text: "Дата",
		width: 160,
		xtype: "datecolumn",
		format: "Y-m-d"
	}, {
		dataIndex: "document_date_end",
		text: "Завершение",
		width: 160,
		xtype: "datecolumn",
		format: "Y-m-d"
	}, {
		dataIndex: "contract_payment",
		text: "Сумма",
		flex: 2,
		renderer: Ext.util.Format.ruMoney
	}, {
		dataIndex: "document_subject",
		text: "Предмет",
		flex: 2
	}, {
		dataIndex: "contract_provider_title_short",
		text: "Исполнитель",
		flex: 2
	}, {
		dataIndex: "contract_consumer_title_short",
		text: "Заказчик",
		flex: 2
	}, {
		dataIndex: "document_notes",
		text: "Заметки",
		flex: 4
	}]
	
});