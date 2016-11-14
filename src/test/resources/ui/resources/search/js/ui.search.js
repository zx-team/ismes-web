ui.registerComponent("search",function(name){
	function Search($search) {
		this.$search = $search;
	}
	Search.prototype = {
		init:function(custom) {
		        custom.initialize();
		        this.$search.typeahead(null, {
		          name: this.$search.attr('id'),
		          displayKey: 'label',
		          classNames: {
		              open: 'is-open',
		              empty: 'is-empty',
		              cursor: 'is-active',
		              suggestion: 'Typeahead-suggestion',
		              selectable: 'Typeahead-selectable'
		            },
		          hint: true,
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
		        		$("#"+this.$search).val(datum["value"]);
		        	}
		        });
		},
		
		custom:function(uid, curl){
			var custom = new Bloodhound({
		          datumTokenizer: function (datum) {
		              return Bloodhound.tokenizers.whitespace(datum.value);
		          },
		          queryTokenizer: Bloodhound.tokenizers.whitespace,
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
		          this.$search.attr("dir", "rtl");  
		        }  
		        this.$search.typeahead(null, {
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
		        		this.$search.val(datum["value"]);
		        	}
		        });
		        
		      
		        
		}
	}
	var $search = $("#"+name);
	if($search.length!=1) {
		throw new Error("ui.search(name): Can't find valid DOM element by the name!");
	}
	var data = $search.data("ui.search");
	if(!data) {
		data = new Search($search);
		$search.data("ui.search",data);
	}
	return data;
});