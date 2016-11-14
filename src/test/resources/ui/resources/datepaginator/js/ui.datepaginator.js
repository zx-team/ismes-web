ui.registerComponent("datepaginator",function(name){
	function Datepaginator($datepaginator) {
		this.$datepaginator = $datepaginator;
	}
	Datepaginator.prototype = {
		init:function(opts) {
			$(this.$datepaginator).datepaginator(opts);
		},
		bind:function(eventName,func) {
			var datepaginator = this;
			this.$datepaginator.on(eventName,function(event, date){func.call(datepaginator, date);});
		}
	}
	var $datepaginator = $("#"+name);
	if($datepaginator.length!=1) {
		throw new Error("ui.datepaginator(name): Can't find valid DOM element by the name!");
	}
	var data = $datepaginator.data("ui.datepaginator");
	if(!data) {
		data = new Datepaginator($datepaginator);
		$datepaginator.data("ui.datepaginator",data);
	}
	return data;
});
