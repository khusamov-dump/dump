
Ext.define("Zevs.lib.machine.state.State", {
	
	extend: "Zevs.lib.machine.state.BaseStartState",
	
	config: {
		
		id: "start",
		
		name: "Запуск автомата",
		
		//handler: Ext.emptyFn
		
	},
	
	handler: function() {
		var me = this;
		
		
		switch(true) {
			case me.getMachine().isStop():
				
				
				
				
				break;
			case me.getMachine().isPause():
				break;
		}
		
		
		
	}
	
});