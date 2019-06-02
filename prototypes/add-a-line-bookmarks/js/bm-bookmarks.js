/* global  */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


BM = {

	"copyright": "Copyright 2019 pushMe-pullYou authors. MIT License",
	"date": "2019-06-01",
	"description": "Display bookmarks by finding a host",
	"version": "0.5.0-1",

};



BM.parseJson = function( index ) {

	divContents.innerHTML = tmpNewBookmark.innerHTML;

	const bookmark = BM.bookmark = BLBF.bookmarks[ index ];
	//console.log( 'bookmark', bookmark );

	//aUrl.href = bookmark.url;
	//aUrl.innerHTML = bookmark.url;
	inpUrl.value = bookmark.url;
	inpName.value = bookmark.name;
	inpDateAdd.value = bookmark.dateAdd;
	inpDateUpdate.value = bookmark.dateUpdate;
	inpId.value = bookmark.id;
	inpType.value = bookmark.type;
	inpImages.value = bookmark.images;
	inpTags.value = bookmark.tags;

	txtDescription.value = bookmark.description;

};

