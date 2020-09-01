$(function(){
	$(window).load(function(){
	if(!widesp){
		$('.box-inner').autoHeight({column:4});
	}else{
		$('.box-inner').autoHeight({column:2});
	}
	});
	$(window).resize(function(){
		$('.box-inner').attr('style','');
		if(!widesp){
			$('.box-inner').autoHeight({column:4});
		}else{
			$('.box-inner').autoHeight({column:2});
		}
	});
});

