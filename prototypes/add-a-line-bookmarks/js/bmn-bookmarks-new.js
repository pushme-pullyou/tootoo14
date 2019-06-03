/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


BMN = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-06-02",
	"description": "Add a new bookmark",
	"version": "0.5.0-0",

};


BMN.getMenuBookmarkNew = function() {

	const htm =
	`
		<details ontoggle=BMN.onToggle(); >

			<summary>Bookmark New ~ V ${ BMN.version } ~ ${ BMN.date }</summary>

			<p>${ BMN.description }</p>


			<p>
				<button onclick=BMN.setBookmarkNew(); >Add new bookmark</button>

			</p>

		</details>

	`;



	return htm;

};


BMN.onToggle = function() {




};




BMN.onInput = function() {

	const htm = BMNdivDrop.innerHTML;
	//console.log( 'htm', htm );

	if ( !htm ) { return; }

	const url = htm.match( /href="(.*?)"/i )[ 1 ];
	//console.log( '', url );

	const name = htm.match ( />(.*?)<\/a>/i)[ 1 ];

	BMinpUrl.value = url;

	BMinpName.value = name;

	BMinpId.value = BMinpId.value ? BMinpId.value : BM.uuidv4(); //CM.bookmarks.length + 1;

	BMinpDateAdd.value = BMinpDateAdd.value ? BMinpDateAdd.value : new Date().toISOString();

	BMinpDateUpdate.value = BMinpDateAdd.value;

	BMinpType.value = "url";

	BMdivUrl.innerHTML = "url ❐".link( url );

	//ifr.src = url;

};



BMN.setBookmarkNew = function() {

	BMinpUrl.value = "url";
	BMinpName.value = "name";
	BMinpDateAdd.value = new Date().toISOString();
	BMinpDateUpdate.value = BMinpDateAdd.value;
	BMinpId.value = BM.uuidv4();
	BMinpType.value = "url";
	BMinpTags.value = [];
	BMtxtDescription.value = "";

	BMdivUrl.innerHTML = "url";

};
