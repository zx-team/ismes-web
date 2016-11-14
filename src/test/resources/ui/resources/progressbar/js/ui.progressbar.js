ui.registerComponent("progressbar", function(name) {
	function Progressbar($progressbar) {
		this.$progressbar = $progressbar;
	}
	Progressbar.prototype = {
		percent : function(value) {
			var $div;
			if (this.$progressbar.find('div').length > 0)
				$div = this.$progressbar.find('div');
			else
				$div = this.$progressbar;
			var $span = $div.find('#text_' + this.$progressbar.attr("id"));
			if (arguments.length == 0)
				return $div.attr('aria-valuenow');
			$div.attr('aria-valuenow', value);
			$div.css('width', value + '%');
			$span.text($span.attr("label") + value + '% ');
		},
		label : function(text) {
			var $div;
			if (this.$progressbar.find('div').length > 0)
				$div = this.$progressbar.find('div');
			else
				$div = this.$progressbar;
			var $span = $div.find('#text_' + this.$progressbar.attr("id"));
			if (arguments.length == 0)
				return $span.text();
			$span.text(text);
		}
	}
	var $progressbar = $("#"+name);
	if($progressbar.length!=1) {
		throw new Error("ui.progressbar(name): Can't find valid DOM element by the name!");
	}
	var data = $progressbar.data("ui.progressbar");
	if(!data) {
		data = new Progressbar($progressbar);
		$progressbar.data("ui.progressbar",data);
	}
	return data;
});