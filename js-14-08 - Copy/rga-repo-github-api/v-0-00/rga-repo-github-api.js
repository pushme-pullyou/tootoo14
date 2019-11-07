/* globals */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const RGA = {

	"script": {

		"copyright": "Copyright 2019 pushMe-pullYou authors.",
		"date": "2019-09-17",
		"description": "Get repos",
		"license": "MIT License",
		"title": "Repos viaGitHub API RGA",
		"urlHelpFile":
			"https://pushme-pullyou.github.io/tootoo14/js-14-08/tmp-template/tmp-template.md",
		"urlSourceCode":
			"https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-08/tmp-template",
		"version": "0.14.08-1rga"

	}

};


RGA.user = 'pushme-pullyou';
RGA.urlGitHubApiRepos = 'https://api.github.com/users/' + RGA.user + '/repos';


RGA.getMenuReposUser = function() {

	RGA.accessToken = localStorage.getItem( 'githubAccessToken' ) || '';

	const htm =
		`
			<details ontoggle="RGA.setMenuUserRepos();" >

				<summary id=RGAsumS >Repos</summary>

				<a href="${ RGA.urlHelpFile  }" style=float:right; >?</a>

				<div id=RGAdivRepos ></div>

			</details>

		`;

	return htm;

};


RGA.setMenuUserRepos = function( path = "" ) {

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

	if ( items.message ) { console.log( 'error', items.message ); return; } //breadcrumbs??

	const htm = items.map( item =>
		`
			<div style=margin-bottom:8px;padding:0; >
				<a href=JavaScript:FGA.setMenuGitHubPathFileNames("${ item.url }"); >
					📁 ${ item.name }
				</a>
			</div>
		`
	).join( "" );

	RGAdivRepos.innerHTML = htm;

};