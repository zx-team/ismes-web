ui.registerComponent("text",function(name){
	function Text($text) {
		this.$text = $text;
	}
	Text.prototype = {

		attr:function(name,value){
			var args = arguments.length;
			if(args==0 || args>2) {
				throw new Error("Text::attr() : invalid arguments length!")
			}
			switch(name) {
				case "label":return args==1?this.label():this.label(value);
				case "name":return this.$text.attr(name);
				case "disabled": return args==1?this.$text.attr("disabled"):this.$text.attr("disabled",value);
				case "value":return this.val(value);
				default:throw new Error("Text::attr() : invalid attribute name!")
			}
		},
		label:function(label) {
			var $label = this.$text.parents(".form-group").children("label");
			return arguments.length?$label.text(label):$label.text();
		},
		bind:function(eventName,func) {
			var text = this;
			this.$text.bind(eventName,function(){func.call(text);});
		},
		unbind:function(eventName,func) {
			this.$text.bind(eventName);
		},
		val:function(value) {
			return arguments.length?this.$text.val(value):this.$text.val();
		}
	}
	var $text = $("#"+name);
	if($text.length!=1) {
		throw new Error("ui.text(name): Can't find valid DOM element by the name!");
	}
	var data = $text.data("ui.text");
	if(!data) {
		data = new Text($text);
		$text.data("ui.text",data);
	}
	return data;
});