/* globals FIL */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const GAT = {

	"copyright": "Copyright 2019 PushMe-PullYou authors",
	"date": "2019-10-19",
	"description": "Personal access tokens function like ordinary OAuth access tokens. They can be used instead of a password for Git over HTTPS, or can be used to authenticate to the API over Basic Authentication.",
	"sourceCode": "https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-08/gat-github-access-token",
	"license": "MIT License",
	"version": "0.14.08-1gat",
};



GAT.getMenuGitHubAccessToken = function () {

	GAT.accessToken = localStorage.getItem( 'githubAccessToken' ) || '';

	const htm =
		`
		<details class=details__secondary >

			<summary class=summary__secondary >GitHub API Personal Access Token </summary>

			<!-- <div>
				<button id=butGAT class=butHelp onclick="GATdiaHelp.open=!GATdiaHelp.open;" >?</button>
			</div> -->

			<p>
				<div>Access token</div>
				<input value="${ GAT.accessToken }" id=GATinpGitHubApiKey onclick=this.select(); onblur=GAT.setGitHubAccessToken(this.value); title="Obtain API Access Token" style=width:100%; >
			</p>

			<p>
				<button id=GATbutRateLimits onclick=GAT.setViewRateLimits(GATbutRateLimits); title='If files and folder stop appearing, it is likely due to too many API calls' >
					View your current GitHub API usage & rate limits
				</button>
			</p>

		</details>

		<dialog id=GATdiaHelp onclick=this.close() >

			<h1>GitHub API Personal Access Token</h1>

			<div>

				<p>${ GAT.description }</p>

				<p><a href="${ GAT.sourceCode }" target="_blank">Source code</a></p>

				<p>Version: ${ GAT.version } - Update: ${ GAT.date } </p>

				<p>${ GAT.copyright }. ${ GAT.license }.</p>

			<div>

		</dialog>
	`;

	return htm;

};


GAT.setGitHubAccessToken = function ( accessToken ) {

	console.log( 'accessToken', accessToken );

	localStorage.setItem( "githubAccessToken", accessToken );

	GAT.accessToken = accessToken;

};



GAT.setViewRateLimits = function ( button, target = divContents ) {
	//console.log( 'button', button );

	const url = "https://api.github.com/rate_limit";

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onload = callback;
	xhr.send( null );

	function callback ( xhr ) {


		const htm =
			`
			<!-- <dialog open onclick=this.close(); style="max-height: 50%; overflow: auto;"> -->

				<h1>GitHub rate limits status</h1>

				<div>
					<p>
						Some of the scripts in this app use the GitHub Developer API.
						The API which has rate limits that reset every hour.
						See <a href="https://developer.github.com/v3/#rate-limiting" target="_blank">developer.github.com/v3</a>.
					</p>

					<pre> ${ xhr.target.response } </pre>

				</div>

			<!-- </dialog> -->
		`;

		target.innerHTML += htm;

	}

};