ui.registerComponent("image",function(name){
	function Image($image) {
		this.$image = $image;
	}
	Image.prototype = {
		attr:function(name,value){
			var args = arguments.length;
			if(args==0 || args>2) {
				throw new Error("Image::attr() : invalid arguments length!")
			}
			switch(name) {
				case "name":return this.$image.attr("id");
				//case "disabled": return args==1?this.$image.attr("disabled"):this.$image.attr("disabled",value);
				case "src":return args==1?this.$image.attr("src"):this.$image.attr("src",value);
				case "alt":return args==1?this.$image.attr("alt"):this.$image.attr("alt",value);
				default:throw new Error("Image::attr() : invalid attribute name!")
			}
		},
		init:function(opts) {
			var $popup = this.$image.parent("a.fancybox");
			if($popup){
				$popup.fancybox({
					padding: 0,
					openEffect : 'elastic',
					closeEffect : 'elastic',
					closeClick : true,
					helpers : {
						overlay : {
							speedOut : 0,
							css : {
								'background' : 'rgba(0,0,0,0.7)'
							}
						}
					}
				});
			}
		}
	}
	var $image = $("#"+name);
	if($image.length!=1) {
		throw new Error("ui.image(name): Can't find valid DOM element by the name!");
	}
	var data = $image.data("ui.image");
	if(!data) {
		data = new Image($image);
		$image.data("ui.image",data);
	}
	return data;
});