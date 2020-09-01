// JavaScript Document

// gNav
var jsddm_timeout    = 500;
var jsddm_closetimer = 0;
var ddmenuitem = 0;

function jsddm_open() {
	jsddm_canceltimer();
	jsddm_close();
	
	$(this).addClass('hover');
	
	ddmenuitem = $(this).find('ul').css({'visibility': 'visible' });
	//ddmenuitem = $(this).find('ul').slideDown();
	/*
	var pt = $(this).offset().top;
	var pl = $(this).offset().left;
	
	ddmenuitem = $(this).find('ul').css({'visibility': 'visible', 'left': pl, 'top': pt+34 });
	*/
	
}

function jsddm_close() {
	if(ddmenuitem) {
		ddmenuitem.css('visibility', 'hidden');
	}
	//if(ddmenuitem) ddmenuitem.css('display', 'none');
}

function jsddm_timer() {
	$(this).removeClass('hover');
	jsddm_closetimer = window.setTimeout(jsddm_close, jsddm_timeout);
}

function jsddm_canceltimer() {
	if(jsddm_closetimer) {
		window.clearTimeout(jsddm_closetimer);
		jsddm_closetimer = null;
	}
}


$(function() {
	if($(window).width()<768)
		setTimeout(function(){
			var obj = new Object();
			obj.y = document.documentElement.scrollTop || document.body.scrollTop;
			if(obj.y<84) window.scrollTo(0,1);
		},100);


	// gNavでcurrが定義されているか
	//if( $('#listGNav > li').hasClass('curr') ) isCurr = true;
	
	// gNav
	$('#listGNav > li').bind('mouseover', jsddm_open);
	$('#listGNav > li').bind('mouseout',  jsddm_timer);

	
	
	$('#listGNav ul').css({'visibility': 'hidden' });
	//$('#listGNav ul').css({'display': 'none' });
	
	
	
	// 
	$('.tableData tr td:even, .tableData tr th:even').addClass('even');
	
	/*
	// sideMovie
	var flashvars = { my_url: 'https://www.plain60.jp/comp_area/p610022/flv_message/0000141/172945message_movie.flv&my_thumb=https://www.plain60.jp/comp_area/p610022/flv_message/0000141/172945message_img002.jpg' };
	//flashvars = { my_url: 'https://www.plain60.jp/comp_area/p610022/flv_message/0000131/112922message_movie.flv&my_thumb=https://www.plain60.jp/comp_area/p610022/flv_message/0000131/112922message_img001.jpg' };
	//flashvars = { my_url: 'https://www.plain60.jp/comp_area/p610022/flv_message/0000118/111548message_movie.flv&my_thumb=https://www.plain60.jp/comp_area/p610022/flv_message/0000118/111548message_img006.jpg' };
	//flashvars = { my_url: 'https://www.plain60.jp/comp_area/p610022/flv_message/0000089/152444message_movie.flv&my_thumb=https://www.plain60.jp/comp_area/p610022/flv_message/0000089/152444message_img002.jpg' };
	//flashvars = { my_url: 'https://www.plain60.jp/comp_area/p610022/flv_message/0000115/172616message_movie.flv&my_thumb=https://www.plain60.jp/comp_area/p610022/flv_message/0000115/172616message_img006.jpg' };
	var params = { menu: 'false', wmode: 'transparent' };
	var attributes = { };
	swfobject.embedSWF('https://www.plain60.jp/p610022/plain60_player.swf', 'movieArea', '100%', '100%', '9.0.115', '/flash/expressInstall.swf', flashvars, params, attributes);

	
	$('#movie').hover(function() {
		$('#titleMovie').hide();						   
	});
	*/
	
	
	$('#listGNav > li > a').click(function() {
		if( $(this).attr('href') == '#' ) 
			return false;
	});


	// Header の GA
	$('.listUtil a').on('click', function() {
		ga('send', 'event', 'util', 'Click', $(this).text());
	});


	
	// SocialTools
	var curl = $('link[rel=canonical]').attr('href') != undefined ? $('link[rel=canonical]').attr('href') : 'http://www.kitamura.co.jp/recruit/';
	//console.log(curl);
	$('.utilFB').html('<iframe src="//www.facebook.com/plugins/like.php?href='+curl+';send=false&amp;layout=button_count&amp;width=120&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:120px; height:21px;" allowTransparency="true"></iframe>');
	/*
	var ot = $('meta[property=og:title]').attr('content') != 'undefined' ? ('meta[property=og:title]').attr('content') : '(株)キタムラ採用情報';
	*/
	$('.utilTW').html('<a href="https://twitter.com/share" class="twitter-share-button" data-lang="ja" data-text="(株)キタムラ採用情報">Tweet</a>');
	
	
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
});