$.jgrid.extend({
	getEditRowsData : function(rowids,options){
		var args = $.makeArray(arguments).slice(1), o = options, $t = this[0],rows=[],valid=true;
		for(var n in rowids){
			var success = false, nm, tmp={}, tmp2={}, tmp3= {}, editable, fr, cv, ind, nullIfEmpty=false, rowid=rowids[n],bfsr;
			if (!$t.grid ) { return success; }
			ind = $($t).jqGrid("getInd",rowid,true);
			if(ind === false) { continue;}
			var edit =$.jgrid.getRegional($t, 'edit'),editable = $(ind).attr("editable");
			valid = $.isFunction( o.beforeSaveRow ) ?	o.beforeSaveRow.call($t,o, rowid) :  undefined;
			if (editable==="1") {
				var cm;
				$('td[role="gridcell"]',ind).each(function(i) {
					cm = $t.p.colModel[i];
					nm = cm.name;
					if ( nm !== 'cb' && nm !== 'subgrid' && cm.editable===true && nm !== 'rn' && !$(this).hasClass('not-editable-cell')) {
						switch (cm.edittype) {
							case "checkbox":
								var cbv = ["Yes","No"];
								if(cm.editoptions ) {
									cbv = cm.editoptions.value.split(":");
								}
								tmp[nm]=  $("input",this).is(":checked") ? cbv[0] : cbv[1]; 
								break;
							case 'text':
							case 'password':
							case 'textarea':
							case "button" :
								tmp[nm]=$("input, textarea",this).val();
								break;
							case 'select':
								if(!cm.editoptions.multiple) {
									tmp[nm] = $("select option:selected",this).val();
									tmp2[nm] = $("select option:selected", this).text();
								} else {
									var sel = $("select",this), selectedText = [];
									tmp[nm] = $(sel).val();
									if(tmp[nm]) { tmp[nm]= tmp[nm].join(","); } else { tmp[nm] =""; }
									$("select option:selected",this).each(
										function(i,selected){
											selectedText[i] = $(selected).text();
										}
									);
									tmp2[nm] = selectedText.join(",");
								}
								if(cm.formatter && ( cm.formatter === 'select' || cm.formatter === 'amazing')) { tmp2={}; }
								break;
							case 'custom' :
								try {
									if(cm.editoptions && $.isFunction(cm.editoptions.custom_value)) {
										tmp[nm] = cm.editoptions.custom_value.call($t, $(".customelement",this),'get');
										if (tmp[nm] === undefined) { throw "e2"; }
									} else { throw "e1"; }
								} catch (e) {
									if (e==="e1") { $.jgrid.info_dialog(errors.errcap,"function 'custom_value' "+edit.msg.nodefined,edit.bClose, {styleUI : $t.p.styleUI }); }
									else { $.jgrid.info_dialog(errors.errcap,e.message,edit.bClose, {styleUI : $t.p.styleUI }); }
								}
								break;
						}
						cv = $.jgrid.checkValues.call($t,tmp[nm],i);
						if(cv[0] === false) {
							return false;
						}
						if($t.p.autoencode) { tmp[nm] = $.jgrid.htmlEncode(tmp[nm]); }
						if(o.url !== 'clientArray' && cm.editoptions && cm.editoptions.NullIfEmpty === true) {
							if(tmp[nm] === "") {
								tmp3[nm] = 'null';
								nullIfEmpty = true;
							}
						}
					}
				});
				if (cv[0] === false){
					try {
						var tr = $($t).jqGrid('getGridRowById', rowid), positions = $.jgrid.findPos(tr);
						$.jgrid.info_dialog(errors.errcap,cv[1],edit.bClose,{left:positions[0],top:positions[1]+$(tr).outerHeight(), styleUI : $t.p.styleUI });
					} catch (e) {
						alert(cv[1]);
					}
					return success;
				}
				var idname, opers = $t.p.prmNames, oldRowId = rowid;
				if ($t.p.keyName === false) {
					idname = opers.id;
				} else {
					idname = $t.p.keyName;
				}
				if(tmp) {
					var row = $($t).jqGrid('getGridRowById', rowid);
					var newrow = $(row).hasClass("jqgrid-new-row");
					if(newrow){tmp[opers.oper]='add';} else {tmp[opers.oper]  = opers.editoper;}
					//tmp[opers.oper] = opers.editoper;
					if (tmp[idname] === undefined || tmp[idname]==="") {
						tmp[idname] = rowid;
					} else if (ind.id !== $t.p.idPrefix + tmp[idname]) {
						// rename rowid
						var oldid = $.jgrid.stripPref($t.p.idPrefix, rowid);
						if ($t.p._index[oldid] !== undefined) {
							$t.p._index[tmp[idname]] = $t.p._index[oldid];
							delete $t.p._index[oldid];
						}
						rowid = $t.p.idPrefix + tmp[idname];
						$(ind).attr("id", rowid);
						if ($t.p.selrow === oldRowId) {
							$t.p.selrow = rowid;
						}
						if ($.isArray($t.p.selarrrow)) {
							var i = $.inArray(oldRowId, $t.p.selarrrow);
							if (i>=0) {
								$t.p.selarrrow[i] = rowid;
							}
						}
						if ($t.p.multiselect) {
							var newCboxId = "jqg_" + $t.p.id + "_" + rowid;
							$("input.cbox",ind)
								.attr("id", newCboxId)
								.attr("name", newCboxId);
						}
						// TODO: to test the case of frozen columns
					}
				}
				tmp3 = $.extend({},tmp,tmp3);
				tmp3[idname] = $.jgrid.stripPref($t.p.idPrefix, tmp3[idname]);
				rows.push(tmp3);
			}
		}
		if(!valid) return "invalid";
		return rows;
	},
	saveRows : function(rowids, successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc) {
		var args = $.makeArray(arguments).slice(1), o = {}, $t = this[0];
		if( $.type(args[0]) === "object" ) {
			o = args[0];
		} else {
			if ($.isFunction(successfunc)) { o.successfunc = successfunc; }
			if (url !== undefined) { o.url = url; }
			if (extraparam !== undefined) { o.extraparam = extraparam; }
			if ($.isFunction(aftersavefunc)) { o.aftersavefunc = aftersavefunc; }
			if ($.isFunction(errorfunc)) { o.errorfunc = errorfunc; }
			if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
		}
		o = $.extend(true, {
			successfunc: null,
			url: null,
			extraparam: {},
			aftersavefunc: null,
			errorfunc: null,
			afterrestorefunc: null,
			restoreAfterError: true,
			mtype: "POST",
			saveui : "enable",
			savetext : $.jgrid.getRegional($t,'defaults.savetext')
		}, $.jgrid.inlineEdit, o );
		// End compatible
		var success = false, nm, tmp={}, tmp2={}, tmp3= {}, editable, fr, cv, ind, nullIfEmpty=false,
		error = $.trim( $($t).jqGrid('getStyleUI', $t.p.styleUI+'.common', 'error', true) );
		if (!$t.grid ) { return success; }
		if(rowids && !(rowids instanceof Array)){
			rowids = [].push(rowids);
		}else if(!rowids || (rowids instanceof Array && rowids.length == 0)){
			rowids = [];
			this.each( function(){
				var i = this.rows.length;
				while(i--) {
					if( $(this.rows[i]).attr("editable") === "1") {
						rowids.push(this.rows[i].id);
					}
				}
			});
		}
		var rows = $($t).jqGrid("getEditRowsData",rowids,o);
		if(rows == "invalid") return success;
		if($.isFunction($t.p.serializeRowData)){
			req = {'data':$t.p.serializeRowData.call($t, rows)};
		}else{
			if(JSON)
				req =  {'data':JSON.stringify(rows)};
			else
				req = {'data':rows};
		}
		var errors = o.url = o.url || $t.p.editurl;
		var cm, ids = rowids;
		if($t.p.inlineData === undefined) { $t.p.inlineData ={}; }
		req = $.extend({},req,$t.p.inlineData,o.extraparam);
		if (o.url != 'clientArray') {
			$($t).jqGrid("progressBar", {method:"show", loadtype : o.saveui, htmlcontent: o.savetext });
			$.ajax($.extend({
				url:o.url,
				data: req,
				type: o.mtype,
				async : false, //?!?
				complete: function(res,stat){
					$($t).jqGrid("progressBar", {method:"hide", loadtype : o.saveui, htmlcontent: o.savetext});
					if (stat === "success"){
						var ret = true, sucret, k;
						sucret = $($t).triggerHandler("jqGridInlineSuccessSaveRow", [res, rowids, o]);
						if (!$.isArray(sucret)) {sucret = [true, tmp3];}
						if (sucret[0] && $.isFunction(o.successfunc)) {sucret = o.successfunc.call($t, res);}							
						if($.isArray(sucret)) {
							// expect array - status, data, rowid
							ret = sucret[0];
							tmp = sucret[1] || tmp;
						} else {
							ret = sucret;
						}
						if (ret===true) {
							if($t.p.autoencode) {
								$.each(tmp,function(n,v){
									tmp[n] = $.jgrid.htmlDecode(v);
								});
							}
							if(nullIfEmpty) {
								$.each(tmp,function( n ){
									if(tmp[n] === 'null' ) {
										tmp[n] = '';
									}
								});
							}
							//tmp = $.extend({},tmp, tmp2);
							for(var i in rowids){
								var row = $($t).jqGrid('getGridRowById', rowids[i]);
								$($t).jqGrid("setRowData",rowids[i],rows[i]);
								$(row).attr("editable","0");
								for(k=0;k<$t.p.savedRow.length;k++) {
									if( String($t.p.savedRow[k].id) === String(rowids[i])) {fr = k; break;}
								}
								if(fr >= 0) { $t.p.savedRow.splice(fr,1); }
								$(row).removeClass("jqgrid-new-row").unbind("keydown");
							}
							$($t).triggerHandler("jqGridInlineAfterSaveRow", [rowids[i], res, rows, o]);
							if( $.isFunction(o.aftersavefunc) ) { o.aftersavefunc.call($t, rowids[i], res, rows, o); }
							success = true;
						} else {
							$($t).triggerHandler("jqGridInlineErrorSaveRow", [rowids, res, stat, null, o]);
							if($.isFunction(o.errorfunc) ) {
								o.errorfunc.call($t, rowids, res, stat, null);
							}
							if(o.restoreAfterError === true) {
								$($t).jqGrid("restoreRow",rowids, o.afterrestorefunc);
							}
						}
					}
				},
				error:function(res,stat,err){
					$("#lui_"+$.jgrid.jqID($t.p.id)).hide();
					$($t).triggerHandler("jqGridInlineErrorSaveRow", [rowid, res, stat, err, o]);
					if($.isFunction(o.errorfunc) ) {
						o.errorfunc.call($t, rowid, res, stat, err);
					} else {
						var rT = res.responseText || res.statusText;
						try {
							$.jgrid.info_dialog(errors.errcap,'<div class="'+error+'">'+ rT +'</div>', edit.bClose, {buttonalign:'right', styleUI : $t.p.styleUI });
						} catch(e) {
							alert(rT);
						}
					}
					if(o.restoreAfterError === true) {
						$($t).jqGrid("restoreRow",rowid, o.afterrestorefunc);
					}
				}
			}, $.jgrid.ajaxOptions, $t.p.ajaxRowOptions || {}));
		}
		return success;
	}
	});
ui.registerComponent("table",function(name){
	jQuery.extend($.fn.fmatter , {
	    amazing:function(cellvalue,opts,rowdata,act) {
	    	var type = opts.colModel.type;
    		var fmtopts = opts.colModel.formatoptions;
	    	//ui.info("options.colModel.type : "+opts.colModel.type);
	    	if(type == 'date') {
		    	return moment(cellvalue).format("YYYY-MM-DD");
	    	} else if(type == 'time') {
	    		return moment(cellvalue).format("HH:mm:ss");
	    	} else if(type == 'datetime') {
	    		return moment(cellvalue).format("YYYY-MM-DD HH:mm:ss");
	    	} else if(type == 'state'){//状态
	    		if(fmtopts[cellvalue]!=undefined) {
	    			var context = fmtopts[cellvalue].context;
		    		var cssClass = fmtopts[cellvalue].class;
		    		return '<span class="formattype-state'+(context?' bg-'+context:'')+(cssClass?' '+cssClass:'')+'" data-value="'+cellvalue+'">'+fmtopts[cellvalue].label+'</span>';
	    		} else {
	    			return "unkown state";
	    		}
	    	} else if(type == 'dict') {
	    		var dictionary = fmtopts || {};
	    		return '<span class="formattype-dict" data-value="'+cellvalue+'">'+dictionary[cellvalue] || cellvalue+'</span>';
	    	} else if(type == 'user') {
	    		return '<span class="formattype-user" data-value="'+(cellvalue||"")+'">'+(rowdata[opts.colModel.name+"_username"] || "")+'</span>';
	    	} else if(type == 'digit') {
	    		return '<span class="formattype-digit" data-value="'+cellvalue+'">'+ui.formatNumber(ui.roundNumber(cellvalue,0),"###,###")+'</span>';
	    	} else if(type == 'number') {
	    		return '<span class="formattype-number" data-value="'+cellvalue+'">'+ui.formatNumber(ui.roundNumber(cellvalue,2),"###,##0.##")+'</span>';
	    	} else if(type == 'currency') {
	    		return '<span class="formattype-currency" data-value="'+cellvalue+'">'+ui.formatNumber(ui.roundNumber(cellvalue,2),"###,##0.00")+'</span>';
	    	} else if(type == 'operation') {
	    		var rowid = opts.rowId;
	    		var btns = fmtopts || [];
	    		var result = [];
	    		for(var i=0;i<btns.length;i++) {
	    			var name = btns[i].name;
	    			var label = btns[i].label || "";
	    			var icon = btns[i].icon;
	    			//var click = btns[i].click;
	    			var context = btns[i].context || "default";
	    			result[i]='<a name="'+name+'" class="formattype-operation btn btn-xs btn-' + context+(icon?(' glyphicon glyphicon-'+icon):'')+'" data-value="'+rowid+'">'+label+'</a>'
	    		}
	    		return result.join("");
	    	} else if(type == "progress") {
	    		var fmtopts = $.extend({context:function() {return "default"},label:function(cellvalue){return cellvalue+'%';}},fmtopts);
	    		return '<div class="progress formattype-progress">'+
	    	      '<div class="progress-bar progress-bar-'+fmtopts.context(cellvalue)+'" role="progressbar" aria-valuenow="'+cellvalue+'" aria-valuemin="0" aria-valuemax="100" style="width: '+cellvalue+'%;">'+
	    	        '<span>'+fmtopts.label(cellvalue)+'</span>'+
	    	      '</div>'+
	    	    '</div>';
	    	} else {
	    		return cellvalue;
	    	}
	    }
	});
	jQuery.extend($.fn.fmatter.amazing , { 
	    unformat : function(text,opts,cell,act) {
	    	var type = opts.colModel.type;
	    	if(type == 'date') {
		    	return moment(text,"YYYY-MM-DD").toDate().getTime();
	    	} else if(type == 'time') {
	    		return moment(text,"HH:mm:ss").toDate().getTime();
	    	} else if(type == 'datetime') {
	    		return moment(text,"YYYY-MM-DD HH:mm:ss").toDate().getTime();
	    	} else if(type == 'state') {
	    		return $(cell).find(".formattype-state").attr("data-value");
	    	} else if(type == 'dict') {
	    		return $(cell).find(".formattype-dict").attr("data-value");
	    	} else if(type == 'user') {
	    		return $(cell).find(".formattype-user").attr("data-value");
	    	} else if(type == 'digit') {
	    		return $(cell).find(".formattype-digit").attr("data-value");
	    	} else if(type == 'number') {
	    		return $(cell).find(".formattype-number").attr("data-value");
	    	}  else if(type == 'currency') {
	    		return $(cell).find(".formattype-currency").attr("data-value");
	    	} else if(type == 'operation') {
	    		return "";
	    	} else if(type == 'progress') {
	    		return $(cell).find(".progress-bar").attr("aria-valuenow");
	    	} else {
	    		return text;
	    	}
	    }
	});
	function Table($table) {
		this.$table = $table;
	}
	Table.prototype = {
		bind:function(eventName,func) {
			var Table = this;
			this.$table.bind(eventName,function(){func.call(Table);});
		},
		unbind:function(eventName,func) {
			this.$table.bind(eventName);
		},
		addRow:function(rowid,data,pos,src) {
			var success = this.$table.jqGrid('addRowData',rowid,data,pos,src);
			var row = this.$table.jqGrid('getGridRowById', rowid);
			$(row).addClass("jqgrid-new-row");
			return success; 
		},
		setRow:function(rowid,data) {
			return this.$table.jqGrid('setRowData',rowid,data);
		},
		removeRow:function(rowid) {
			return this.$table.jqGrid('delRowData',rowid); 
		},
		restoreRow:function(rowid) {
			this.$table.jqGrid('restoreRow',rowid);
		},
		editRow : function(rowid,url,keys) {
			this.$table.jqGrid('setGridParam', {ondblClickRow:undefined});
			this.$table.jqGrid('editRow',rowid,{url:ui.getRealUrl(url),keys:keys}/*,keys,oneditfunc,successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc*/);
		},
		saveRow : function(rowid,url,successfunc,errorfunc,extraparam/*, successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc*/) {
			var row = this.$table.jqGrid('getGridRowById', rowid);
			var newrow = $(row).hasClass("jqgrid-new-row");
			var oper='edit';
			if(newrow){oper='add';} else {oper='edit';}
			var _this = this;
			var options = {
					beforeSaveRow: function(options,rowid){
						var _row = this;
						return _this.validate.call(_this,rowid);
					},
					afterrestorefunc:function() {
                		_this.lastSelection=undefined;
                	},
                	aftersavefunc:function() {
                		_this.lastSelection=undefined;
                	},
					successfunc: _this.successfunc,
					errorfunc : _this.errorfunc
					};
			if(extraparam){options['extraparam']=extraparam || {'oper':oper};}else{options['extraparam']=extraparam}
			if(url)options['url']=ui.getRealUrl(url);
			if(successfunc)
				options['successfunc']=successfunc;
			else if(this.$table.data("saveRowSuccess"))
				options['successfunc']=this.$table.data("saveRowSuccess");
			if(errorfunc)
				options['errorfunc']=errorfunc;
			else if(this.$table.data("saveRowError"))
				options['errorfunc']=this.$table.data("saveRowError");
			
			this.$table.jqGrid('saveRow',rowid,options);/*,keys,successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc*/
		},
		selectRow:function(rowid) {
			this.$table.setSelection(rowid, true);
		},
		getSelectedRows:function() {
			if(this.$table.jqGrid('getGridParam','multiselect')) {
				return this.$table.jqGrid('getGridParam','selarrrow');
			} else {
				var rowid = this.$table.jqGrid('getGridParam','selrow');
				var r=[];
				if(rowid) {r[0]=rowid};
				return r;
			}
		},
		getEditRowsData:function(rowids) {
			return this.$table.jqGrid('getEditRowsData',rowids);
		},
		saveRows:function(rowids,extraparam,url,successfunc,errorfunc/*, successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc*/){
			var _this = this;
			var args = $.makeArray(arguments).slice(1), o = {};
			if( $.type(args[0]) === "object" ) {
				o = args[0];
			} else {
				if ($.isFunction(successfunc)) { o.successfunc = successfunc; }
				if (url !== undefined) { o.url = url; }
				if (extraparam !== undefined) { o.extraparam = extraparam; }
				if ($.isFunction(errorfunc)) { o.errorfunc = errorfunc; }
			}
			var options = {
					beforeSaveRow: function(options,rowid){
						var _row = this;
						return _this.validate.call(_this,rowid);
					},
					afterrestorefunc:function() {
                		_this.lastSelection=undefined;
                	},
                	aftersavefunc:function() {
                		_this.lastSelection=undefined;
                	},
					successfunc: _this.successfunc,
					errorfunc : _this.errorfunc
					};
			options = $.extend(options, o );
			if(url)options['url']=ui.getRealUrl(url);
			if(successfunc)
				options['successfunc']=successfunc;
			else if(this.$table.data("saveRowSuccess"))
				options['successfunc']=this.$table.data("saveRowSuccess");
			if(errorfunc)
				options['errorfunc']=errorfunc;
			else if(this.$table.data("saveRowError"))
				options['errorfunc']=this.$table.data("saveRowError");
			if(extraparam)options['extraparam']=extraparam;
			this.$table.jqGrid('saveRows',rowids,options);/*,keys,successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc*/
		},
		getRowids() {
			return this.$table.jqGrid('getDataIDs');
		},
		getRow(rowid) {
			return this.$table.jqGrid('getRowData',rowid);
		},
		getCell(rowid,colname) {
			return this.$table.jqGrid('getCell',rowid,colname);
		},
		setCell(rowid,colname,data) {
			return this.$table.jqGrid('setCell',rowid,colname,data);
		},
		reload:function(page) {
			if(arguments.length>0) {
				this.$table.jqGrid('setGridParam', {page:page}).trigger('reloadGrid');
			} else {
				this.$table.jqGrid().trigger('reloadGrid');
			}
		},
		search:function(conditions) {
			var postData = this.$table.jqGrid('getGridParam',"postData");
			for(p in (this.conditions||{})) {
				delete postData[p];
			}
			this.conditions = conditions;
			this.$table.jqGrid('setGridParam', {search: true,page:1,postData:this.conditions}).trigger('reloadGrid');
		},
		clear:function() {
			this.$table.clearGridData();
		},
		caption(caption) {
			if(arguments.length==0) {
				return this.$table.jqGrid("getGridParam","caption");
			} else {
				return this.$table.jqGrid("setCaption",caption);
			}
		},
		getSubtable(rowid) {
			var thisId = this.$table.attr("id");
			return ui.table(thisId+"_"+thisId+"_"+rowid+"_subtable");
		},
		setWidth:function(width) {
			this.$table.setGridWidth(width);　
		},
		builder : function(data) {
			var datas ;
			if(typeof(data) == "string"){
				datas = $.parseJSON(data);
			}else if(typeof(data) == "object"){
				datas = data;
			}
			var select = "<select>";
			for (i = 0; i < datas.length; i++) {
				var option = "<option value=\""+ datas[i]['value'] + "\">"+ datas[i]['label'] + "</option>";
				select = select	+ option;
			}
			select = select	+ ("</select>");
			return select;
		},
		customEditElement : function(type,value,editOptions) {
			if(type && type == "operation"){
				var $div = $('<span style="line-height:30px;"></span>');
				var $save = $('<a name="cell-btn-save" class="btn btn-xs btn-default glyphicon glyphicon-ok" data-value="'+editOptions['rowId']+'">保存</a>');
				var $cancel =$('<a name="cell-btn-cancel" class="btn btn-xs btn-default glyphicon glyphicon-remove" >取消</a>');
				var _this = this;
				$save.on("click",function(){
					_this.saveRow(editOptions['rowId']);
				});
				$cancel.on("click",function(){
					var row = $(_this.$table).jqGrid("getGridRowById",editOptions['rowId'],true);
					if ($(row).attr("editable")==="1" && _this.$table.data("editrules")) {
						var validator = $(row).validate2({"rules":_this.$table.data("editrules")});
						validator.resetForm();
					}
					_this.lastSelection=undefined;
					_this.$table.jqGrid('restoreRow', editOptions['rowId']);
				});
				$div.append($save).append($cancel);
				return $div;
			}else{
				return "";
			}
		},
		customEditElementOp : function(type, elem, oper, value) {
			if (oper === "set") {
			}
			if (oper === "get") {
				return "operation";
			}
		},
		validate : function(rowid) {
			var valid = true;
			var row = $(this.$table).jqGrid("getGridRowById",rowid,true);
			if ($(row).attr("editable")==="1" && this.$table.data("editrules")) {
				var validator = $(row).validate2({"rules":this.$table.data("editrules")});
				valid = validator.checks();
			}
			return valid;
		},
		successfunc : function(response){
			try{
				ui.info("保存成功");
			}catch(e){
				alert("保存成功");
			}
			return true;
		},
		errorfunc : function(rowid,response){
			try{
				ui.info("保存失败");
			}catch(e){
				alert("保存失败");
			}
		},
		lastSelection: 'noselect',
		init:function(opts) {
			var normal = {
					loadComplete:function() {
						//console.log("load completed!");
		           	},
		           	loadError:function() {
		           		//console.log("load error!");
		           	},
	            	beforeRequest:function() {
	            		//console.log("before request!");
	            	},
	            	width:"100%",
					autowidth:true,
					height:"100%",
	                rowNum: 10,
		            postData:{},//查询时的参数
				};
			var force = {
					mtype:"POST",
					hidegrid:false,
					multikey:false,//shiftKey，altKey，ctrlKey
	                multiselectWidth:20,
	                pagerpos:"right",//center,left,right
	                pgbuttons:true,
	                pginput:true,
	                pgtext:"当前页 {0} / {1}",
	                prmNames:{
	                	page:"page",
	                	sort:"sortName",
	                	order:"sortOrder",
	                	rows:"pageSize",
	                	search:"search",
	                	totalrows:"totalRecord",
	                    id:"rowid", // 表示当在编辑数据模块中发送数据时，使用的id的名称 
	                    oper:"oper",    // operation参数名称（我暂时还没用到） 
	                    editoper:"edit", // 当在edit模式中提交数据时，操作的名称 
	                    addoper:"add", // 当在add模式中提交数据时，操作的名称 
	                    deloper:"del", // 当在delete模式中提交数据时，操作的名称 
	                    subgridid:"rowid", // 当点击以载入数据到子表时，传递的数据名称 
	                },
	                jsonReader:{
	                	page:"currentPage",
	                	total:"totalPage",
	                	records:"totalRecord",
	                	repeatitems:false,
	                	userdata:"userdata"
	                },
	                subGridOptions : {
						//plusicon and minusicon defies the icons when the grid is collapsed/expanded. A valid name of icon from Theme Roller should be set. 
						plusicon : "glyphicon glyphicon-triangle-right",
						minusicon : "glyphicon glyphicon-triangle-bottom",
						//openicon the icon bellow the minusicon when the subgrid row is expanded
						openicon : "none",
						//when set to true make it so that all rows will be expanded automatically when a new set of data is loaded. 
						expandOnLoad : false, 
						//If set to false the data in the subgrid is loaded only once 
						//and all other subsequent clicks just hide or show the data and no more ajax calls are made.
						reloadOnExpand : false,
						// when set to true the row is selected when a plusicon is clicked with the mouse. 
						selectOnExpand : true
					},
	                viewrecords: true,
	                recordpos:"left",
	                recordtext:"显示记录 {0} - {1} / {2}",
	                scrollrows:true,
	                shrinkToFit:true,
	                viewsortcols:[false,'vertical',true],
	                rowList: [10, 20, 50],
	                rownumWidth:30,
	                emptyrecords: '没有数据了!',
	                hiddengrid: false,
	                toolbar:[false,"bottom"],
				};
			if(opts["editurl"]) {
				var _this = this;
				var successfunc = opts["saveRowSuccess"]?opts["saveRowSuccess"]:_this.successfunc;
				var errorfunc = opts["saveRowError"]?opts["saveRowError"]:_this.errorfunc;
				normal.ondblClickRow = function(id,iRow,iCol,e) {
            		if (id && id !== _this.lastSelection) {            			
                         _this.restoreRow(_this.lastSelection);
                         _this.$table.jqGrid('editRow',id, {
                        	keys:true, 
                        	focusField: 1,
                        	oneditfunc:function() {
                        		console.log("on edit function ...");
                        	},
                        	beforeSaveRow: function(options,rowid){
        						return _this.validate.call(_this,rowid);
        					},
        					afterrestorefunc:function() {
                        		_this.lastSelection=undefined;
                        	},
                        	aftersavefunc:function() {
                        		_this.lastSelection=undefined;
                        	},
                        	successfunc:successfunc,
                        	errorfunc:errorfunc
                        });
                         _this.lastSelection = id;
                    }
            	}
				if(opts["saveRowSuccess"]){
					this.$table.data("saveRowSuccess",opts["saveRowSuccess"]);
				}
				if(opts["saveRowError"]){
					this.$table.data("saveRowError",opts["saveRowError"]);
				}
			}
			if(opts["editrules"]){
				this.$table.data("editrules",opts["editrules"]);
			}
			this.$table.bind("jqGridAddEditAfterSelectUrlComplete",function(event,element) {
                $(element).select2({
                    placeholder: "请选择...",
                    allowClear: true,
                });
			});
			this.$table.jqGrid($.extend(normal, opts,force));
			var colModel = opts.colModel;
			for(var i=0;i < colModel.length;i++) {
				var column = colModel[i];
				if(column.type == 'operation') {
					var fmtopts = column.formatoptions;
		    		var btns = fmtopts || [];
		    		var clicks = {};
		    		for(var j=0;j<btns.length;j++) {
		    			clicks[btns[j].name] = btns[j].click;
		    		}
		    		this.$table.delegate(".formattype-operation","click",function(event){
		    			event.stopPropagation();
		    			var $this = $(this);
		    			clicks[$this.attr("name")].call($this,$this.attr("name"),$this.attr("data-value"));
		    		});
				}
			}
		}
	}
	var $table = $("#"+name);
	if($table.length!=1) {
		throw new Error("ui.table(name): Can't find valid DOM element by the name!");
	}
	var data = $table.data("ui.table");
	if(!data) {
		data = new Table($table);
		$table.data("ui.table",data);
	}
	return data;
});