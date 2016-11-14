ui.registerComponent("label",function(name){
	function Label($label) {
		this.$label = $label;
	}
	Label.prototype = {
			val:function(value) {
				return arguments.length?this.label.html(value):this.$label.html();
			}
	}
	var $label = $("#"+name);
	if($label.length!=1) {
		throw new Error("ui.label(name): Can't find valid DOM element by the name!");
	}
	var data = $label.data("ui.label");
	if(!data) {
		data = new Label($label);
		$label.data("ui.label",data);
	}
	return data;
});