



// TODO Можно удалять!!! выродился в нуль



// TODO переделать в плагин!!! с учетом концепции плагина. Концепция описана в файле с базовым классом плагина.

// TODO плагин скорее всего выродится, так как достаточно будет создать вид Конструкция и в него добавить ссылку на конструкцию
// а дальше все виды сами создаются рекурсивно и слушатели тоже


/**
 * Создает слушатели всех изменений проекта и отображает их на вид desktop.
 * На вход можно подавать как пустой проект, так и заполненный.
 */

Ext.define("Zevs.view.desktop.plugin.project.Bind", {
	
	extend: "Zevs.lib.view.controller.plugin.Plugin",
	
	requires: [
		"Zevs.view.desktop.item.frame.Frame",
		"Zevs.view.desktop.item.frame.FrameSide"
	],
	
	onProjectUpdate: function(project) {
		var construction = project.getConstruction();
		construction.on({
			add: "onAddToConstruction",
			scope: this
		});
		
		
		// TODO Перебрать все изделия и соединители и подцепить к ним слушателей - случай когда проект не пустой
		
		
	},
	
	privates: {
		
		onAddToConstruction: function(added) {
			var me = this;
			if (!Ext.isArray(added)) added = [added];
			added.forEach(function(item) {
				
				// Добавляется изделие
				if (item.isProduct) {
					var product = item;
					
					var frameView = Ext.create("Zevs.view.desktop.item.Frame", {
						projectItem: product.getFrame()
					});
					var frameGeometry = product.getFrame().getPolygon();
					frameView.getPolygon().setGeometry(frameGeometry);
					me.getView().addPiece(frameView);
					
					product.getFrame().getFrameSides().each(function(frameSide, index) {
						var frameSideGeometry = frameSide.getBaseLine();
						var frameSideView = Ext.create("Zevs.view.desktop.item.frame.FrameSide", {
							projectItem: frameSide
						});
						frameSideView.setGeometry(frameSideGeometry);
						me.getView().addPiece(frameSideView);
					});
				}
				
				// Добавляется соединитель
				if (item.isProductJoint) {
					
				}
				
			});
		}
		
	}
	
});