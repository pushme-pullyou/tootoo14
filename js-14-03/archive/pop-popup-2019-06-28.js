/* global POPdivPopup, navPopup, POPdivPopupData, POPdivFooter, main, showdown */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const POP = {
	"script": {

		"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
		"date": "2019-06-25",
		"description": "TooToo Menu (POP) generates standard HTML popup menu code and content and code that works on computers, tablets and phones",
		"helpFile": "README.md",
		"version": "0.14.03-1pop",
		"urlSourceCode": "https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-03/pop-popup"
	},
	"version": document.head.querySelector( '[ name=version ]' ).content,
	"date": document.head.querySelector( '[ name=date ]' ).content
};




POP.getMenuDivPopup = function() {

	main.addEventListener( 'click', POP.onClickClose, false );
	main.addEventListener( 'touchstart', POP.onClickClose, false );

	POP.footer = `<p style=text-align:right;font-style:italic; >v${ POP.version } - ${ POP.date }</p>`;

	const htm =
	`
		<div style=text-align:right; ><button id=butPopClose onclick="POP.setPopupShowHide(butPopClose);" >×</button></div>

		<div id="POPdivPopupData" ></div>

		<div id="POPdivFooter" ></div>
	`;

	return htm;

};



POP.setPopupShowHide = function( id = POP.popupId, text = "", footer = POP.footer ) {
	//console.log( 'id', id );

	POP.popupId = id;

	POP.popupId.classList.toggle( "active" );

	if ( POP.popupId.classList.contains( 'active' ) ) {

		if ( POPdivPopup.innerHTML === "" ) { POPdivPopup.innerHTML = POP.getMenuDivPopup(); }

		if ( text &&  text.toLowerCase().endsWith( ".md" ) ) {

			POP.requestFile( text, POPdivPopupData );

		} else if ( text ) {

			POPdivPopupData.innerHTML = text;
			navPopup.hidden = false;

		} else {

			POPdivPopupData.innerHTML = text;
			navPopup.hidden = true;

		}

		POPdivFooter.innerHTML = footer;

		//main.addEventListener( 'click', POP.onClickClose, false );
		//main.addEventListener( 'touchstart', POP.onClickClose, false );

	} else {

		POP.onClickClose();

	}

};



POP.onClickClose = function() {

	navPopup.hidden = true;
	POP.popupId.classList.remove( "active" );
	POPdivPopupData.innerHTML = "";
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

	navPopup.hidden = false; // wait until loaded before showing

};
