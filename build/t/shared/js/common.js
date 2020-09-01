$(function() {
	
	/*! http://qiita.com/tonkatu_tanaka/items/472ec6055dcf9c4110b1 */
	// ユーザーエージェントを取得しclassを付与
	function addUA() {
		$('html').removeClass(function(index, className) {
			return (className.match(/\bua-\S+/g) || []).join(' ');
		});
		var agent       = navigator.userAgent; // ユーザーエージェント
		var htmlElement = document.documentElement; // html要素
		if (navigator.platform.search("Mac") != -1) { htmlElement.className += ' ua-mac'; } if(agent.search("Windows") != -1){ htmlElement.className += ' ua-win'; if((agent.search("Trident") != -1) || ((agent.search("MSIE") != -1))) { htmlElement.className += ' ua-ie'; if(agent.search("Trident") != -1) { htmlElement.className += ' ua-gte_ie8'; } if(agent.search("Trident") == -1) { htmlElement.className += ' ua-lte_ie8'; } if(agent.search("MSIE 7") != -1){ htmlElement.className += ' ua-ie7'; } if(agent.search("MSIE 8") != -1){ htmlElement.className += ' ua-ie8'; } if(agent.search("MSIE 9") != -1){ htmlElement.className += ' ua-ie9'; } if(agent.search("MSIE 10") != -1){ htmlElement.className += ' ua-ie10'; } if(agent.search("Trident/7") != -1){ htmlElement.className += ' ua-ie11'; } } } if((agent.search("Chrome") != -1) && (agent.search("OPR") == -1)){ htmlElement.className += ' ua-chrome'; } if((agent.search("Safari") != -1) && (agent.search("Chrome") == -1) && (agent.search("OPR") == -1) && (agent.search("Presto") == -1)) { htmlElement.className += ' ua-safari'; } if(agent.search("Firefox") != -1) { htmlElement.className += ' ua-firefox'; } if(agent.search("iPad") != -1){ htmlElement.className += ' ua-ipad'; } if(agent.search("iPhone") != -1){ htmlElement.className += ' ua-iphone'; } if(agent.search("Android") != -1){ htmlElement.className += ' ua-android'; } if(agent.toLowerCase().search("mobile") != -1){ htmlElement.className += ' ua-mobile'; }
	}
	$(window).on( 'resize', function() {
		addUA();
	});
	$(window).trigger( 'resize' );
	
	// スクロール
	var header_h = $('header').height();
	function addScrolled() {
		if( $(this).scrollTop() > Math.floor( $('header').height()*.5 ) ) {
			$('body').addClass( 'scrolled' );
		}
		else {
			$('body').removeClass( 'scrolled' );	
		}
	}
	$(document).on('scroll', addScrolled );
	addScrolled();

	// メニュー開閉	
	$('.btn-menu').on('click', function() {
		$('body').toggleClass('menu-open');
	});
	
	$('.btn-menu a').removeAttr( 'href' );
		
	/*$(window).on('hashchange', function() {
		console.log( 'hashchange' );
	});*/

	
	// ページトップへ
	$('#goto-top').on('click', function() {
		$(document).off('scroll', addScrolled);
		$('html,body').animate({
			scrollTop: 0
		}, 250, 'linear', function() {
			$(document).on('scroll', addScrolled);
		});
		
		return false;
	});
	
	// パンくず複製
	$('.breadcrumb').clone().appendTo( $('.breadcrumb').parent() );
	
	
	// メニューのactive
	if( window.location.toString().split('/').length>3 ) {
		$('#menu > li > a').each(function() {
			if( $(this).attr('href').split('/')[1] === window.location.toString().split('/')[3] ) {
				$(this).parent().addClass('active');
				return false;
			}
		});
		
		$('main nav li > a').each(function() {
			if( $(this).attr('href').replace(/\.html(.*)/i, '.html') === window.location.pathname ) {
				$(this).parent().addClass('active');	
			}
		});
		
		$('.aside li > a').each(function() {
			if( $(this).attr('href').replace(/\.html(.*)/i, '.html') === window.location.pathname ) {
				$(this).parent().addClass('active');	
			}
		});
		
	}
	
	
	$('#menu > li > a').on( 'click', function() {
		var current = $(this).parent();
		var is_current = false;
		if( $(current).hasClass( 'active' ) ) is_current = true;
		
		if( $('html').hasClass( 'ua-mobile' ) && $('body').hasClass( 'menu-open' ) && $(this).parent().find( 'ul' ).length>0 ) {
			$('#menu > li').removeClass( 'active' );
			if( is_current ) $(current).addClass( 'active' );
			$(current).toggleClass( 'active' );
			return false;
		}
	});

});