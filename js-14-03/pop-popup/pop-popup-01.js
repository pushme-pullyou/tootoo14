/* global POPdivPopup, navDragMove, POPdivHeader, divDragMoveContent, POPdivFooter, main, showdown */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const POP = {
	"script": {

		"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
		"date": "2019-06-30",
		"description": "TooToo Menu (POP) generates standard HTML popup menu code and content and code that works on computers, tablets and phones",
		"helpFile": "README.md",
		"version": "0.14.03-3pop",
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

	POP.footer =

		`<div ><span id=POPspanFooter >v${ POP.version } - ${ POP.date } </span><button onclick=POP.setNextPopup(-1); style=width:2rem;background:#edd; >&laquo;</button>&nbsp;<button onclick=POP.setNextPopup(0); style=width:2rem;background:#ded;>&#x2302;</button>&nbsp;<button onclick=POP.setNextPopup(); style=width:2rem;background:#dde;>&raquo;</button>
		</div>`;



	const txt = "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?";

	const htm = ""

	// `
	// 	<div id=divDragMoveHeader >
	// 		<span title="${ txt }" >&#x2766;</span>
	// 		<div style=float:right; ><button id=butPopupClose onclick="POP.setPopupShowHide(butPopupClose);" >&times;</button></div>
	// 	</div>

	// 	<div id="divDragMoveContent" ></div>

	// 	<div id="divDragMoveFooter" ></div>
	//`;

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

	target.innerHTML = html + html;
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




