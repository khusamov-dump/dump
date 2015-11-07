
Ext.define("Alternativa.view.main.MainController", {
	
	extend: "Ext.app.ViewController",
	
	alias: "controller.main",
	
	init: function() {
		var me = this;
		
	},
	
	routes: {
		".*": "onAnyRoute"
	},
	
	onAnyRoute: function() {
		var me = this;
		var selected = me.getNodeByPath(me.lookupReference("mainmenu").getRootNode(), me.getCurrentPathWithoutRoot());
		me.lookupReference("mainmenu").selectPath(selected.getPath());
	},
	
	getNodeByPath: function(node, path) {
		var me = this;
		path = path.split("/");
		var finded = node.findChild("path", path[0]);
		if (finded) {
			path.shift();
			finded = me.getNodeByPath(finded, path.join("/"));
		} else {
			finded = node;
		}
		return finded;
	},
	
	getCurrentPathWithoutRoot: function() {
		var path = document.location.hash.split("/");
		path.shift();
		path.shift();
		return path.join("/");
	}
	
});