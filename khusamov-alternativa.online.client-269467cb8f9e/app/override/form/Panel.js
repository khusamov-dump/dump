
Ext.define("Alternativa.override.form.Panel", {
	
	override: "Ext.form.Panel",
	
	border: false,
	
	getIsValid: function() {
		return this.isValid();
	}
	
});