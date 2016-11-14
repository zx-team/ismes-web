ui.registerComponent("radio",function(name){
	function Radio($radio) {
		this.$radio = $radio;
	}
	Radio.prototype = {

		attr:function(name,value){
			var args = arguments.length;
			if(args==0 || args>2) {
				throw new Error("Radio::attr() : invalid arguments length!")
			}
			switch(name) {
				case "label":return args==1?this.label():this.label(value);
				case "name":return this.$radio.attr(name);
				case "disabled": return args==1?this.$radio.attr("disabled"):this.$radio.attr("disabled",value);
				case "value":return this.val(value);
				case "checked":return args==1?this.$radio.attr("checked"):value?this.$radio.iCheck('check'):this.$radio.iCheck('uncheck');
				default:throw new Error("Radio::attr() : invalid attribute name!")
			}
		},
		label:function(label) {
			var $label = this.$text.parents(".form-group").children("label");
			return arguments.length?$label.text(label):$label.text();
		},
		bind:function(eventName,func) {
			var radio = this;
			this.$radio.bind(eventName,function(){func.call(radio);});
			
		},
		unbind:function(eventName,func) {
			this.$radio.unbind(eventName);
		},
		val:function(value) {
			return arguments.length?this.$radio.val(value):this.$radio.val();
		},
		isChecked:function() {
			return this.$radio.is(":checked");
		},
		init:function(opts) {
			this.$radio.iCheck($.extend({radioClass: 'iradio_minimal-grey',},opts));
		}
	}
	var $radio = $("#"+name);
	if($radio.length!=1) {
		throw new Error("ui.radio(name): Can't find valid DOM element by the name!");
	}
	var data = $radio.data("ui.radio");
	if(!data) {
		data = new Radio($radio);
		$radio.data("ui.radio",data);
	}
	return data;
});