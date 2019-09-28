/* globals FOB, FGAdivMenuItems, FGAdivBreadcrumbs */
// jshint esversion: 6
// jshint loopfunc: true


const FGA = {

	script: {

		copyright: "Copyright 2019 pushMe pullYou authors",
		date: "2019-09-08",
		description: "Use GitHub API to obtain a list of files in a GitHub repo. Build menu to access the files",
		helpFile: "https://pushme-pullyou.github.io/tootoo14/js-14-08/fga-files-github-api/README.md",
		license: " MIT License",
		version: "0.14.08-0fga"

	}

};


FGA.branch = 'master';
FGA.user = 'pushme-pullyou';
FGA.repo = 'tootoo14';
FGA.pathRepo = '';

//FGA.urlGitHubPage = "../../";
FGA.urlGitHubPage = "https://pushme-pullyou.github.io/tootoo14/";

FGA.ignoreFolders = [ "0-templates-readme", "archive", "data", ".github" ];

FGA.ignoreFiles = [ ".gitattributes", ".gitignore", ".nojekyll", "404.html", "index.html" ];

FGA.urlSourceCode = `https://github.com/${FGA.user}/${FGA.repo}/`;

FGA.urlSourceCodeImage = "https://pushme-pullyou.github.io/github-mark-32.png";
FGA.iconInfo = `<img src="${FGA.urlSourceCodeImage}" height=18 style=opacity:0.5 >`;


const source = ""; //`<a href=${ MNU.urlSourceCode + FGA.script.helpFile } target=_blank >${ MNU.urlSourceCodeIcon } source code</a>`;


FGA.getMenuFilesGithubApi = function () {

	window.addEventListener( 'hashchange', FGA.onHashChange, false );

	FGA.urlGitHubApiContents = 'https://api.github.com/repos/' + FGA.user + "/" + FGA.repo + '/contents/' + FGA.pathRepo;
	FGA.accessToken = localStorage.getItem( 'githubAccessToken' ) || '';

	// <button id=butFGA class=butHelp onclick="POP.setPopupShowHide(butFGA,FGA.script.helpFile,POP.footer,'${ source}');" style=float:right; >?</button>
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


FGA.fetchTree = function ( path = "" ) {

	FGA.path = path;

	FGA.setBreadcrumbs( FGA.path );

	FGA.urlGitHubApiContents = `https://api.github.com/repos/${FGA.user}/${FGA.repo}/contents/${FGA.path}`;

	fetch( new Request( FGA.urlGitHubApiContents ) ).
		then( response => response.json() ).
		then( json => FGA.callbackGitHubPathFileNames( json ) );

};


FGA.callbackGitHubPathFileNames = function ( items ) {

	if ( items.message ) { console.log( 'error', items.message ); return; } //breadcrumbs??

	FGAdivFolders.innerHTML = FGA.getFolders( items );

	FGAdivFiles.innerHTML = FGA.getFiles( items );

	FGAdivFooter.innerHTML =
		`
		<p>Click any <a href=${ FGA.urlSourceCode} >${FGA.iconInfo}</a> icon to view source code on GitHub.

		<p>Click any &#x2750; icon to go full screen & obtain a link to the individual file.</p>

		<p>Tooltips provide file size.</p>
	`;

	FGA.onHashChange();

};


FGA.getFolders = function ( items ) {

	const htm = items.filter( item => item.type === "dir" &&
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


FGA.getFiles = function ( items ) {

	const htm = items.filter( item => item.type === "file" &&
		!FGA.ignoreFiles.includes( item.name ) ).map( item => {

			FGA.urlGitHubSource = `https://github.com/${FGA.user}/${FGA.repo}/
				/blob/${ FGA.branch}/${item.path}`;

			FGA.urlGitlabPage = `${item.path.slice( FGA.pathRepo.length )}`;

			const url = `https://${FGA.repo}/${FGA.urlGitlabPage}`;

			FGA.urlGitHubPage = 'https://cdn.jsdelivr.net/gh/' + FGA.user + '/' + FGA.repo + '@master/' + item.path;

			const str = item.path.endsWith( "html" ) ? `<a href="${url}"
			title="Open file in new tab" target="_blank" >&#x2750;</a>` : "";

			return `
				<div style=margin-top:0.5rem; >
					<div style=display:inline-block; >
						<a href="${ FGA.urlGitHubSource}"
							target=_top title="View or edit source code" >
							${ FGA.iconInfo}
						</a>
					</div>
					<div style=display:inline-block; class=FGAitem >
						<a href=${ location.href.replace( location.hash, "" )}#${FGA.urlGitHubPage}
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


FGA.onHashChange = function () {

	const name = location.hash ? location.hash.slice( 1 ).split( "/" )
		.pop() : "README.md";

	const divs = FGAdivFiles.querySelectorAll( "div.FGAitem" );

	divs.forEach( dv => dv.parentElement.style.backgroundColor =
		dv.innerText.trim() === name ? "lightgreen" : "" );

};


FGA.setBreadcrumbs = function ( path ) {

	const folders = path ? path.split( '/' ) : [];

	let htmFolders = "";
	let str = "";

	for ( let folder of folders ) {

		str += `${folder}/`;

		htmFolders +=
			`<b><a href=JavaScript:FGA.fetchTree("${str.slice( 0, -1 )}"); >
			${ folder}
		</a> &raquo; </b>`;

	}

	FGAdivBreadcrumbs.innerHTML =
		`<div>
		<b>
			<a href=JavaScript:FGA.fetchTree(); title="home folder" >
				${ ( FGA.pathRepo ? FGA.pathRepo : "<span style=font-size:28px >&#x2302</span>" )}
			</a> &raquo;
		</b>
		${ htmFolders}
	</div>`;

};
