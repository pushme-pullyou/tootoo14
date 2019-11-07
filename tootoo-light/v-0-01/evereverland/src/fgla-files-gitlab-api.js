/* globals FGAdivBreadcrumbs, FGAdivFolders, FGAdivFiles, FGAdivFooter */
// jshint esversion: 6
// jshint loopfunc: true

"use strict";

const FGA = {};


FGA.groupId = "443787";
FGA.groupId = "14344097";

FGA.group = "evereverland";
FGA.repo = "evereverland.gitlab.io";
FGA.branch = "master";

FGA.pathRepo = "public";
FGA.path = FGA.pathRepo;

FGA.ignoreFolders = [ ".gitlab" ];
FGA.ignoreFiles = [
	".gitattributes",
	".gitignore",
	".gitlab-ci.yml"
];

FGA.urlSourceCodeImage = "https://evereverland.gitlab.io/images/gitlab-solid-red.svg";
FGA.iconInfo = `<img src="${FGA.urlSourceCodeImage}" height=18 style=opacity:0.5 >`;


FGA.getMenuFilesGitLabApi = function () {

	window.addEventListener("hashchange", FGA.onHashChange, false);

	// FGA.accessToken = localStorage.getItem('gitlabAccessToken') || '';

	const htm =
		`

			<div id = "FGAdivBreadcrumbs" ></div>

			<details open style=margin-top:1rem; >

				<summary>Folders</summary>

				<div id = "FGAdivFolders" ></div>

			</details>

			<details open style=margin-top:1rem; >

				<summary>Files</summary>

				<div id = "FGAdivFiles" ></div>

				<div id = "FGAdivFooter" ></div>

			</details>

		`;

	return htm;

};



FGA.onHashChange = function () {

	const url = !location.hash ? "" : location.hash.slice( 1 );

	FGA.path = url.lastIndexOf("/") > 0 ? url.slice(0, url.lastIndexOf("/")) : FGA.pathRepo;

	if (FGA.path === FGA.pathPrevious && FGAdivFiles.innerHTML !== "" ) { return; }

	FGA.fetchTree(FGA.path);

	FGA.pathPrevious = FGA.path;

};



FGA.vvvvonHashChange = function () {

	const name = location.hash ? location.hash.slice( 1 ).split( "/" )
		.pop() : "README.md";

	const divs = FGAdivFiles.querySelectorAll( "div.FGAitem" );

	divs.forEach( dv => dv.parentElement.style.backgroundColor =
		dv.innerText.trim() === name ? "lightgreen" : "" );

};


FGA.fetchTree = function ( path = "" ) {

	FGA.setBreadcrumbs( path );

	FGA.urlGitlabApiContents = `https://gitlab.com/api/v4/projects/${ FGA.groupId
		}/repository/tree?path=${path}`;

	fetch( new Request( FGA.urlGitlabApiContents ) ).
		then( response => response.json() ).
		then( json => FGA.callbackGitlabPathFileNames( json ) );

};



FGA.setBreadcrumbs = function ( path ) {

	// let folders = path ? path.split( "/" ) : [];

	// folders = folders[ 0 ] === "public" ? folders.slice( 1 ) : folders;

	// let htmFolders = "";
	// let str = "public/";

	// for ( let folder of folders ) {

	// 	str += `${folder}/`;

	// 	htmFolders +=
	// 		`<b><a href=JavaScript:FGA.fetchTree("${str}"); >
	// 		${ folder}
	// 	</a> &raquo; </b>`;

	// }

	const folders = path ? path.split( "/" ) : [];
	//console.log( "folders", folders );

	const htmFolders = folders.map( ( folder, i ) =>
		`<a href=JavaScript:FGA.fetchTree("${ folders.slice( 0, i ).join( "/" ) }"); >${ folder}</a> &raquo; `
	).join( "" );


	FGAdivBreadcrumbs.innerHTML =
		`<div>
		<b>
			<a href=JavaScript:FGA.fetchTree(FGA.pathRepo); title="home folder" >
				<span style=font-size:28px >&#x2302</span>
			</a> &raquo;
		</b>
		${ htmFolders }
	</div>`;

};



FGA.callbackGitlabPathFileNames = function ( json ) {

	FGAdivFolders.innerHTML = FGA.getFolders( json );

	FGAdivFiles.innerHTML = FGA.getFiles( json );

	FGA.urlSourceCode = `https://gitlab.com/${FGA.group}/${FGA.repo}`;

	const name = location.hash ? location.hash.slice( 1 ).split( "/" )
	.pop() : "README.md";
//console.log( "name", name );

const divs = FGAdivFiles.querySelectorAll( "div.FGAitem" );

divs.forEach( dv => dv.parentElement.style.backgroundColor =
	dv.innerText.trim() === name ? "lightgreen" : "" );

	FGAdivFooter.innerHTML =
		`

	`;

	FGA.onHashChange();

};


FGA.getFolders = function ( items ) {

	const htm = items.filter( item => item.type === "tree" &&
		!FGA.ignoreFolders.includes( item.name ) ).map( item => `
			<div style=margin-top:0.2rem; >
				<a href=JavaScript:FGA.fetchTree("${ item.path}"); >
					&#x1f4c1; ${ item.name}
				</a>
			</div>
		` ).
		join( "" );

	return htm;

};


FGA.getFiles = function ( items = [] ) {

	const htm = items.filter( item => item.type === "blob" &&
		!FGA.ignoreFiles.includes( item.name ) ).map( item => {

			//console.log( 'item', item );

			FGA.urlGitlabSource = `https://gitlab.com/${FGA.group}/${FGA.repo
				}/blob/${FGA.branch}/${item.path}`;

			FGA.urlGitlabPage = `${item.path.slice( FGA.pathRepo.length + 1 )}`;

			const url = `https://${FGA.repo}/${FGA.urlGitlabPage}`;

			const str = item.path.endsWith( "html" ) ? `<a href="${url}"
			title="Open file in new tab" target="_blank" >&#x2750;</a>` : "";

			return `
			<div style=margin-top:0.5rem; >
				<div style=display:inline-block; >
					<a href="${ FGA.urlGitlabSource}"
						target=_top title="View or edit source code" >
						${ FGA.iconInfo}
					</a>
				</div>
				<div style=display:inline-block; class=FGAitem >
					<a href=${ location.href.replace( location.hash, "" )}#${FGA.urlGitlabPage}
					title="Click to view file" >${ item.name}
					</a>
				</div>
				<div style=display:inline-block; >${ str}</div>
			</div>
		`;

		} ).
		join( "" );

	return htm;

};
