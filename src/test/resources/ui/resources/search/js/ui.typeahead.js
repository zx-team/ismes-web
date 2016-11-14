/*!
 * user v1.0.0, http://git.io/isesol
 * ===================================
 * Powerful jQuery user cookie
 *
 * (c) 2016 Intelligent Cloud section, http://www.isesol.com
 * isesol Licensed
 */

ui.registerComponent("typeahead",function(){
	function typeahead() {
		
	}
	typeahead.prototype = {
		local:function(uid, datas) {
			var custom = new Bloodhound({
		          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.label); },
		          queryTokenizer: Bloodhound.tokenizers.whitespace,
		          local: datas
		          
		        });
			
		        custom.initialize();
		         
		        if (App.isRTL()) {
		          $('#'+uid).attr("dir", "rtl");  
		        }  
		        $('#'+uid).typeahead(null, {
		          name: uid,
		          displayKey: 'label',
		          classNames: {
		              open: 'is-open',
		              empty: 'is-empty',
		              cursor: 'is-active',
		              suggestion: 'Typeahead-suggestion',
		              selectable: 'Typeahead-selectable'
		            },
		          hint: (App.isRTL() ? false : true),
		          source: custom.ttAdapter(),
		          templates: {
		        	empty: [
	        	            '<div class="media">',
		        	            '<div class="media-body">',
		                        '<h6 class="media-heading">没有找到相关数据</h6>',
		                    '</div>',
	        	            '</div>'
	        	           ].join(''),
		            suggestion: Handlebars.compile([
		              '<div class="media">',
		              		'{{#if avatar}}',
		                    '<div class="pull-left">',
		                        '<div class="media-object">',
		                            '<img src="{{avatar}}" width="50" height="50"/>',
		                        '</div>',
		                    '</div>',
		                    '{{/if}}',
		                    '{{#if title}}<div class="media-body">',
		                        '<h4 class="media-heading">{{title}}</h4>',
		                        '{{#if addon}}<p>{{addon}}</p>{{/if}}',
		                    '</div> {{/if}}',
		              '</div>',
		            ].join(''))
		          }
		        }).on('typeahead:selected', function (e, datum) {
		        	if(datum["value"] != null && datum["value"] != '' && datum["value"] != 'undefined'){
		        		$('#'+uid).val(datum["value"]);
		        	}
		        });
		},
		country:function(uid, curl){
			var countries = new Bloodhound({
		          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
		          queryTokenizer: Bloodhound.tokenizers.whitespace,
		          limit: 10,
		          prefetch: {
		            url: curl,
		            filter: function(list) {
		              return $.map(list, function(country) { return { name: country }; });
		            }
		          }
		        });
		 
		        countries.initialize();
		         
		        if (App.isRTL()) {
		          $('#'+uid).attr("dir", "rtl");  
		        } 
		        $('#'+uid).typeahead(null, {
		          name: uid,
		          displayKey: 'name',
		          hint: (App.isRTL() ? false : true),
		          source: countries.ttAdapter()
		        });
		},
		custom:function(uid, curl){
			var custom = new Bloodhound({
		          datumTokenizer: function (datum) {
		              return Bloodhound.tokenizers.whitespace(datum.value);
		          },
		          queryTokenizer: Bloodhound.tokenizers.whitespace,
		          /*remote: curl+"?query=%QUERY"*/
		          remote: {
		        	   url: "/ismes-web/query",
		        	   prepare: function (query, settings) {
	                    	   settings.type="POST";
	                    	   settings.data = {query: query};
	                    	return settings;
	                   }
		          }
		        });
			
		        custom.initialize();
		         
		        if (App.isRTL()) {
		          $('#'+uid).attr("dir", "rtl");  
		        }  
		        $('#'+uid).typeahead(null, {
		          name: uid,
		          displayKey: 'label',
		        /*  classNames: {
		              open: 'is-open',
		              empty: 'is-empty',
		              cursor: 'is-active',
		              suggestion: 'Typeahead-suggestion',
		              selectable: 'Typeahead-selectable'
		            },*/
		          hint: (App.isRTL() ? false : true),
		          source: custom.ttAdapter(),
		          templates: {
		        	empty: [
	        	            '<div class="media">',
		        	            '<div class="media-body">',
		                        '<h6 class="media-heading">没有找到相关数据</h6>',
		                    '</div>',
	        	            '</div>'
	        	           ].join(''),
		            suggestion: Handlebars.compile([
		              '<div class="media">',
		              		'{{#if avatar}}',
		                    '<div class="pull-left">',
		                        '<div class="media-object">',
		                            '<img src="{{avatar}}" width="50" height="50"/>',
		                        '</div>',
		                    '</div>',
		                    '{{/if}}',
		                    '{{#if title}}<div class="media-body">',
		                        '<h4 class="media-heading">{{title}}</h4>',
		                        '{{#if addon}}<p>{{addon}}</p>{{/if}}',
		                    '</div> {{/if}}',
		              '</div>',
		            ].join(''))
		          }
		        }).on('typeahead:selected', function (e, datum) {
		        	if(datum["value"] != null && datum["value"] != '' && datum["value"] != 'undefined'){
		        		$('#'+uid).val(datum["value"]);
		        	}
		        });
		        
		       $(document).on('keypress', '#'+uid, function(e) {
		            if(e.keyCode == 13) {            
		                e.preventDefault();
		                
		                var selectables = $('#'+uid).siblings(".tt-menu").find(".tt-selectable");
		                if (selectables.length > 0){
		                	$(selectables[0]).trigger('click');    
		                }
		                
		                $('#'+uid).typeahead('close');            
		            }
		        });
		        
		}
	}
	return new typeahead(name);
});