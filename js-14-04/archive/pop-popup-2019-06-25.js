/* global Stats, POPbutRateLimits, navPopup, POPdivPopupData, main, showdown */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const POP = {
	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-06-22",
	"description": "TooToo Menu (POP) generates standard HTML TooToo menu code and content and code that works on computers, tablets and phones",
	"helpFile": "README.md",
	"version": "0.14.02-1",
	"urlSourceCode": "https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-02/pop-popup"
};




POP.getMenuDivPopup = function() {

	const version = document.head.querySelector( '[ name=version ]' ).content;

	const date = document.head.querySelector( '[ name=date ]' ).content;

	const htm =
	`
		<div style=text-align:right; ><button id=butPopClose onclick="POP.setPopupShowHide(butPopClose);" >×</button></div>

		<div id="POPdivPopupData" ></div>

		<div id="POPdivMessage" ><p>R${ version } - ${ date }</p></div>
	`;

	return htm;

};



POP.setPopupShowHide = function( id = POP.popupId, text = "" ) {
	//console.log( 'id', id );

	//if ( id ) {

		POP.popupId = id;

		POP.popupId.classList.toggle( "active" );

	//}


	if ( POP.popupId.classList.contains( 'active' ) ) {

		if ( POPdivPopup.innerHTML === "" ) { POPdivPopup.innerHTML = POP.getMenuDivPopup(); }

		if ( text &&  text.toLowerCase().endsWith( ".md" ) ) {

			POP.requestFile( text, POPdivPopupData );

		} else {

			POPdivPopupData.innerHTML = text;
			navPopup.hidden = false;

		}

		main.addEventListener( 'click', POP.onClickClose, false );
		main.addEventListener( 'touchstart', POP.onClickClose, false );

	} else {

		POP.onClickClose();

	}

};



POP.onClickClose = function() {

	//if ( POP.popupId.classList.contains( 'active' ) === false ) {

		navPopup.hidden = true;
		POP.popupId.classList.remove( "active" );
		POPdivPopupData.innerHTML = "";
		main.removeEventListener( 'click', POP.onClickClose, false );
		main.removeEventListener( 'touchstart', POP.onClickClose, false );

	//}

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
	//console.log( '', html );

	//window.scrollTo( 0, 0 );

	navPopup.hidden = false;

};
