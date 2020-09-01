// JavaScript Document

$(function() {

	var ls = $('#v ul').cycle({
		fx: 'fade',
		speed: 1000,
		timeout: 3500,
		slides: '> li',
		loop: 1
	});

	// Header の GA (TOPページ版)
	$('.listEntry a').on('click', function() {
		ga('send', 'event', 'utill', 'Click', $(this).text());
	});



	/*
	if($(document).width()<480 ) {
		$('#w, #v, #v img').width($(document).width());
		$('#w, #v, #v img').height(353*$(document).width()/955);
	}
	
	var ls = $('#v ul').cycle({
		fx: 'fade',
		speed: 1000,
		timeout: 3500,
		activePagerClass: 'active',
		pager: '#slideSub ul',
		autostop: true
	});
	
	*/
	
	
	/*
	var wnHa = $('#news').height();
	var wnHb = 160;
	$('#news').height(wnHb).css({'overflow':'hidden'});
	
	$('#newsToggle').toggle(function() {
		$('#news').animate({ height: wnHa }, 500 );
		$(this).addClass('active');
		$(this).text('とじる');
		return false;					   
	}, function() {
		$('#news').animate({ height: wnHb }, 500 );
		$(this).removeClass('active');
		$(this).text('すべてみる');
		return false;	
	});
	*/
	
	
});