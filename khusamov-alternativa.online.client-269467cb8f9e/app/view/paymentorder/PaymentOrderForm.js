
Ext.define("Alternativa.view.paymentorder.PaymentOrderForm", {
	
	extend: "Alternativa.view.base.tab.gridtab.Form",
	
	xtype: "paymentorderform",
	
	items: [{
		name: "document_number",
		fieldLabel: "Номер платежки",
		bind: "{record.document_number}"
	}, {
		xtype: "datefield",
		name: "document_date_start",
		fieldLabel: "Дата регистрации",
		format: "Y-m-d",
		bind: "{record.document_date_start}"
	}, {
		allowBlank: false,
		name: "sender_id",
		fieldLabel: "Отправитель",
		bind: "{record.sender_id}",
		
		xtype: "combobox",
		store: {
			type: "contractors"
		},
		valueField: "document_id",
		displayField: "contractor_title",
		
		pageSize: 25,
		matchFieldWidth: false,
		listConfig: {
			border: 1,
			itemTpl: "{contractor_title} — {document_number}"
		}
		
	}, {
		allowBlank: false,
		name: "recipient_id",
		fieldLabel: "Получатель",
		bind: "{record.recipient_id}",
		
		xtype: "combobox",
		store: {
			type: "contractors"
		},
		valueField: "document_id",
		displayField: "contractor_title",
		
		pageSize: 25,
		matchFieldWidth: false,
		listConfig: {
			border: 1,
			itemTpl: "{contractor_title} — {document_number}"
		}
		
		
	}, {
		xtype: "numberfield",
		name: "payment",
		fieldLabel: "Сумма",
		bind: "{record.payment}"
	}, {
		xtype: "textarea",
		name: "document_notes",
		fieldLabel: "Заметки",
		bind: "{record.document_notes}"
	}]
	
});