$(function (){

	$(".srch-btn").on('click', function(){
		console.log('hi1');
		var srchVal = $(this).parent().find('#srch-txt').val();
		var re = new RegExp(srchVal, 'gi');
		$.get('/search', function (data){
			console.log('h12');
			if(data.match(re)){
				console.log({desc});
			}
		});
	});
});