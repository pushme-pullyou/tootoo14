/* global POPdivPopup, navDragMove, POPdivHeader, divDragMoveContent, POPdivFooter, main, showdown */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


var POP = {
	"script": {

		"copyright": "Copyright 2019 pushMe-pullYou authors",
		"date": "2019-08-12",
		"description": "TooToo Menu (POP) generates standard HTML popup menu code and content and code that works on computers, tablets and phones",
		"helpFile": "https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-08/README.md",
		"license": "MIT License",
		"urlSourceCode": "https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-08/pop-popup",
		"version": "0.14.08-0pop"
	},
	"version": document.head.querySelector( '[ name=version ]' ).content,
	"date": document.head.querySelector( '[ name=date ]' ).content,

	license: "../../pages/license.md",
	txt: "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"

};


POP.footer =

	`<div >
		<button onclick=POP.requestFile(POP.popup,divDragMoveContent); title="Splash screen" >🏠</button>&nbsp;
		<button onclick=POP.requestFile(POP.license,divDragMoveContent); title="Copyright and license" >⚖️</button>&nbsp;
		<span id=POPspanInfo >v${ POP.version } - ${ POP.date }</span>
	</div>`;


POP.popup = "popup.md";


POP.init = function() {

	main.addEventListener( 'click', POP.onClickClose, false );
	main.addEventListener( 'touchstart', POP.onClickClose, false );

	const panel = document.body.querySelectorAll( "#navPanel");

	if ( panel && panel.length ) {

		navPanel.addEventListener( 'click', POP.onClickClose, false );
		navPanel.addEventListener( 'touchstart', POP.onClickClose, false );

	}

	//divDragMoveHeader.addEventListener( 'mousedown', DMV.onMouseDown, false );
	//window.addEventListener( 'mouseup', DMV.onMouseUp, false );

	//divDragMoveHeader.addEventListener( 'touchstart', DMV.onTouchStart, false );
	//divDragMoveHeader.addEventListener( 'touchmove', DMV.onTouchMove, false );

};



POP.setPopupShowHide = function( id = butPopupClose, text = POP.popup, footer = POP.footer, info ) {
	//console.log( 'info', info );

	POP.popupId = id;

	POP.popupId.classList.toggle( "active" );

	if ( POP.popupId.classList.contains( 'active' ) ) {

		//if ( divDragMoveContent.innerHTML === "" ) { POP.init(); }

		if ( text && text.toLowerCase().endsWith( ".md" ) ) {

			//navDragMove.style.height = "60%";
			POP.requestFile( text, divDragMoveContent );

		} else if ( text ) {

			divDragMoveContent.innerHTML = text;
			//navDragMove.style.height = "60%";
			navDragMove.hidden = false;

		} else {

			divDragMoveContent.innerHTML = "";
			navDragMove.hidden = true;

		}

		divDragMoveFooter.innerHTML = footer;

		POPspanInfo.innerHTML = info ? info : `v${POP.version} - ${POP.date}`;


	} else {

		POP.onClickClose();

	}

};



POP.onClickClose = function() {

	navDragMove.hidden = true;
	POP.popupId.classList.remove( "active" );
	divDragMoveContent.innerHTML = "";

	main.removeEventListener( 'click', POP.onClickClose );
	main.removeEventListener( 'touchstart', POP.onClickClose );

	const panel = document.body.querySelectorAll( "#navPanel");

	if ( panel && panel.length ) {

		navPanel.removeEventListener( 'click', POP.onClickClose);
		navPanel.removeEventListener( 'touchstart', POP.onClickClose );

	}

};



POP.requestFile = function( url, target ) {
	//console.log( '', url, target  );

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	//xhr.onerror = ( xhr ) => console.log( 'error:', xhr  );
	//xhr.onprogress = ( xhr ) => console.log( 'loaded', xhr.loaded );
	xhr.onload = ( xhr ) => POP.callbackMarkdown( xhr.target.response, target );
	xhr.send( null );

};



POP.callbackMarkdown = function( markdown, target ) {
	//console.log( 'markdown', markdown, target );

	showdown.setFlavor('github');
	const converter = new showdown.Converter();
	const html = converter.makeHtml( markdown );

	target.innerHTML = html;
	//console.log( 'html', html );

	navDragMove.hidden = false; // wait until loaded before showing

};

