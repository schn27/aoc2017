"use strict";

function calc() {
	var x = 0;
	var y = 0;
	var dir = 0;
	var sx = 0;
	var sy = 0;
	var lx = 1;
	var ly = 1;

	var val = 1;
	var c = [];
	c["0,0"] = 1;

	for (var i = 1; i < input; ++i) {
		if (dir == 0) {
			++x;
		} else if (dir == 1) {
			--y;
		} else if (dir == 2) {
			--x;
		} else if (dir == 3) {
			++y;
		}

		if (dir == 0 || dir == 2) {
			if (++sx >= lx) {
				++dir;
				sx = 0;
				++lx;
			}
		} else {
			if (++sy >= ly) {
				++dir;
				sy = 0;
				++ly;
			}			
		}

		if (dir > 3) {
			dir = 0;
		}

		if (val <= input) {
			val = c[x + "," + y] = 
				(c[(x + 1) + "," + (y + 0)] || 0) + 
				(c[(x - 1) + "," + (y + 0)] || 0) + 
				(c[(x + 1) + "," + (y - 1)] || 0) + 
				(c[(x + 1) + "," + (y + 1)] || 0) + 
				(c[(x - 1) + "," + (y - 1)] || 0) + 
				(c[(x - 1) + "," + (y + 1)] || 0) + 
				(c[(x + 0) + "," + (y - 1)] || 0) + 
				(c[(x + 0) + "," + (y + 1)] || 0);
		}
	}

	return (Math.abs(x) + Math.abs(y)) + " " + val;
}

var input = 368078;
