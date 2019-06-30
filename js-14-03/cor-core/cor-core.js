/* globals FOB, MNU, POP */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const COR = {

	"script": {

		"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
		"date": "2019-06-28",
		"description": "core - contains local overrides",
		"helpFile": "cor-core/README.md",
		"release": "0.14.03-3cor",
	}
};

POP.version = MNU.version = "0.14.03-5"; //document.head.querySelector( '[ name=version ]' ).content || "";
POP.date = MNU.date = "2019-06-29";

THM.themeUrlStorage = 'tootoo14ThemeUrl'; // set for each instance in HTML file
THM.cssBasic = "../style.css";
//THM.cssBasic = "https://www.w3schools.com/lib/w3-theme-red.css";

FOB.urlDefaultFile = "../README.md";

FGA.urlGitHubPage = "https://pushme-pullyou.github.io/tootoo14/";

// For main menu header
MNU.urlSourceCode = `https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-03/`;

MNU.title = "TooToo14";

MNU.helpFile = "../README.md";

//MNU.description = document.head.querySelector( '[ name=description ]' ).content;
MNU.description = `Very simple JavaScript files to help you explore and build new tools on <a href="https://github.com" target="_blank">GitHub</a>.`;

MNU.homeText  = "pushMe-pullYou";
MNU.homeTitle = "Very simple JavaScript files to help you explore and build new tools on GitHub.";
MNU.homeUrl   = "https://pushme-pullyou.github.io";

MNU.repoText  = "TooToo14";
MNU.repoTitle = "Basic html templates with sliding menu, css selection, markdown capability and frequently used pages";
MNU.repoUrl   = "https://pushme-pullyou.github.io/tootoo14";

MNU.appText  = ""; // "CMS";
MNU.appTitle = ""; //"Basic html content management script with sliding menu, css theme selection, Markdown to HTML, drag and drop file reading capability, access to frequently used pages and more";
MNU.appUrl   = ""; //"https://pushme-pullyou.github.io/#tootoo-templates/hamburger-theme-cms/README.md";

MNU.footerPopupUrl	= "https://pushme-pullyou.github.io/tootoo14/";
MNU.footerTarget = "target=_blank";
MNU.footerIssues = "https://github.com/pushme-pullyou.github.io/tootoo14/issues";


COR.init = function() {

	COR.css = document.body.appendChild( document.createElement('style') );
	COR.css.innerHTML =
	`
		#POPdivHeader {
			background-color: rgb(245, 230, 99);
			border-radius: 5%;
			padding: 0.5rem;
			touch-action: none;
			user-select: none;

		}

		#POPdivHeader:active { background-color: rgba( 168, 218, 220, 1.00 ); }

		#POPdivHeader:hover { cursor: pointer; border-width: 5px; }

		#POPdivMain { height: 100%; margin: 0.5rem; }

		#POPdivFooter { border-top: 1px solid #555; color: #f00; font: italic 0.5rem; margin: 0.5rem;
			text-align: right; width: 95%; }

	`;

};