ui.registerComponent("button",function(name){
	function Button($btn) {
		this.$btn = $btn;
	}
	Button.prototype = {

		attr:function(name,value){
			var args = arguments.length;
			if(args==0 || args>2) {
				throw new Error("Button::attr() : invalid arguments length!")
			}
			switch(name) {
				case "label":return args==1?this.label():this.label(value);
				case "name":return this.$btn.attr(name);
				case "disabled": return args==1?this.$btn.attr("disabled"):this.$btn.attr("disabled",value);
				default:throw new Error("Button::attr() : invalid attribute name!")
			}
		},
		label:function(label) {
			var tagName = this.$btn.get(0).tagName;
			if("A"==tagName) {
				return arguments.length?this.$btn.text(label):this.$btn.text();
			} else if("INPUT"==tagName) {
				return arguments.length?this.$btn.attr("value",label):this.$btn.attr("value");
			}
		},
		bind:function(eventName,func) {
			var btn = this;
			this.$btn.bind(eventName,function(){func.call(btn);});
		},
		unbind:function(eventName,func) {
			this.$btn.bind(eventName);
		}
	}
	var $button = $("#"+name);
	if($button.length!=1) {
		throw new Error("ui.button(name): Can't find valid DOM element by the name!");
	}
	var data = $button.data("ui.button");
	if(!data) {
		data = new Button($button);
		$button.data("ui.button",data);
	}
	return data;
});