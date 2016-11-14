(function($) {
	/*
	 * Translated default messages for the jQuery validation plugin.
	 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
	 */
	$.extend( $.validator.messages, {
		required: "这是必填字段",
		remote: "请修正此字段",
		email: "请输入有效的电子邮件地址",
		url: "请输入有效的网址",
		date: "请输入有效的日期",
		dateISO: "请输入有效的日期 (YYYY-MM-DD)",
		number: "请输入有效的数字",
		digits: "只能输入数字",
		creditcard: "请输入有效的信用卡号码",
		equalTo: "你的输入不相同",
		extension: "请输入有效的后缀",
		maxlength: $.validator.format( "最多可以输入 {0} 个字符" ),
		minlength: $.validator.format( "最少要输入 {0} 个字符" ),
		rangelength: $.validator.format( "请输入长度在 {0} 到 {1} 之间的字符串" ),
		range: $.validator.format( "请输入范围在 {0} 到 {1} 之间的数值" ),
		max: $.validator.format( "请输入不大于 {0} 的数值" ),
		min: $.validator.format( "请输入不小于 {0} 的数值" )
	} );
	$.validator.addMethod("postcode", function(value, element) {
		var regex = /^[0-9]{6}$/;
		return regex.test(value);
	}, "请输入有效的邮政编码");
	$.validator.addMethod("mobile", function(value, element) {
		var regex = /^1\d{10}$/;
		return regex.test(value);
	}, "请输入有效的手机号码");
	$.validator.addMethod("phone", function(value, element) {
		var regex = /^\d{0,4}[-]{0,1}\d{7,8}$/;
		return regex.test(value);
	}, "请输入有效的电话号码");
	$.validator.addMethod("idcard", function(value, element) {
		var regex = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
		return regex.test(value);
	}, "请输入有效的身份证号码");
})(window.jQuery);
ui.registerComponent("form",function(name){
	function Form($form) {
		this.$form = $form;
	}
	Form.prototype = {
		init:function() {
			this.$form.validate({
				errorElement: "span",
				errorPlacement: function ( error, element ) {
					// Add the `help-block` class to the error element
					error.addClass( "help-block help-block-error" );
					if ( element.prop( "type" ) === "checkbox" || element.prop( "type" ) === "radio") {
						error.insertAfter(element.closest("label"));
					} else {
						var parents = $(element).closest(".input-group");
				    	if(parents.length==0) {	  		
							error.appendTo($(element).parent().addClass("has-error"));
				    	} else {
				    		error.appendTo(parents.parent().addClass("has-error"));
				    	}
					}
				},
				success: function (label) {
			        label.closest('.has-error').removeClass('has-error'); // set success class to the control group
			    },
				highlight: function (element, errorClass, validClass) {
					if ($(element).prop("type") === "checkbox" || $(element).prop("type") === "radio") {
						$(element).closest("label").parent().addClass("has-error");
					} else {
					    var parents = $(element).closest(".input-group");
				    	if(parents.length==0) {   		
							$(element).parent().addClass("has-error");
				    	} else {
				    		parents.parent().addClass("has-error");
				    	}
			    	}
				},
				unhighlight: function (element, errorClass, validClass) {
			    	$(element).closest('.has-error').removeClass('has-error');
				}
			});
		}
	}
	var $form = $("#"+name);
	if($form.length!=1) {
		throw new Error("ui.form(name): Can't find valid DOM element by the name!");
	}
	var data = $form.data("ui.form");
	if(!data) {
		data = new Form($form);
		$form.data("ui.form",data);
	}
	return data;
});
