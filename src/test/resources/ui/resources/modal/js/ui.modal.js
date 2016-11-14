ui.registerComponent("modal", function(name){
	function Modal($modal) {
		this.$modal = $modal;
	}
	Modal.prototype = {
		show:function(name,value) {
			this.$modal.modal('show');
		},
		hide:function(name,value) {
			this.$modal.modal('hide');
		},
		toggle:function(name,value) {
			this.$modal.modal('toggle');
		},
		bind:function(eventName, func) {
			var modal = this;
			switch(eventName) {
				case 'show':this.$modal.bind("show.bs.modal", function(){func.call(modal);});break;
				case 'shown':this.$modal.bind("shown.bs.modal", function(){func.call(modal);});break;
				case 'hide':this.$modal.bind("hide.bs.modal", function(){func.call(modal);});break;
				case 'hidden':this.$modal.bind("hidden.bs.modal", function(){func.call(modal);});break;
			}
			
		},
		init:function(opts) {
			this.$modal.modal($.extend({
				show : false,
				keyboard : true
			}, opts));
		}
	}
	var $modal = $("#"+name);
	if($modal.length!=1) {
		throw new Error("ui.modal(name): Can't find valid DOM element by the name!");
	}
	var data = $modal.data("ui.modal");
	if(!data) {
		data = new Modal($modal);
		$modal.data("ui.modal",data);
	}
	return data;
});