ui.registerComponent("tabs", function(name) {
	function Tabs($tabs) {
		this.$tabs = $tabs;
	}
	Tabs.prototype = {
		bind : function(eventName, func) {
			var tabs = this;
			this.$tabs.find('a[data-toggle="tab"]').bind(eventName + ".bs.tab",
					function(e) {
						var tab = e.target;
						var id = $(e.target).parent().attr('id').substr(3);
						var panel = tabs.$tabs.find("#tp_" + id);
						func.call(tabs, id);
					});
		},
		unbind : function(eventName, func) {
			this.$tabs.unbind(eventName);
		},
		show : function(name) {
			if(isNaN(name)) {
				this.$tabs.find('#tb_' + name + '>a').tab('show');
			} else {
				this.$tabs.find('li:eq('+name+') a').tab('show');
			}
		},
//		hide : function(name) {
//			this.$tabs.find('#tb_' + name + '>a').parent().removeClass('active');
//			this.$tabs.find('#tp_' + name).removeClass('active').removeClass('in');
//		},
//		shown : function(name) {
//			this.$tabs.find('#tb_' + name + '>a').parent().show();
//			this.$tabs.find('#tp_' + name).show();
//		},
//		hiden : function(name) {
//			this.$tabs.find('#tb_' + name + '>a').parent().hide();
//			this.$tabs.find('#tp_' + name).hide();
//		},
		setLabel : function(name,label) {
			this.$tabs.find('#tb_' + name + '>a').html(label);
		},
		setContent : function(name,content) {
			this.$tabs.find('#tp_' + name).html(content);
		},
		disable : function(name) {
			this.$tabs.find('#tb_' + name + '>a').parent().addClass("disabled");
			this.$tabs.find('#tb_' + name + '>a').attr("disable-data",this.$tabs.find('#tb_' + name + '>a').attr("data-toggle"));
			this.$tabs.find('#tb_' + name + '>a').removeAttr("data-toggle");
			this.$tabs.find('#tb_' + name + '>a').attr("disable-href",this.$tabs.find('#tb_' + name + '>a').attr("href"));
			this.$tabs.find('#tb_' + name + '>a').removeAttr("href");
			//this.hide(name);
		},
		enable : function(name) {
			this.$tabs.find('#tb_' + name + '>a').attr("data-toggle",this.$tabs.find('#tb_' + name + '>a').attr("disable-data"));
			this.$tabs.find('#tb_' + name + '>a').removeAttr("disable-data");
			this.$tabs.find('#tb_' + name + '>a').attr("href",this.$tabs.find('#tb_' + name + '>a').attr("disable-href"));
			this.$tabs.find('#tb_' + name + '>a').removeAttr("disable-href");
			this.$tabs.find('#tb_' + name + '>a').parent().removeClass("disabled");
		},
		init : function(opts) {
			this.$tabs.tab();
		}
	}
	var $tabs = $("#"+name);
	if($tabs.length!=1) {
		throw new Error("ui.tabs(name): Can't find valid DOM element by the name!");
	}
	var data = $tabs.data("ui.tabs");
	if(!data) {
		data = new Tabs($tabs);
		$tabs.data("ui.tabs",data);
	}
	return data;
});