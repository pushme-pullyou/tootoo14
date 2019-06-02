/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


TAG = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-06-01",
	"description": "Display bookmarks by finding a host",
	"version": "0.5.0-1",

};



TAG.setTagSetNew = function() {

	//const tag = TAG.tagset = TAG.tagsets[ index ];
	//console.log( 'tag', tag );


	TAGinpName.value = "name";
	TAGinpDateAdd.value = new Date().toISOString();
	TAGinpDateUpdate.value = TAGinpDateAdd.value;
	TAGinpId.value = TAG.uuidv4();
	TAGinpType.value = "tagset";
	TAGinpTags.value = ["abc","123"];

	TAGtxtDescription.value = "tags";
}


TAG.uuidv4 = function() {

	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);

};