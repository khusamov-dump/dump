
/**
 * Простая модель Ribbon-панели.
 * Корневой компонент это обычные вкладки.
 */

Ext.define("Khusamov.sandbox.ribbon.Panel", {
	extend: "Khusamov.sandbox.tab.Panel",
	alias: "widget.khusamov.sandbox.ribbonpanel",
	
	constructor: function(config) {
		var me = this;
		
		if (!config.items) {
			config.items = me.items;
			delete me.items;
		}
		
		if (!config.flat) {
			config.flat = me.flat;
			delete me.flat;
		}
		
		Ext.Array.each(config.items, function(tab) {
			
			// Настройки вкладок
			Ext.Object.merge(tab, {
				bodyBorder: false,
				tbar: {
					//enableOverflow: true,
					layout: {
						align: "stretch",
						overflowHandler: "Menu"
					},
					height: 110,
					items: tab.items,
					//padding: 0
				}
			});
			if (config.flat) {
				Ext.Object.merge(tab, {
					tbar: {
						//padding: 0
					}
				});
			}
			
			// Настройки групп
			Ext.Array.each(tab.tbar.items, function(group) {
				
				if (group.xtype != "tbseparator") {
				
					var _group = {
						xtype: "buttongroup",
						headerPosition: "bottom",
						padding: "5px 5px 2px 5px",
						listeners: {
							mouseleave: { element: "el", fn: function() {
								this.removeCls("khusamov-sandbox-ribbon-group-hover");
							}},
							mouseenter: { element: "el", fn: function() {
								this.addCls("khusamov-sandbox-ribbon-group-hover");
							}}
						}
					};
					if (config.flat) {
						Ext.Object.merge(_group, {
							bodyPadding: 0,
							style: {
								boxShadow: "none",
								border: "0px",
								//backgroundColor: "transparent"
							},
							frame: false,
							//frameHeader: false,
							header: {
								//frame: false,
								cls: "x-btn-group-header-text-default-framed x-panel-default",
								style: {
									top: "0px",
									padding: "2px 0px 0px 0px",
									//color: "#99BCE8",
									backgroundColor: "transparent",
									backgroundImage: "none",
									//borderTop: "1px dashed #99BCE8 !important",
									borderTopStyle: "dashed !important",
									borderTopWidth: "1px !important"
								}
							}
						});
					}
					Ext.Object.merge(group, Ext.Object.merge(_group, group));
				}
			});
			
			// Разделители между группами
			var items = [];
			var tbseparator = {
				xtype: "tbseparator",
				margin: "0px 3px 0px 1px",
				style: {
					border: "1px solid #99BCE8 !important",
					borderLeftWidth: "0px !important"
				}
			};
			Ext.Array.each(tab.tbar.items, function(group, index) {
				var next = tab.tbar.items[index + 1];
				var isSeparator = (group.xtype == "tbseparator");
				if (isSeparator) Ext.Object.merge(group, tbseparator);
				if (!isSeparator || isSeparator && config.flat) items.push(group);
				if (next && next.xtype != "tbseparator") {
					if (tab.tbar.items.length - 1 != index)
						if (config.flat)
							items.push(tbseparator);
				}
			});
			tab.tbar.items = items;
			
			delete tab.items;
		});
		
		me.callParent([config]);
	}
});
