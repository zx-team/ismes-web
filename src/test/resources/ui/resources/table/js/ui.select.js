ui.registerComponent("select",function(name){
	function Select($select) {
		this.$select = $select;
	}
	Select.prototype = {

		attr:function(name,value){
			var args = arguments.length;
			if(args==0 || args>2) {
				throw new Error("Select::attr() : invalid arguments length!")
			}
			switch(name) {
				case "label":return args==1?this.getLabel():this.setLabel(value);
				case "name":return this.$select.attr(name);
				case "disabled": return args==1?this.$select.attr("disabled"):this.$select.attr("disabled",value);
				case "value":return this.val(value);
				default:throw new Error("Select::attr() : invalid attribute name!")
			}
		},
		label:function(label) {
			var $label = this.$select.parents(".form-group").children("label");
			return arguments.length?$label.text(label):$label.text();
		},
		bind:function(eventName,func) {
			var select = this;
			this.$select.bind(eventName,function(){func.call(select);});
		},
		unbind:function(eventName,func) {
			this.$select.unbind(eventName);
		},
		val:function(value) {
			return arguments.length?this.$select2.val(value).trigger("change"):this.$select2.val();
		},
		text:function() {
			var text = [];
			var data = this.$select.select2("data");
			for(var i=0;i<data.length;i++) {
				text[i] = data[i].text;
			}
			return text;
		},
		init:function(opts) {
			if(opts['placeholder'])
				opts['allowClear']=true;
			if(opts['url']){
				var ajaxSetting = {
						   url: opts['url'],
						   dataType: 'json',
						   processResults: function(data){
								for(var n in data){
									var op = data[n];
									op['text'] = op['label'];
									op['id'] = op['value'];
									var children = op['children'];
									if(children){
										for(var nc in children){
											var opc = children[nc];
											opc['text'] = opc['label'];
											opc['id'] = opc['value'];
										}
									}
								}
								return {
								     results: data
								}
							}
				};
				opts['ajax'] = ajaxSetting;
			}
			if(opts['parent']){
				var sel = this.$select;
				var _opt = opts;
				var parentId = opts['parent'];
				$("#"+opts['parent']).on("change",function(e){
					var value = $("#"+parentId).val();
					_opt['ajax']['data'] = {'parent': value};
					sel.empty();
					sel.select2(_opt);
					sel.trigger('change'); 
				});
			}
			this.$select2=this.$select.select2($.extend({width: '100%'},opts));
		}
	}
	var $select = $("#"+name);
	if($select.length!=1) {
		throw new Error("ui.select(name): Can't find valid DOM element by the name!");
	}
	var data = $select.data("ui.select");
	if(!data) {
		data = new Select($select);
		$select.data("ui.select",data);
	}
	return data;
});