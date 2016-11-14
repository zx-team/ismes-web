ui.registerComponent("textarea",function(name){
	function Textarea($textarea) {
		this.$textarea = $textarea;
	}
	Textarea.prototype = {

		attr:function(name,value){
			var args = arguments.length;
			if(args==0 || args>2) {
				throw new Error("Textarea::attr() : invalid arguments length!")
			}
			switch(name) {
				case "label":return args==1?this.label():this.label(value);
				case "name":return this.$textarea.attr(name);
				case "disabled": return args==1?this.$textarea.attr("disabled"):this.$textarea.attr("disabled",value);
				case "value":return this.val(value);
				default:throw new Error("Textarea::attr() : invalid attribute name!")
			}
		},
		label:function(label) {
			var $label = this.$textarea.parents(".form-group").children("label");
			return arguments.length?$label.text(label):$label.text();
		},
		bind:function(eventName,func) {
			var textarea = this;
			this.$textarea.bind(eventName,function(event){func.call(textarea,event);});
		},
		unbind:function(eventName,func) {
			this.$textarea.unbind(eventName);
		},
		val:function(value) {
			return arguments.length?this.$textarea.val(value):this.$textarea.val();
		}
	}
	var $textarea = $("#"+name);
	if($textarea.length!=1) {
		throw new Error("ui.textarea(name): Can't find valid DOM element by the name!");
	}
	var data = $textarea.data("ui.textarea");
	if(!data) {
		data = new Textarea($textarea);
		$textarea.data("ui.textarea",data);
	}
	return data;
});