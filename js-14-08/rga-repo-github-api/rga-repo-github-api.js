/* globals */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const RGA = {

	"script": {

		"copyright": "Copyright 2019 pushMe-pullYou authors.",
		"date": "2019-08-27",
		"description": "template",
		"license": "MIT License",
		"title": "Repos viaGitHub API RGA",
		"urlHelpFile":
			"https://pushme-pullyou.github.io/tootoo14/js-14-08/tmp-template/tmp-template.md",
		"urlSourceCode":
			"https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-08/tmp-template",
		"version": "0.14.08-0tmp"

	}

};


RGA.user = 'pushme-pullyou';
RGA.urlGitHubApiRepos = 'https://api.github.com/users/' + RGA.user + '/repos';


RGA.getMenuReposUser = function() {

	RGA.accessToken = localStorage.getItem( 'githubAccessToken' ) || '';

	const htm =
		`
			<details ontoggle="RGAdivRepos.innerHTML=RGA.setMenuUserRepos();" >

				<summary id=RGAsumS >Repos</summary>

				<button id=RGAbut class=butHelp onclick="POP.setPopupShowHide(RGAbut,RGA.script.urlHelpFile);" >?</button>

				<div id=RGAdivRepos ></div>


			</details>

		`;

	return htm;

};





RGA.setMenuUserRepos = function( path = '' ) {

	//console.log( 'path', path );

	const str = RGA.accessToken ? "?access_token=" + RGA.accessToken : "";

	RGA.urlGitHubApiRepos = `https://api.github.com/users/${ RGA.user }/repos`;

	const url = RGA.urlGitHubApiRepos + path + str;

	RGA.requestFile( url ); // to do: make request only once and triage thereafter


};



RGA.requestFile = function( url ) {

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
	xhr.onload = RGA.callbackGitHubUserRepos;
	xhr.send( null );

};


RGA.callbackGitHubUserRepos = function( xhr ) {



	const response = xhr.target.response;
	const items = JSON.parse( response );
	console.log( 'items ', items );

	RGA.menuItems = items;

	//if ( items.message !== "Not Found" ) { alert( items.message ); return; }
	if ( items.message ) { console.log( 'error', items.message ); return; } //breadcrumbs??

	const repos = RGA.getRepos( items );

	// const htmFiles = RGA.getFilesFromContents( items );

	// const htmHelp =
	// `
	// 	<p>Click any <a href=${ RGA.urlSourceCode } >${ RGA.iconInfo }</a> icon to view source code on GitHub.

	// 	<p>Click any &#x2750; icon to go full screen & obtain a link to the individual file.</p>

	// 	<p>Tooltips provide file size.</p>
	// `;


	RGAdivRepos.innerHTML = repos; // + htmFiles + htmHelp;


}



RGA.getRepos = function( items ) {

	let htm = "";

	const len = FGA.pathRepo.length;

	for ( let item of items ) {



			// why does this not work? item.path.split( "/" ).pop()
		htm +=
		`
			<div style=margin-bottom:8px;padding:0; >
				<a href=JavaScript:FGA.setMenuGitHubPathFileNames("${ item.url }"); >
					&#x1f4c1; ${ item.name }
				</a>
			</div>
		`;

	}


	return htm;

};

