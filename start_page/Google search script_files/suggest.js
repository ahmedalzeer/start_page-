$.fn.googleSuggest = function(opts){
  opts = $.extend({service: 'web', secure: false}, opts);

  var services = {
    youtube: { client: 'youtube', ds: 'yt' },
    books: { client: 'books', ds: 'bo' },
    products: { client: 'products-cc', ds: 'sh' },
    news: { client: 'news-cc', ds: 'n' },
    images: { client: 'img', ds: 'i' },
    web: { client: 'psy', ds: '' },
    recipes: { client: 'psy', ds: 'r' }
  }, service = services[opts.service];
  opts.minLength = 1;
  opts.source = function(request, response){
    $.ajax({
      url: 'https://clients1.google.com/complete/search',
      dataType: 'jsonp',
      data: {
        q: request.term,
        nolabels: 't',
        client: service.client,
        ds: service.ds
      },
      success: function(data) {
		uquery = data[1][0].toString();
		tquery = uquery.split(",0");
		query_prediction = tquery[0];
		query_prediction = query_prediction.replace('<b>','');
		query_prediction = query_prediction.replace('</b>','');
		query_prediction = query_prediction.replace('\u003cb\u003e','');
		$("#sug").html(query_prediction);
		if(query_prediction!="undefined" && query_prediction!=query){
			set_query(query_prediction);
			if(query_prediction.indexOf($("#q").val())>-1){
				if($("#q").val()!=""){
					ps = setTimeout("fs=0; set_query(query_prediction); search(0);",200);
				}
			}
		}
		else if(query_prediction=="undefined"){
			set_query("");
		}
        response($.map(data[1], function(item){
          return { value: $("<span>").html(item[0]).text() };
        }).slice(0, 4));
      }
    });  
  };
  
  return this.each(function(){
    $(this).autocomplete(opts);
  });
}
