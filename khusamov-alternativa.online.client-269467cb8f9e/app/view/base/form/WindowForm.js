
// TODO УДАЛИТЬ

Ext.define("Alternativa.view.base.form.WindowForm", {
	
	extend: "Ext.form.Panel",
	
	xtype: "basewindowform",
	
	layout: "anchor",
	
	bodyPadding: 5,
	
	buttons: [{
		text: "Ок",
		formBind: true,
		handler: "onSubmit"
		/*handler: function() {
			this.up("window").fireEvent("submit", this.up("form"));
		}*/
	}, {
		text: "Отмена",
		handler: function() {
			this.up("window").hide();
		}
	}],
	
	defaults: {
		anchor: "100%",
		xtype: "textfield",
		labelWidth: 130
	}
	
});