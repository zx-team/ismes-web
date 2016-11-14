ui.registerComponent("hidden",function(name){
	function Hidden($hidden) {
		this.$hidden = $hidden;
	}
	Hidden.prototype = {
		val:function(value) {
			return arguments.length?this.$hidden.val(value):this.$hidden.val();
		}
	}
	var $hidden = $("#"+name);
	if($hidden.length!=1) {
		throw new Error("ui.hidden(name): Can't find valid DOM element by the name!");
	}
	var data = $hidden.data("ui.hidden");
	if(!data) {
		data = new Hidden($hidden);
		$hidden.data("ui.hidden",data);
	}
	return data;
});