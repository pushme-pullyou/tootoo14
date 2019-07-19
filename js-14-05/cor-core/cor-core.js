/* globals FOB, MNU, POP */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const COR = {

	"script": {

		"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
		"date": "2019-07-18",
		"description": "core - contains local overrides",
		"helpFile": "cor-core/README.md",
		"version": "0.14.05-0cor",
	}
};

POP.version = MNU.version = document.head.querySelector( '[ name=version ]' ).content || "";
POP.date = MNU.date = document.head.querySelector( '[ name=date ]' ).content || "";

POP.license = "https://pushme-pullyou.github.io/tootoo14/pages/license.md";

THM.themeUrlStorage = 'tootoo14ThemeUrl'; // set for each instance in HTML file

FOB.urlDefaultFile = "../README.md";

FGA.urlGitHubPage = "https://pushme-pullyou.github.io/tootoo14/";

// For main menu header
//MNU.urlSourceCode = `https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-05/`;

//MNU.title = "TooToo";

//MNU.helpFile = "README.md";

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
	`;

};