/* globals navMenu, showdown, divContents, FOBsecFileOpenBasic */
// jshint esversion: 6
/* jshint loopfunc: true */

const FOB = {

	"copyright": "Copyright 2019 pushMe pullYou authors. MIT License",
	"date": "2019-05-28",
	"helpFile": "fob-file-open-basic/README.md",
	"version": "0.14.1-2",
	"urlSourceCode": "https://github.com/pushme-pullyou/tootoo14/blob/master/js-14-1/fob-file-open-basic/fob-file-open-basic.js"

};

FOB.description =
	`
		TooToo File Open Basic (FOB) provides HTML and JavaScript to
		select, open and display local files using the file dialog box, drag and drop or URL.
	`;


FOB.urlDefaultFile = "../../js-14-1/fob-file-open-basic/README.md";

FOB.reader = new FileReader();
FOB.xhr = new XMLHttpRequest(); // declare now to load event listeners in other modules

FOB.regexImages = /\.(jpe?g|png|gif|webp|ico|svg|bmp)$/i;
FOB.regexHtml = /\.(htm?l)$/i;

FOB.contentsCss = `box-sizing: border-box; border: 1px solid #888; height: ${ window.innerHeight - 4 }px; margin: 0; padding:0; width:100%;`;


FOB.getMenuFileOpenBasic = function( target = divContents ) {  // called from main HTML file

	FOB.target = target;

	window.addEventListener ( 'hashchange', FOB.onHashChange, false );

	FOBdivFileOpenBasic.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
	FOBdivFileOpenBasic.addEventListener( 'drop', FOB.onDrop, false );


	const htm =
	`
		<details id=FOBdetFileOpen class=detSubMenu open >

			<summary>Open file
				<button id=butFOB class=butHelp onclick="MNU.setPopupShowHide(butFOB,FOB.helpFile);" >?</button>
			</summary>

			<div class="dragDropArea" >

				<p>
					<input type=file id=inpOpenFile onchange=FOB.onInputFileOpen(this);  >
				</p>
				<p>
					<button onclick=FOB.reloadFile(); >reload file</button>
				</p>
				<p>
					or drag & drop files here
					or enter a default file path <a class=helpItem href=https://www.ladybug.tools/spider/#pages/file-open.md title="Learn how to speed up your testing" target=-blank >?</a>
					<!--
						try this: 	https://www.ladybug.tools/spider/gbxml-sample-files/bristol-clifton-downs-broken.xml
					-->
					<input id=FOBinpFilePath onchange=FOB.updateDefaultFilePath(); style=width:95%; title='paste a file path or URL here then press Enter' >
				</p>

			</div>

			<details open >

				<summary>File open statistics</summary>

				<div id=FOBdivProgress ></div>

			</details>

		</details>
	`;

	return htm;

};



FOB.onHashChange = function() {

	const url = !location.hash ? FOB.urlDefaultFile : location.hash.slice( 1 );
	//console.log( 'url', url );

	FOB.requestFile( url );

};



FOB.requestFile = function( url ) { // from a button
	//console.log( 'url', url );

	FOB.name = url.split( '/').pop();

	aViewSource.href = MNU.urlSourceCode + "blob/master/" + url;

	if ( FOB.regexHtml.test( url ) ) {

		FOB.target.innerHTML = `<iframe src=${ url } style="${ FOB.contentsCss }" ></iframe>`;

	} else if ( FOB.regexImages.test( url )  ) {

		FOB.target.innerHTML = `<img src=${ url } >`;

	} else if ( FOB.name.toLowerCase().endsWith( '.xml' ) ) {

		FOB.xhr.addEventListener( 'load', FOB.callbackDecider, false );
		FOB.requestFileText( url );

	} else if ( FOB.name.toLowerCase().endsWith( '.zip' )) {

		FOB.xhrRequestFileZip( url, FOB.callbackUrlUtf16 );


	} else { // let

		FOB.xhr.addEventListener( 'load', FOB.callbackDecider, false );
		FOB.requestFileText( url );

	}

};



FOB.requestFileText = function( url ) {

	FOB.timeStart = performance.now();

	FOB.xhr.open( 'GET', url, true );
	FOB.xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	FOB.xhr.onprogress = function( xhr ) { FOB.onProgress( xhr.loaded, FOB.note ); };
	FOB.xhr.onload = function( xhr ) { FOB.onProgress( xhr.loaded ); };
	FOB.xhr.send( null );

};



FOB.onInputFileOpen = function( files ) {

	FOB.files = files;
	FOB.timeStart = performance.now();

	const file = files.files[ 0 ];

	const type = file.type;
	//console.log( 'type', type );

	//FOB.reader.addEventListener( 'load', FOB.onReaderResult, false );

	FOB.reader.onload = function( event ) {
		//console.log( 'FOB.reader', FOB.reader );

		const name = file.name.toLowerCase();

		if ( name.endsWith('.md' ) ) {

			FOB.callbackMarkdown( FOB.reader.result );

		} else if ( FOB.regexImages.test( file.name )  ) {

			FOB.target.innerHTML = `<img src=${ FOB.reader.result } >`;

		} else if ( FOB.regexHtml.test( file.name ) ) { // html mucks things up

			//FOB.target.innerHTML = `<iframe srcdoc="${ FOB.reader.result }" style=${ FOB.contentsCss } ></iframe>`;

			//FOB.target.innerText = FOB.reader.result;

			FOB.callbackOtherToTextarea( FOB.reader.result );

		} else if ( type === "application/x-zip-compressed" ) {

			FOB.fileOpenZip( files );

		} else {

			FOB.callbackOtherToTextarea( FOB.reader.result );

		}

	};

	if ( FOB.regexImages.test( file.name ) ) {

		FOB.reader.readAsDataURL( file );

	} else {

		FOB.reader.readAsText( file );

	}

		//function onRequestFileProgress( event ) {

			//divLog.innerHTML =
			//	fileAttributes.name + ' bytes loaded: ' + event.loaded.toLocaleString() +
			//	//( event.lengthComputable ? ' of ' + event.total.toLocaleString() : '' ) +
			//'';

		//}

};



FOB.reloadFile = function() {

	FOB.onInputFileOpen( FOB.files );

};



FOB.onDrop = function( event ) {

	console.log( '', event );

	const dropUrl = event.dataTransfer.getData( 'URL' );

	if ( dropUrl ) {

		FOB.requestFile( dropUrl );

	} else {

		FOB.openFile( event.dataTransfer );

	}

	event.preventDefault();

};



FOB.onProgress = function( size = 0, note = '' ) {

	const timeToLoad = ( performance.now() - FOB.timeStart ).toLocaleString();

	let htm =
	`
		<div style="padding: 1rem 0;" >
			<div style=padding:0; >File name:</div>
			<div style=color:blue;padding:0; >${ FOB.name }</div>
			<div style=padding:0; >bytes loaded: ${ size.toLocaleString() }</div>
			<div style=padding:0; >time to load: ${ timeToLoad }ms</div>
			${ note }
		</div>
	`;

	FOBdivProgress.innerHTML = htm;

};

//////////

FOB.callbackDecider = function ( xhr ) {
	//console.log( 'xhr', xhr );

	const ulc = xhr.target.responseURL.toLowerCase();

	if ( ulc.endsWith( '.md' ) ) {

		FOB.callbackMarkdown( xhr.target.response );

	} else if ( ulc.endsWith( '.json' ) ) {

			FOB.callbackJson( xhr.target.response );

	} else {

		FOB.callbackOtherToTextarea( xhr.target.response );

	}

};



FOB.callbackMarkdown = function( markdown ) {

	showdown.setFlavor('github');
	const converter = new showdown.Converter();
	const html = converter.makeHtml( markdown );

	FOB.target.innerHTML = html;
	window.scrollTo( 0, 0 );

};



FOB.callbackJson = function( html ) {

	//const data = obj.target ? obj.target.response : obj;

	FOB.target.innerHTML = html;
	window.scrollTo( 0, 0 );

};



FOB.callbackOtherToTextarea = function( text ){

	FOB.target.innerHTML = `<textarea style="${ FOB.contentsCss }" >${ text }</textarea>`;

};



FOB.updateDefaultFilePath = function() {

	location.hash = FOBinpFilePath.value;

	const thrFilePath = FOBinpFilePath.value;
	localStorage.setItem( 'thrFilePath', thrFilePath );

};


//////////

FOB.xhrRequestFileZip = function( url ) {

	FOB.timeStart = performance.now();

	const xhr = new XMLHttpRequest();
	xhr.responseType = 'blob';
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr ); };
	xhr.onprogress = function( xhr ) { FOB.onProgress( xhr.loaded, FOB.note ); };
	xhr.onload = FOB.callbackUrlUtf16;
	xhr.send( null );

};



FOB.callbackUrlUtf16 = function( xhr ) {

	const response = xhr.target.response;
	//console.log( 'response', response );

	const zip = new JSZip();
	const names = [];

	zip.loadAsync( response )

	.then( function( zip ) {
		//console.log( 'zip', zip );

		zip.forEach( ( relativePath, zipEntry ) => names.push( zipEntry.name ) );

		// Read first file from the zip file!
		const uint8array = zip.file( names[ 0 ] ).async( "uint8array" );
		//console.log( 'names[ 0 ]', names[ 0 ] );

		FOB.name = names[ 0 ];

		return uint8array;

	} )

	.then( function( uint8array ) {
		//console.log( 'uint8array', uint8array[ 0 ] );

		let text = '';

		if ( uint8array[ 0 ] !== 255 ||  uint8array[ 0 ] === 239 || uint8array[ 0 ] === 60 ) {

			text = new TextDecoder( "utf-8" ).decode( uint8array );
			//console.log( 'text', text );

		} else {

			const arr = new Uint8Array( uint8array.length / 2 );
			let index = 0;

			// console.log( 'uint8array', uint8array );

			for ( let i = 0; i < uint8array.length; i++ ) {

				if ( i % 2 === 0 ) {

					arr[ index++ ] = uint8array[ i ];

				}

			}
			//console.log( 'arr', arr );

			text = new TextDecoder( "utf-8" ).decode( arr );

		}
		//console.log( 'text', text );

		return text;

	} )

	.then(

		function success( text) {

			FOB.text = text;

			const event = new Event( 'onZipFileParse' );

			document.body.addEventListener( 'onZipFileParse', FOB.onFileZipLoad, false );

			document.body.dispatchEvent( event );

			FOB.onProgress( text.length, "load complete" );

		},

		function error( e ) { FILdivProgress.append( `error ${ e } ` ); }

	);

};






FOB.fileOpenZip = function( files ) {
	//console.log( 'files', files.files[0] );

	const zip = new JSZip();
	const decoder = new TextDecoder( "utf-8" );
	const names = [];

	zip.loadAsync( files.files[ 0 ] )

	.then( zip => {
		//console.log( 'zip', zip );

		zip.forEach( ( relativePath, zipEntry ) => names.push( zipEntry.name ) );
		FOB.name = names[ 0 ];
		console.log( 'FOB.name', FOB.name );

		const arrTemp = zip.files[ FOB.name].async(
			"uint8array",
			metadata => FOB.onProgress( metadata.percent.toFixed(2) + '%', FOB.note )
		);

		return arrTemp;

	}, ( err ) =>  FILdivProgress.innerHTML += err.message )

	.then( ( uint8array ) => {
		//console.log( 'uint8array', uint8array );

		if ( uint8array[ 0 ] !== 255 ||  uint8array[ 0 ] === 239 || uint8array[ 0 ] === 60 ) {

			FOB.text = decoder.decode( uint8array );

		} else {

			let arr = new Uint8Array( uint8array.length / 2 );
			let index = 0;

			for ( let i = 0; i < uint8array.length; i++ ) {

				if ( i % 2 === 0 ) { arr[ index++ ] = uint8array[ i ]; }

			}

			FOB.text = decoder.decode( arr );

		}


		FOB.onProgress( FOB.text.length, "load complete" ); // creates event

		const event = new Event( 'FOBonZipFileLoad' );

		document.body.addEventListener( 'FOBonZipFileLoad', FOB.onFileZipLoad, false );

		document.body.dispatchEvent( event );


	} );

};


FOB.onFileZipLoad = function() {

	console.log( 'bytes', FOB.text.length );

};