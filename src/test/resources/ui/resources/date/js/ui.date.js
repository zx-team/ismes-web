ui.registerComponent("date",function(name){
	function Date($date) {
		this.$date = $date;
	}
	Date.prototype = {

		attr:function(name,value){
			var args = arguments.length;
			if(args==0 || args>2) {
				throw new Error("Date::attr() : invalid arguments length!")
			}
			switch(name) {
				case "label":return args==1?this.label():this.label(value);
				case "name":return this.$date.attr(name);
				case "disabled": return args==1?this.$date.attr("disabled"):this.$date.attr("disabled",value);
				case "value":return this.val(value);
				default:throw new Error("Date::attr() : invalid attribute name!")
			}
		},
		label:function(label) {
			var $label = this.$text.parents(".form-group").children("label");
			return arguments.length?$label.text(label):$label.text();
		},
		bind:function(eventName,func) {
			var date = this;
			if(eventName=="blur" || eventName=="focus") {
				this.$date.bind(eventName,function(){func.call(date);});
			} else {
				this.$date.parents(".date").datetimepicker().bind("dp."+eventName,function(event){func.call(date,date.val());});
			}
		},
		unbind:function(eventName,func) {
			this.$date.bind(eventName,func);
			if(eventName=="blur" || eventName=="focus") {
				this.$date.unbind(eventName);
			} else {
				this.$date.parents(".date").datetimepicker().unbind("dp."+eventName);
			}
		},
		val:function(value) {
			return arguments.length?this.$date.val(value):this.$date.val();
		},
		init:function(opts) {
			var $obj = this.$date;
			var $parent = $obj.parent(".input-group");
			if($parent.length>0) {
				$parent.append('<div class="input-group-addon datepickerbutton"><span class="glyphicon glyphicon-calendar"></span></div>');
			} else {
				$parent = $obj.parent();
				var $inputgroup = $('<div class="input-group"></div>');
				$inputgroup.insertAfter($obj);
				$inputgroup.append($obj);
				$inputgroup.append('<div class="input-group-addon datepickerbutton"><span class="glyphicon glyphicon-calendar"></span></div>');
			}
//			if(this.$date.siblings(".input-group-addon").length>0) {
//				$obj = this.$date.parents(".input-group");
//			}
			$obj.parent().datetimepicker($.extend({
				format : "YYYY/MM/DD",
				ignoreReadonly : true
			}, opts));
		}
	}
	var $date = $("#"+name);
	if($date.length!=1) {
		throw new Error("ui.date(name): Can't find valid DOM element by the name!");
	}
	var data = $date.data("ui.date");
	if(!data) {
		data = new Date($date);
		$date.data("ui.date",data);
	}
	return data;
});