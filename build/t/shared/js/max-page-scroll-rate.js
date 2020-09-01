
ga(function() {
	var _uatrackers = ga.getAll();
	/*_uatrackers.forEach( function( t, index ) {
		console.log( 'tracker is find. index:', index, t.get( 'name' ), t.get( 'trackingId' ) );
	});*/
	var psr = 0, label = '0-19%';
	window.addEventListener( 'scroll', function() {
		var _psr = Math.floor( window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100 );
		if( psr>_psr ) return;
		else psr = _psr;
		
		if( psr<20 ) {
			label = '0-19%';
		} else if( psr<40 ) {
			label = '20-39%';
		} else if( psr<60 ) {
			label = '40-59%';
		} else if ( psr<80 ) {
			label = '60-79%';
		} else {
			label = '80-100%';
		}
	
		
	});
	window.addEventListener( 'unload', function() {
		// UA-UIDのtrackerだけ
		for( var i=0; i<_uatrackers.length; i++ ) {
			//console.log( 'trackId', _uatrackers[i].get( 'trackingId' ) );         
			if( _uatrackers[i].get( 'trackingId' ) === '{{UID}}' ) {
				ga( _uatrackers[i].get( 'name' )+'.send', 'event', {
					eventCategory: 'ページスクロール率',
					eventAction: 'max-psr',
					eventLabel: label,
					eventValue: psr,
					nonInteraction: true
				});
				break;
			}
		}

	});
	
});
