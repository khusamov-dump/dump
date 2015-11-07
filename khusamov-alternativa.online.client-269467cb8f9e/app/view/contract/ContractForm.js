
Ext.define("Alternativa.view.contract.ContractForm", {
	
	extend: "Alternativa.view.base.tab.gridtab.Form",
	
	xtype: "contractform",
	
	items: [{
		fieldLabel: "Номер договора",
		name: "document_number",
		bind: "{record.document_number}"
	}, {
		fieldLabel: "Дата договора",
		name: "document_date_start",
		bind: "{record.document_date_start}",
		xtype: "datefield",
		format: "Y-m-d"
	}, {
		fieldLabel: "Дата завершения",
		name: "document_date_end",
		bind: "{record.document_date_end}",
		xtype: "datefield",
		format: "Y-m-d"
	}, {
		fieldLabel: "Предмет договора",
		name: "document_subject",
		bind: "{record.document_subject}",
		xtype: "textarea"
	}, {
		fieldLabel: "Сумма договора",
		name: "contract_payment",
		bind: "{record.contract_payment}",
		xtype: "numberfield"
	}, {
		fieldLabel: "Исполнитель",
		name: "contract_provider_id",
		bind: "{record.contract_provider_id}",
		xtype: "combobox",
		allowBlank: false,
		autoLoadOnValue: true,
		store: {
			type: "contractors"
		},
		listConfig: {
			border: 1,
			//itemTpl: "{contractor_title_short} — {document_number}"
		},
		valueField: "document_id",
		displayField: "contractor_title_short",
		/*pageSize: 25,
		matchFieldWidth: false*/
	}, {
		fieldLabel: "Заказчик",
		name: "contract_consumer_id",
		bind: "{record.contract_consumer_id}",
		xtype: "combobox",
		allowBlank: false,
		autoLoadOnValue: true,
		store: {
			type: "contractors"
		},
		listConfig: {
			border: 1,
			//itemTpl: "{contractor_title_short} — {document_number}"
		},
		valueField: "document_id",
		displayField: "contractor_title_short",
		/*pageSize: 25,
		matchFieldWidth: false*/
	}, {
		fieldLabel: "Заметки",
		name: "document_notes",
		bind: "{record.document_notes}",
		xtype: "textarea"
	}]
	
});