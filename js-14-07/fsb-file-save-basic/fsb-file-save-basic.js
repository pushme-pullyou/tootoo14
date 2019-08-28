"use strict";

/* globals JSZip*/
// jshint esversion: 6
// jshint loopfunc: true


const FSB = {

	"script": {

		"copyright": "Copyright 2019 pushMe pullYou authors",
		"date": "2019-08-12",
		"description": "Save data to text file or compressed in a ZIP file using the file save dialog box. Uses pkZip.js.",
		"license": "MIT License",
		"title": "File save basic FSB",
		"urlHelpFile":
"https://pushme-pullyou.github.io/tootoo14/js-14-07/fsb-file-save-basic/fsb-file-save-basic.md",
		"urlSourceCode":
"https://github.com/pushme-pullyou/tootoo14/blob/master/js-14-07/fsb-file-save-basic/fsb-file-save-basic.js",
		"version": "0.14.07-0fSb"

	}

};



FSB.getMenuFileSaveBasic = function() {

	if ( !FSB.zip ) {

		FSB.zip = document.body.appendChild( document.createElement( 'script' ) );
		FSB.zip.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js";

	}

	FSB.name = FOB.name || "test.txt";

	FSB.sourceContents = FOB.text || "Hello, World!";

	//FSB.target = targetHelpFile || document.body.appendChild( document.createElement( 'div' ) );

	const htm =
	`
	<details>

		<summary>Save data to file</summary>

		<button id=FSBbutHelp class=butHelp onclick="FSB.getHelp();" >?</button>

		<p>
			<button onclick=FSB.butSaveFile(); >Save file as text</button>
		</p>

		<p>
			<button onclick=FSB.butSaveFileZip(); >Save file as gbXML in ZIP</button>
		</p>

	</details>

	`;

	return htm;

};



FSB.getHelp = function() {

	const htm =
	`
		<h3>${ FSB.script.title }</h3>

		<p>${ FSB.script.description }</p>

	`;

	// <p>${ FSB.script.copyright }. ${ FSB.script.license }.</p>

	//FSB.target.innerHTML = htm;

	const info = `${ "source code".link( FSB.script.urlSourceCode ) } - v${ FSB.script.version } - ${ FSB.script.date }`;

	POP.setPopupShowHide( FSBbutHelp,`${ FSB.script.urlHelpFile }`, POP.footer, info );

};



FSB.butSaveFile = function() {

	//console.log( 'text', text );

	FSB.name = FOB.name || "test.txt";

	FSB.sourceContents = FOB.text || "Hello, World!";

	const blob = new Blob( [ FSB.sourceContents ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );

	a.download = FSB.name;
	a.click();
	a = null;

};



FSB.butSaveFileZip = function( text ) {

	FSB.name = FOB.name || "test.txt";

	FSB.sourceContents = FOB.text || "Hello, World!";

	const name = FSB.name.replace( /\.txt/i, ".zip" );
	const zip = new JSZip();

	zip.file( FSB.name, FSB.sourceContents );

	zip.generateAsync( { type:"blob", compression: "DEFLATE" } )

		.then( function( blob ) {

			let a = document.body.appendChild( document.createElement( 'a' ) );
			a.href = window.URL.createObjectURL( blob );
			a.download = name;
			a.click();
			a = null;

	} );

};