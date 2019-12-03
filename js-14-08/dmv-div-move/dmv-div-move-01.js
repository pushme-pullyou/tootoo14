// jshint esversion: 6
// jshint loopfunc: true

// see also https://www.kirupa.com/html5/drag.htm

const DMV = {
	draggableLeft: 0,
	draggableTop: 0,

	draggableStartX: 0,
	draggableStartY: 0
};



DMV.initialize = function() {
	hdrPopup.addEventListener("mousedown", DMV.onMouseDown, false);
	window.addEventListener("mouseup", DMV.onMouseUp, false);

	hdrPopup.addEventListener("touchstart", DMV.onTouchStart, false);
	hdrPopup.addEventListener("touchmove", DMV.onTouchMove, false);
};

DMV.onMouseDown = function(event) {
	DMV.draggableTop = event.clientY - navPopup.offsetTop;
	DMV.draggableLeft = event.clientX - navPopup.offsetLeft;

	window.addEventListener("mousemove", DMV.onMouseMove, true);
};

DMV.onMouseMove = function(event) {
	navPopup.style.top = event.clientY - DMV.draggableTop + "px";
	navPopup.style.left = event.clientX - DMV.draggableLeft + "px";
};

DMV.onMouseUp = function() {
	window.removeEventListener("mousemove", DMV.onMouseMove, true);
};

DMV.onTouchStart = function(event) {
	DMV.draggableLeft = navPopup.offsetLeft;
	DMV.draggableStartX = event.changedTouches[0].clientX;
	DMV.draggableTop = navPopup.offsetTop;
	DMV.draggableStartY = event.changedTouches[0].clientY;
	//console.log( 'draggableTop', draggableTop, draggableStartY );
	event.preventDefault();

	//console.log("Status: touchstart", "ClientX: " + DMV.draggableStartX + "px");
};

DMV.onTouchMove = function(event) {
	const distX = event.changedTouches[0].clientX - DMV.draggableStartX;
	let left =
		DMV.draggableLeft + distX > document.body.clientWidth - 100 ?
			document.body.clientWidth - 100
			: DMV.draggableLeft + distX;
	left = DMV.draggableLeft + distX < 0 ? 0 : left;
	//console.log( 'left2', left  );

	navPopup.style.left = left + "px";

	const distY = event.changedTouches[0].clientY - DMV.draggableStartY;

	let top =
		DMV.draggableTop + distY > window.innerHeight - 100 ?
			window.innerHeight - 100
			: DMV.draggableTop + distY;
	top = DMV.draggableTop + distY < 0 ? 0 : top;
	//console.log( 'top', top  );

	navPopup.style.top = top + "px";

	event.preventDefault();
};
