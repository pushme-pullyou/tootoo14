/* globals FIL */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const THM = {
	"copyright": "Copyright 2019 Ladybug Tools authors. MIT License",
	"date": "2019-05-26",
	"description": "Select a theme",
	"version": "0.14.1-0",
};



THM.getMenuTemplate = function() {

	const htm =
		`
			<details ontoggle="TMPdivTmp1.innerHTML=THM.getTemplate();" >

				<summary id=TMPsumSurfaces >Template
					<button id=butTemplate class=butHelp onclick="MNU.setPopupShowHide(butTestText,'README.md');" style=float:right; >?</button>
				</summary>

				<div id=TMPdivTmp1 ></div>

			</details>

		`;

	return htm;

};



THM.getTemplate = function() {

	const timeStart = performance.now();

	const htm =
	`
		<p><i>Template</i></p>

		<p>${ new Date() }</p>

		<p>lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>

		<p>Time to check: ${ ( performance.now() - timeStart ).toLocaleString() } ms</p>

		<hr>

	`;

	return htm;

};

