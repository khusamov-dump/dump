
Ext.define("Khusamov.sandbox.tab.Panel", {
	extend: "Ext.tab.Panel",
	alias: "widget.khusamov.sandbox.tabpanel",
	
	config: {
		tabBar: {
			style: {
				backgroundImage: "none",
				//backgroundColor: "#DFE8F6",
				backgroundColor: "transparent",
				borderTopWidth: 0,
				borderLeftWidth: 0,
				borderRightWidth: 0
			}
		}
	}
});

