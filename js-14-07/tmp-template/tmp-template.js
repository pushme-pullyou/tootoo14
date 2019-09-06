/* globals FIL */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const TMP = {

	"script": {

		"copyright": "Copyright 2019 pushMe-pullYou authors.",
		"date": "2019-08-27",
		"description": "template",
		"license": "MIT License",
		"title": "Template TMP",
		"urlHelpFile":
			"https://pushme-pullyou.github.io/tootoo14/js-14-07/tmp-template/tmp-template.md",
		"urlSourceCode":
			"https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-07/tmp-template",
		"version": "0.14.07-0tmp"

	}

};



TMP.getMenuTemplate = function() {

	const htm =
		`
			<details ontoggle="TMPdivTemplateMore.innerHTML=TMP.getTemplate();" >

				<summary id=TMPsumSurfaces >Template</summary>

				<button id=butTemplate class=butHelp onclick="POP.setPopupShowHide(butTemplate,TMP.script.urlHelpFile);" >?</button>

				<div id=TMPdivTemplateMore ></div>

			</details>

		`;

	return htm;

};



TMP.getTemplate = function() {

	const timeStart = performance.now();

	const htm =
	`
		<p><i>Template</i></p>

		<p><button onclick=TMP.updatePopupFooter() >new footer</button></p>

		<p>${ new Date() }</p>

		<p>lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>

		<p>Time to check: ${ ( performance.now() - timeStart ).toLocaleString() } ms</p>

		<hr>

	`;

	return htm;

};





TMP.updatePopupFooter = function() {

	const htm=
	`
	<p><button onclick=TMP.screen1(); style=background:#fdd;width:15%; >one</button><button onclick=TMP.screen2(); style=background:#ddf;width:15%;>two</button><button style=background:#dfd;width:15%;>three</button></p>
	`;

	POPdivFooter.innerHTML = htm + POPdivFooter.innerHTML;
};


TMP.screen1 = function() {

	POPdivPopupData.innerHTML =
	`
		<h2>screen 1</h2>
		23
	`;

}

TMP.screen2 = function() {

	POPdivPopupData.innerHTML =
	`
		<h2>screen 2</h2>

		<img src=https://picsum.photos/320/240/?random  >
	`

}