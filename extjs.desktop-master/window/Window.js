
Ext.define("Sultana.window.Window", {
	extend: "Ext.window.Window",
	
	cls: "border-radius-2px",
	shadow: false,
	border: false,
	bodyStyle: {
		backgroundColor: "transparent" // TODO сделать классом, чтобы легко можно было отключать
	},
	
	ghost: false,
	maximizable: true,
	constrain: true, // без этой фигни перекрывается панель задач при максимизации окна
	closeAction: "hide",
	resizable: {
		dynamic: true
	}
	
});


