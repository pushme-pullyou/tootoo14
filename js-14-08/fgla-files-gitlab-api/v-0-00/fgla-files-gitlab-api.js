/* globals FOB, FGAdivMenuItems, FGAdivBreadcrumbs */
// jshint esversion: 6
// jshint loopfunc: true


const FGA = {

	script: {

		copyright: "Copyright 2019 pushMe pullYou authors",
		date: "2019-09-18",
		description: "Use GitHub API to obtain a list of files in a GitHub repo. Build menu to access the files",
		helpFile: "https://pushme-pullyou.github.io/tootoo14/js-14-08/fga-files-github-api/README.md",
		license: " MIT License",
		version: "0.14.08-0fgla"

	}

};


FGA.user = "443787";
FGA.user = "14344097";

FGA.repo = "";
FGA.pathRepo = "";
FGA.branch = "/master/";

//FGA.urlGitHubPage = "../../";
FGA.urlGitHubPage = `https://${ FGA.user }.github.io/${ FGA.repo }/`;

//////////



FGA.ignoreFolders = [ ".gitlab" ];
FGA.ignoreFiles = [ ".gitattributes", ".gitignore", ".gitlab-ci.yml" ]

FGA.urlSourceCodeImage = "gitlab-solid-red.svg";
FGA.iconInfo = `<img src="${ FGA.urlSourceCodeImage }" height=18 style=opacity:0.5 >`;

const source = ""; //`<a href=${ MNU.urlSourceCode + FGA.script.helpFile } target=_blank >${ MNU.urlSourceCodeIcon } source code</a>`;

FGA.getMenuFilesGithubApi = function() {

	FGA.urlSourceCode = `https://github.com/${ FGA.user}/${ FGA.repo }/`;
	FGA.urlGitHubSource = "https://github.com/" + FGA.user + "/" + FGA.repo;
	FGA.urlGitHubApiContents = 'https://api.github.com/repos/' + FGA.user + "/" + FGA.repo + '/contents/' + FGA.pathRepo;
	FGA.accessToken = localStorage.getItem( 'githubAccessToken' ) || '';

	// <button id=butFGA class=butHelp onclick="POP.setPopupShowHide(butFGA,FGA.script.helpFile,POP.footer,'${ source}');" style=float:right; >?</button>

	const htm =
		`
			<div id = "FGAdivFilesGithubApi" ></div>

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

			<h1 onclick="navPanel.scrollTop=0;" style="color:#888;cursor:pointer;text-align:center;" title="go to top of menu">
				❦
			</h1>
		`;

	return htm;

};



FGA.getFiles = function() {

	const url = ""; //!location.hash ? FOB.urlDefaultFile : location.hash.slice( 1 );
	FGA.url = url;

	const crumbs = url.slice( FGA.urlGitHubPage.length );

	const pathCurrent = crumbs.lastIndexOf( '/' ) > 0 ? crumbs.slice( 0, crumbs.lastIndexOf( '/' ) ) : '';

	if ( FGA.urlGitHubApiContents ) {
		FGA.setMenuGitHubPathFileNames( pathCurrent );
	}

};



FGA.setMenuGitHubPathFileNames = function( path = '' ) {

	//const str = FGA.accessToken ? "?access_token=" + FGA.accessToken : "";

	FGA.urlGitHubApiContents = `https://gitlab.com/api/v4/projects/${ FGA.user }/repository/tree?path=public`

	FGA.setBreadcrumbs( path );

	const url = FGA.urlGitHubApiContents + ( path ? "?path=" + path : "" );

	fetch( new Request( url ) )
		.then( response => response.json() )
		.then( json => FGA.callbackGitHubPathFileNames( json ) );

};


FGA.callbackGitHubPathFileNames = function( json ) {

	FGAdivFolders.innerHTML = FGA.getFolders( json );

	FGAdivFiles.innerHTML = FGA.getFilesFromContents( json );

	FGAdivFooter.innerHTML =
		`
		<p>Click any <a href=${ FGA.urlSourceCode } >${ FGA.iconInfo }</a> icon to view source code on GitHub.

		<p>Click any &#x2750; icon to go full screen & obtain a link to the individual file.</p>

		<p>Tooltips provide file size.</p>
	`;

};


FGA.getFolders = function( items ) {

	htm = items.filter( item => item.type === "tree" &&
		!FGA.ignoreFolders.includes( item.name )
	).map( item =>
		`
			<div style=margin-top:0.2rem; >
				<a href=JavaScript:FGA.setMenuGitHubPathFileNames("${ item.path }"); >
					&#x1f4c1; ${ item.name }
				</a>
			</div>
		`
	).join( "" );

	return htm;

};



FGA.getFilesFromContents = function( items ) {

	const len = FGA.pathRepo.length;

	const name = FGA.url.split( "/" ).pop();

	htm = items.filter( item => item.type === "blob" &&
		!FGA.ignoreFiles.includes( item.name )
	).map( item => {

		console.log( 'pa', item.path );
			const itemPath = encodeURI( item.path.slice( len ) );

			const str = item.path.endsWith( "html" ) ? `<a href="${ FGA.urlGitHubPage }${ FGA.pathRepo }${ itemPath }" title="Open file in new tab" >&#x2750;</a>` : "";

			const stl = item.name === name ? "yellow" : "";

//			FGA.urlGitHubPage = 'https://cdn.jsdelivr.net/gh/' + FGA.user + '/' + FGA.repo + '@master/' + item.path;
			FGA.urlGitHubPage = `https://evereverland.gitlab.io/${ item.path.replace( /public\//, "" ) }`;

			return `
				<div style=margin-top:0.5rem; >
					<div style=display:inline-block; >
						<a href="${ FGA.urlGitHubSource }/blob${ FGA.branch }${ itemPath }" target=_top title="View or edit source code" >
							${ FGA.iconInfo }
						</a>
					</div>
					<div style=display:inline-block; >
						<a href=${ location.href.replace( location.hash, "" ) }#${ FGA.urlGitHubPage } title="${ item.size } bytes" >
							${ item.name }
						</a>
						${ str }
					</div>
				</div>
			`;

			// how to simplify
			/* 			if ( ( !location.hash || location.hash.toLowerCase().endsWith( 'readme.md' ) )

							&& ( item.name.toLowerCase() === 'readme.md' ) ) {

							//location.hash = FGA.urlGitHubPage + FGA.pathRepo + itemPath;

						}
			*/

		} ).join( "" );

	return htm;

};



FGA.onLoadFile = function() {

	const tables = FGAdivMenuItems.querySelectorAll( "table" );

	tables.forEach( table => table.style.backgroundColor = table.id === FOH.fileName ? "yellow" : "" );

};



FGA.setBreadcrumbs = function( path ) {

	const folders = path ? path.split( '/' ) : [];

	let htmFolders = "";
	let str = "";

	for ( let folder of folders ) {

		str += `${ folder }/`;

		htmFolders +=
			`<b><a href=JavaScript:FGA.setMenuGitHubPathFileNames("${ str.slice( 0, -1 ) }"); >
			${ folder }
		</a> &raquo; </b>`;

	}

	FGAdivBreadcrumbs.innerHTML =
	`<div>
		<b>
			<a href=JavaScript:FGA.setMenuGitHubPathFileNames(); title="home folder" >
				${ ( FGA.pathRepo ? FGA.pathRepo : "<span style=font-size:28px >&#x2302</span>" ) }
			</a> &raquo;
		</b>
		${ htmFolders }
	</div>`;

};