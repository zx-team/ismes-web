ui.registerComponent("view",function(name){
	function View() {
	}
	View.prototype = {
		bind:function(eventName,func) {
			var view = this;
			$(document).bind(eventName,function(){func.call(view);});
		}
	}
	return new View();
});