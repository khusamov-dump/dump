
Ext.define("Alternativa.view.paymentorder.PaymentOrder", {
	
	extend: "Alternativa.view.base.tab.gridtab.Grid",
	
	requires: ["Alternativa.view.paymentorder.PaymentOrderForm"],
	
	title: "Платежные поручения",
	
	viewModel: {
		data: {
			gridDataModel: "PaymentOrder"
		},
	},
	
	subViews: {
		form: "paymentorderform",
		dialog: {
			viewModel: {
				data: {
					insertTitle: "Новое платежное поручение"
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
						return "Платежное поручение «поручение»";
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
		text: "Дата платежа",
		width: 160,
		xtype: "datecolumn",
		format: "Y-m-d"
	}, {
		dataIndex: "sender_contractor_title",
		text: "Отправитель",
		flex: 2
	}, {
		dataIndex: "recipient_contractor_title",
		text: "Получатель",
		flex: 2
	}, {
		dataIndex: "payment",
		text: "Сумма",
		flex: 2
	}, {
		dataIndex: "document_notes",
		text: "Заметки",
		flex: 4
	}]
	
});