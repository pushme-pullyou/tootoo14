// Copyright pushMe-pullYou authors. MIT license.
// jshint esversion: 6
// jshint loopfunc: true
/* globals FGAdivFolders, FGAdivFiles, FGAdivBreadcrumbs */


const FGA = {};

FGA.uriDefaultFile = "README.md";

FGA.branch = "master";
FGA.user = "evereverland";
FGA.repo = "evereverland.gitlab.io";
FGA.pathRepo = "";

FGA.pathPrevious = "";

FGA.ignoreFolders = [ "0-templates-readme", "archive", "data", ".github" ];

FGA.ignoreFiles = [ ".gitattributes", ".gitignore", ".nojekyll", "404.html", "index.html" ];

FGA.urlSourceCodeImage = "https://pushme-pullyou.github.io/github-mark-32.png";
FGA.iconInfo = `<img src="${ FGA.urlSourceCodeImage }" height=18 style=opacity:0.5 >`;


FGA.getMenuFilesGithubApi = function () {

	window.addEventListener( "hashchange", FGA.onHashChange, false );

	const urlSourceCode = `https://github.com/${FGA.user}/${FGA.repo}/`;

	const htm =
	`
		<div id = "FGAdivBreadcrumbs" ></div>

		<details open class=details__secondary ontoggle=FGA.onHashChange(); >

			<summary class=summary__secondary >Folders</summary>

			<div id = "FGAdivFolders" class=nav-menu-div ></div>

		</details>

		<details open  class=details__secondary >

			<summary  class=summary__secondary >Files</summary>

			<div id = "FGAdivFiles" class=nav-menu-div></div>

			<div id = "FGAdivFooter" >

				<p>Click any <a href=${ urlSourceCode} >${ FGA.iconInfo }</a> icon to view source code on GitHub.

				<p>Click any &#x2750; icon to go full screen & obtain a link to the individual file.</p>

				<p>Tooltips provide file size.</p>

			</div>

		</details>
	`;

	FGA.getFiles();

	return htm;

};



FGA.onHashChange = function () {

	const url = !location.hash ? "" : location.hash.slice( 1 );

	FGA.path = url.lastIndexOf("/") > 0 ? url.slice(0, url.lastIndexOf("/")) : "";

	if (FGA.path === FGA.pathPrevious && FGAdivFiles.innerHTML !== "" ) { return; }

	FGA.fetchTree(FGA.path);

	FGA.pathPrevious = FGA.path;

};



FGA.fetchTree = function ( path = "" ) {

	FGA.setBreadcrumbs( path );

	const url = `https://api.github.com/repos/${ FGA.user }/${ FGA.repo }/contents/${ path }`;

	const accessToken = localStorage.getItem( "githubAccessToken" ) || "";

	const str = accessToken ? "?access_token=" + accessToken : "";

	fetch( new Request( url + str ) ).
		then( response => response.json() ).
		then( json => FGA.callbackGitHubPathFileNames( json ) );

};


FGA.setBreadcrumbs = function ( path ) {

	const folders = path ? path.split( "/" ) : [];
	//console.log( "folders", folders );

	const htmFolders = folders.map( ( folder, i ) =>
		`<a href=JavaScript:FGA.fetchTree("${ folders.slice( 0, i ).join( "/" ) }"); >${ folder}</a> &raquo; `
	).join( "" );

	FGAdivBreadcrumbs.innerHTML =
	`
		<div style="margin:0.2rem 1rem;" >
			<b>
				<a href=JavaScript:FGA.fetchTree(); title="home folder" >
					${ ( FGA.pathRepo ? FGA.pathRepo : "<span style=font-size:28px >&#x2302</span>" )}
				</a> &raquo;
				${ htmFolders}
			</b>
		</div>
	`;

};


FGA.callbackGitHubPathFileNames = function ( items ) {
	//console.log( "items", items );

	if ( items.message ) { console.log( "error", items.message ); return; } //breadcrumbs??

	items = Array.isArray( items ) ? items : [ items ];

	FGAdivFolders.innerHTML = FGA.getFolders( items );

	FGAdivFiles.innerHTML = FGA.getFiles( items );

	const name = location.hash ? location.hash.slice( 1 ).split( "/" )
		.pop() : "README.md";
	//console.log( "name", name );

	const divs = FGAdivFiles.querySelectorAll( "div.FGAitem" );

	divs.forEach( dv => dv.parentElement.style.backgroundColor =
		dv.innerText.trim() === name ? "lightgreen" : "" );

};


FGA.getFolders = function ( items ) {

	const htm = items.filter( item => item.type === "dir" &&
		!FGA.ignoreFolders.includes( item.name ) ).map( item => `
			<div style="margin:0.2rem 1rem;" >
				<a href="#${ item.path }/"; >
					&#x1f4c1; ${ item.name}
				</a>
			</div>
		` ).
		join( "" );

	return htm;

};


FGA.getFiles = function (items = [] ) {

	const htm = items.filter( item => item.type === "file" &&
		!FGA.ignoreFiles.includes( item.name ) ).map( item => {

			FGA.urlGitHubSource = `https://github.com/${FGA.user}/${FGA.repo}/
				/blob/${ FGA.branch}/${item.path}`;

			FGA.urlGitlabPage = `${item.path.slice( FGA.pathRepo.length )}`;

			const url = `https://${FGA.repo}/${FGA.urlGitlabPage}`;

			const str = item.path.endsWith( "html" ) ? `<a href="${url}"
			title="Open file in new tab" target="_blank" >&#x2750;</a>` : "";

			return `
				<div style="margin:0.5rem 1rem"; >
					<div style=display:inline-block; >
						<a href="${ FGA.urlGitHubSource}"
							target=_top title="View or edit source code" >
							${ FGA.iconInfo}
						</a>
					</div>
					<div style=display:inline-block; class=FGAitem >
						<a href=#${ item.path }
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
