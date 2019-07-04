/* global POPdivPopup, navDragMove, POPdivHeader, divDragMoveContent, POPdivFooter, main, showdown */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const POP = {
	"script": {

		"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
		"date": "2019-07-03",
		"description": "TooToo Menu (POP) generates standard HTML popup menu code and content and code that works on computers, tablets and phones",
		"helpFile": "README.md",
		"version": "0.14.04-0pop",
		"urlSourceCode": "https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-03/pop-popup"
	},
	"version": document.head.querySelector( '[ name=version ]' ).content,
	"date": document.head.querySelector( '[ name=date ]' ).content,

	page: 0,
	listenersLoaded: false

};



POP.getMenuDivPopup = function() {

	main.addEventListener( 'click', POP.onClickClose, false );
	main.addEventListener( 'touchstart', POP.onClickClose, false );

	divDragMoveHeader.addEventListener( 'mousedown', DMV.onMouseDown, false );
	window.addEventListener( 'mouseup', DMV.onMouseUp, false );

	divDragMoveHeader.addEventListener( 'touchstart', DMV.onTouchStart, false );
	divDragMoveHeader.addEventListener( 'touchmove', DMV.onTouchMove, false );


	POP.footer =

		`<div >
			<button onclick=POP.requestFile("../popup-dev.md",divDragMoveContent); style=width:2rem;background:#ded;>🏠</button>&nbsp;
			<button onclick=POP.requestFile("https://pushme-pullyou.github.io/pages/license.md",divDragMoveContent);; style=width:2rem;background:#dde;>⚖️</button>
			<span id=POPspanFooter >v${ POP.version } - ${ POP.date } </span
		</div>`;



	const txt = "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?";

	const htm = "";

	return htm;

};



POP.setPopupShowHide = function( id = POP.popupId, text = "", footer = POP.footer ) {
	//console.log( 'id', id );

	POP.popupId = id;

	//if ( POP.listenersLoaded === false ) { POP.init(); }

	POP.popupId.classList.toggle( "active" );

	if ( POP.popupId.classList.contains( 'active' ) ) {

		if ( divDragMoveContent.innerHTML === "" ) { divDragMoveContent.innerHTML = POP.getMenuDivPopup(); }

		if ( text &&  text.toLowerCase().endsWith( ".md" ) ) {

			POP.requestFile( text, divDragMoveContent );

		} else if ( text ) {

			divDragMoveContent.innerHTML = text;
			navDragMove.hidden = false;

		} else {

			divDragMoveContent.innerHTML = text;
			navDragMove.hidden = true;

		}

		divDragMoveFooter.innerHTML = footer;

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

};



POP.requestFile = function( url, target ) {

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	//xhr.onerror = ( xhr ) => console.log( 'error:', xhr  );
	//xhr.onprogress = ( xhr ) => console.log( 'loaded', xhr.loaded );
	xhr.onload = ( xhr ) => POP.callbackMarkdown( xhr.target.response, target );
	xhr.send( null );

};



POP.callbackMarkdown = function( markdown, target ) {
	//console.log( '', markdown );

	showdown.setFlavor('github');
	const converter = new showdown.Converter();
	const html = converter.makeHtml( markdown );

	target.innerHTML = html;
	//console.log( 'html', html );

	navDragMove.hidden = false; // wait until loaded before showing

};

//////////

POP.setNextPopup = function( x = 1 ){

	let url;

	if ( x === 0 ) {

		url = "../popup.md";

	} else {

		const pages = [ "about-tootoo.md", "license.md", "contributing.md", "coding-style.md" ];
		POP.page += x;
		POP.page = POP.page >= pages.length ? 0 : POP.page;
		POP.page = POP.page < 0 ? pages.length - 1 : POP.page;

		const page = pages[ POP.page ];

		url = "https://pushme-pullyou.github.io/tootoo14/pages/" + page;
	}

	POP.requestFile( url, divDragMoveContent );

};






const DMV = {

	draggableLeft: 0,
	draggableTop: 0,

	draggableStartX: 0,
	draggableStartY: 0

};



DMV.onMouseDown = function( event ) {

	console.log( '', 23 );
	DMV.draggableTop = event.clientY - navDragMove.offsetTop;
	DMV.draggableLeft = event.clientX - navDragMove.offsetLeft;

	window.addEventListener('mousemove', DMV.onMouseMove, true );

};



DMV.onMouseMove = function( event ){

	navDragMove.style.top = ( event.clientY - DMV.draggableTop ) + 'px';
	navDragMove.style.left = ( event.clientX - DMV.draggableLeft ) + 'px';

};



DMV.onMouseUp = function() {

	window.removeEventListener( 'mousemove', DMV.onMouseMove, true );

};



DMV.onTouchStart = function( event ){

	DMV.draggableLeft = navDragMove.offsetLeft;
	DMV.draggableStartX = event.changedTouches[ 0 ].clientX;
	DMV.draggableTop = navDragMove.offsetTop;
	DMV.draggableStartY = event.changedTouches[ 0 ].clientY;
	//console.log( 'draggableTop', draggableTop, draggableStartY );
	event.preventDefault();

	console.log ('Status: touchstart', 'ClientX: ' + DMV.draggableStartX + 'px' );

};



DMV.onTouchMove = function( event ){

	const distX = event.changedTouches[ 0 ].clientX - DMV.draggableStartX;
	let left = DMV.draggableLeft + distX > document.body.clientWidth - 100 ?
		document.body.clientWidth - 100 : DMV.draggableLeft + distX;
	left = DMV.draggableLeft + distX < 0 ? 0 : left;
	//console.log( 'left2', left  );

	navDragMove.style.left = left + 'px';

	const distY = event.changedTouches[ 0 ].clientY - DMV.draggableStartY;
	// top is a reserved word

	let ttop = DMV.draggableTop + distY > window.innerHeight - 100 ?
		window.innerHeight - 100 : DMV.draggableTop + distY;
	ttop = DMV.draggableTop + distY < 0 ? 0 : ttop;
	//console.log( 'ttop', ttop  );

	navDragMove.style.top = ttop + 'px';

	event.preventDefault();

};