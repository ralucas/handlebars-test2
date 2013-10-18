$(function (){
	var source   = $("#search-template").html();
	var template = Handlebars.compile(source);
	var results = $('#results');

	$(".srch-btn").click( function(){
		var srchVal = $(this).parent().find('#srch-txt').val();
		var re = new RegExp(srchVal, 'gi');
		
		$.get('/search', {key : srchVal}, function (data){
			results.html(template(data));
		});
	});
});
