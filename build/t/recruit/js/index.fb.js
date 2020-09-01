$(function() {
	/*
	$.ajax({
		type: 'GET', url: 'http://graph.facebook.com/kitamurasaiyo', dataType: 'jsonp', success:
		function(data) {
			$('#FB-ST').append('<p><a href="'+data.link+'" target="_blank"><img src="'+data.cover.source+'" width="150" alt="" class="fbProfile" /></a>'+data.likes+'人が <a href="'+data.link+'" target="_blank">キタムラ／スタジオマリオ新卒採用Facebookページ</a> について「いいね！」と言っています。</p>');
	
		}
	});
	*/
	var replaceURL = function(url){
		url = url.replace(/(\/l.php\?u=http%3A%2F%2F)([\x21-\x7e]+)(&amp;h=[\x21-\x7e]+&amp;s=1)/gi,'http://$2');
		return unescape(url);
	};
	
	/*
	$.getJSON(
		 'http://ajax.googleapis.com/ajax/services/feed/load?callback=?',
		 {
			  q: 'http://www.facebook.com/feeds/page.php?id=190505454331215&format=rss20&'+new Date().getDate(),
			  //q: 'http://www.facebook.com/feeds/page.php?id=190505454331215&format=rss20',
			  v: '1.0',
			  num: 10,
			  cache: false
		 },
		 function (data) {
			$('#FB-Feed').append('<ul></ul>');
				$.each(data.responseData.feed.entries, function(i, item){
					$('#FB-Feed ul').append('<li>' + replaceURL(item.content) + '</li>');
			});
			
			$('#FB-Feed ul li').each(function(i) {
				var img = $(this).find('img').remove();
				var current = $(this);
				if( $(img).attr('src') != undefined ) {

					var img2 = $('<img />').error(function() {
						$(this).attr('src', $(img).attr('src'));
					}).attr({
						'src': $(img).attr('src').replace('s130x130/', '')
					});
					
					$(this).prepend( img2 );
					
				}
				else
					$(this).prepend(img);

				//$(this).prepend(img);
			});
			
			// SPの場合はもっとみる
			if( $(window).width()<1024 ) {
				var h = $('#FB-Feed').innerHeight();
				var cn = 1;
				var hn = $('#FB-Feed ul li:nth-child(1)').innerHeight();
				
				$('#FB-Feed').css({ 'overflow': 'hidden', 'height': hn});
				$('#FB-Feed').after('<p id="FB-More">もっと見る</p>');
				
				$('#FB-More').click(function() {
					cn++;
					if( cn>9 ) {
						$('#FB-More').hide();
						$('#FB-Feed').css({ 'background': 'none'})
					}
					
					hn += $('#FB-Feed ul li:nth-child('+cn+')').innerHeight();
					$('#FB-Feed').animate({ 'height': hn }, 750 );
					
				});
			}
			
			
		 }
	);
	
	*/
});