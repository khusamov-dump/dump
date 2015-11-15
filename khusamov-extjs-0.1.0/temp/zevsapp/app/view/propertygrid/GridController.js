
Ext.define("Zevs.view.propertygrid.GridController", {
	
	extend: "Ext.app.ViewController",
	
	alias: "controller.propertygrid",
	
	requires: [
		"Zevs.view.propertygrid.helper.FrameHelper", 
		"Zevs.view.propertygrid.helper.FrameSideHelper",
		"Zevs.view.propertygrid.helper.FrameBeamHelper",
		"Zevs.view.propertygrid.helper.ProductJointHelper"
	],
	
	mixins: ["Zevs.lib.view.controller.mixin.Helperable"],
	
	helpers: ["frame", "frameside", "framebeam", "productpoint"],
	
	init: function() {
		var me = this;
		me.mixins.helperable.constructor.call(me);
		me.getViewModel().getParent().getView().lookupReference("desktop").on({
			select: "onChangeSelection",
			unselect: "onChangeSelection",
			scope: this
		});
	},
	
	onChangeSelection: function(selection) {
		var me = this;
		if (selection.getCount() == 0) {
			me.unselect();
			me.getViewModel().set("emptyText", "Ничего не выбрано.");
		} else if (selection.getCount() == 1) {
			me.select(selection.first().getProjectItem());
		} else {
			me.unselect();
			me.getViewModel().set("emptyText", "Выбрано более одного элемента.");
		}
	},
	
	select: function(projectItem) {
		var me = this;
		var classpath = projectItem.self.getName().split(".");
		var projectItemType = classpath[classpath.length - 1];
		var helper = me.getHelperByShortName(projectItemType);
		if (helper) {
			var source = helper.getPropertySource(projectItem);
			me.getViewModel().set("source", source);
		} else {
			me.getViewModel().set("emptyText", "Выбран неизвестный элемент.");
		}
	},
	
	unselect: function() {
		var me = this;
		me.getViewModel().set("source", {
			title: "Свойства"
		});
	}
	
});