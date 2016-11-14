ui.registerComponent("password",function(name){
	function Password($password) {
		this.$password = $password;
	}
	Password.prototype = {

		attr:function(name,value){
			var args = arguments.length;
			if(args==0 || args>2) {
				throw new Error("Password::attr() : invalid arguments length!")
			}
			switch(name) {
				case "label":return args==1?this.label():this.label(value);
				case "name":return this.$password.attr(name);
				case "disabled": return args==1?this.$password.attr("disabled"):this.$password.attr("disabled",value);
				case "value":return this.val(value);
				default:throw new Error("Password::attr() : invalid attribute name!")
			}
		},
		label:function(label) {
			var $label = this.$password.parents(".form-group").children("label");
			return arguments.length?$label.text(label):$label.text();
		},
		bind:function(eventName,func) {
			var password = this;
			this.$password.bind(eventName,function(){func.call(password);});
		},
		unbind:function(eventName,func) {
			this.$password.bind(eventName);
		},
		val:function(value) {
			return arguments.length?this.$password.val(value):this.$password.val();
		}
	}
	var $password = $("#"+name);
	if($password.length!=1) {
		throw new Error("ui.password(name): Can't find valid DOM element by the name!");
	}
	var data = $password.data("ui.password");
	if(!data) {
		data = new Password($password);
		$password.data("ui.password",data);
	}
	return data;
});