(function(){
	function UI() {
		var _v="1.0.0";
		this.version = function() {
			return _v;
		}
	};
	UI.prototype = {
		registerComponent:function(componentName,func) {
			if(this[componentName]) {
				throw new Error("UI.registerComponent(): "+componentName+" has registered!");
			}
			this[componentName]=func;
		},
		post:function(url,data,success,error) {
			$.ajax({url:url,type:'post',data:data,success:success,error:error});
		},
		get:function(url,data,success,error) {
			$.ajax({url:url,type:'get',data:data,success:success,error:error});
		},
		success:function(message,title) {
            $toastlast = toastr.success(message, title);
		},
		info:function(message,title) {
			$toastlast = toastr.info(message, title);
		},
		warn:function(message,title) {
			$toastlast = toastr.warning(message, title);
		},
		error:function(message,title) {
			$toastlast = toastr.error(message, title);
		},
		alert:function(message, callback) {
				bootbox.alert(message||" ", callback);
		},
		confirm:function(message, callback) {
				bootbox.confirm(message||" ", callback); 
		},
		dialog:function(title, message, buttons, callback) {			
			var btns = {};
			var theCallback = function(event) {
				callback($(event.currentTarget).attr("data-bb-handler"));
			}
			for (int = 0; int < buttons.length; int++) {
				btns[buttons[int].name] = {
					label: buttons[int].label,
					className: "btn-"+buttons[int].context+"",
					callback: theCallback
				}
			}
			bootbox.dialog({
				message:message||" ",
				title:title,
				buttons:btns
			});
		},
		
		getRealUrl:function(url) {
			if(url && url.indexOf("/") == 0) {
				return ui.URL_PREFIX+url;
			} else {
				return url;
			}
		},
		/** 
    	 * 格式化数字显示方式  
    	 * 用法 
    	 * formatNumber(12345.999,'#,##0.00'); 
    	 * formatNumber(12345.999,'#,##0.##'); 
    	 * formatNumber(123,'000000'); 
    	 * @param num 
    	 * @param pattern 
    	 */  
		formatNumber:function (num,pattern) {  
    	  var strarr = num?num.toString().split('.'):['0'];  
    	  var fmtarr = pattern?pattern.split('.'):[''];  
    	  var retstr='';  
    	  
    	  // 整数部分  
    	  var str = strarr[0];  
    	  var fmt = fmtarr[0];  
    	  var i = str.length-1;    
    	  var comma = false;  
    	  for(var f=fmt.length-1;f>=0;f--){  
    	    switch(fmt.substr(f,1)){  
    	      case '#':  
    	        if(i>=0 ) retstr = str.substr(i--,1) + retstr;  
    	        break;  
    	      case '0':  
    	        if(i>=0) retstr = str.substr(i--,1) + retstr;  
    	        else retstr = '0' + retstr;  
    	        break;  
    	      case ',':  
    	        comma = true;  
    	        retstr=','+retstr;  
    	        break;  
    	    }  
    	  }  
    	  if(i>=0){  
    	    if(comma){  
    	      var l = str.length;  
    	      for(;i>=0;i--){  
    	        retstr = str.substr(i,1) + retstr;  
    	        if(i>0 && ((l-i)%3)==0) retstr = ',' + retstr;   
    	      }  
    	    }  
    	    else retstr = str.substr(0,i+1) + retstr;  
    	  }  
    	  
    	  retstr = retstr+'.';  
    	  // 处理小数部分  
    	  str=strarr.length>1?strarr[1]:'';  
    	  fmt=fmtarr.length>1?fmtarr[1]:'';  
    	  i=0;  
    	  for(var f=0;f<fmt.length;f++){  
    	    switch(fmt.substr(f,1)){  
    	      case '#':  
    	        if(i<str.length) retstr+=str.substr(i++,1);  
    	        break;  
    	      case '0':  
    	        if(i<str.length) retstr+= str.substr(i++,1);  
    	        else retstr+='0';  
    	        break;  
    	    }  
    	  }  
    	  return retstr.replace(/^,+/,'').replace(/\.$/,'');  
    	},
    	roundNumber:function(num,precise) {    
    	    return Math.round  (num*Math.pow(10,precise))/Math.pow(10,precise);
    	}
	}
	window.ui=window.ui||new UI();
	window.ui.messageHandler=function(messages) {
		messages.error|| ui.error(messages.error);
		messages.warn || ui.warn(messages.warn);
		messages.info || ui.info(messages.info);
	}
})();