;
var sp = false;
var widesp = false;
var scTop = 0;
$(function(){
	var ua = navigator.userAgent;
	var sp = false;
	if (ua.indexOf('iPhone') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0) {
		sp = true;
	}

	spcheck();
	$(window).on("load resize", spcheck);
	function spcheck(){
		var WW = (window.innerWidth) ? window.innerWidth : document.body.clientWidth;
		if(WW <= 767){
			//スマホ
			widesp = true;
		}
		else{
			widesp = false;
		}
	}
	/*
	$('a[href^=#]').not('.nomove').click(function() {
		var speed = 400;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top - 50;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
	*/

	$(window).scroll(function () {
		scTop = $(window).scrollTop();

		if (scTop > 200) {
			$('.pagetop').fadeIn();
		} else {
			$('.pagetop').fadeOut();
		}
	});
	
	$('.pagetop').click(function () {
		$('body, html').animate({ scrollTop: 0 }, 500);
		return false;
	});

	/* SP 
	--------------------*/
	var scTemp;
	$('#sp-nav, #nav-close').click(function(){
		if(!sp) return false;
		if($('#header .inner').hasClass('active')){
		}else{
			openCheck();
		}
		$('#nav').slideToggle('fast',function(){
			var hh = window.innerHeight ? window.innerHeight : $(window).height();
			if($('#header .inner').hasClass('active')){
				$('#header .inner').css({'height':50}).removeClass('active');
				$('#wrapper').css({'position':'static'});
				$(window).scrollTop(scTemp);
				$('#header-bg').hide();
			}else{
				$('#header .inner').css({'height':hh}).addClass('active');
				scTemp = scTop;
				$('#wrapper').css({'position':'fixed', 'top':scTop*-1});
				$('#header-bg').show();
			}
		});
		$('#entry-box').attr('style','');
	});
	
//	$('.sn > a').not('.link').click(function(){
	$('.sn > a').click(function(){
		if(!sp) return false;
		$(this).parent().find('ul').not(":animated").slideToggle('fast');
		if($(this).hasClass('open')){
			$(this).removeClass('open');
		}else{
			$(this).addClass('open');
		}
	});
	
	function openCheck(){
		$('#nav > ul li.current ul').slideDown(0);
		$('#nav > ul li.current a').addClass('open');
	}
	
	/* PC 
	--------------------*/
	var snID;
	$('.sn').hover(function(){
		if(sp) return false;
		clearTimeout(snID);
		$(this).find('ul').not(":animated").slideDown('fast');
		$(this).addClass('active');
	},function(){
		if(sp) return false;
		$(this).find('ul').stop().slideUp(0);
		$(this).removeClass('active');
	});
	
	var entryID;
	$('#entry').hover(function(){
		if(sp) return false;
		clearTimeout(entryID);
		$('#entry-box').not(":animated").slideDown('fast');
	},function(){
		if(sp) return false;
		entryID = setTimeout(function(){
			$('#entry-box').stop().slideUp(0);
		},200);
	});
	$('#entry-box').hover(function(){
		if(sp || widesp) return false;
		clearTimeout(entryID);
	},function(){
		if(sp || widesp) return false;
		entryID = setTimeout(function(){
			$('#entry-box').stop().slideUp(0);
		},200);
	});
	
	$(window).resize(function(){
		checkSize();
		if(sp || widesp) return false;
		$('#nav').slideUp(0).attr('style','');
		$('#nav ul ul').slideToggle(0).attr('style', '');

		$('#header .inner').css({'height':'auto'}).removeClass('active');
		$('#wrapper').css({'position':'static'});
		if(scTemp > 0){
			$(window).scrollTop(scTemp);
			scTemp = -1;
		}
		$('#header-bg').hide();
	});

	checkSize();
	function checkSize(){
	    if ($("#sp-nav").css("display") == "block" ){
			sp = true;
	    }else{
			sp = false;
		}
	}
});

