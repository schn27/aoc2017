"use strict";

Array.prototype.max = function() {
	return Math.max.apply(null, this);
};

function calc() {
	let banks = input.split("\t").map(Number);

	let steps = 0;
	let size = 0;

	let map = [banks.toString()];

	for (let found = false; !found; ++steps) {
		distribute(banks);
		found = map[banks.toString()] !== undefined;
		size = steps - map[banks.toString()];
		map[banks.toString()] = steps;
	}

	return steps + " " + size;
}

function distribute(banks) {
	let i = banks.indexOf(banks.max());
	let blocks = banks[i];
	banks[i] = 0;
	while (blocks-- > 0) {
		i = (i + 1) % banks.length;
		++banks[i];
	}
}

var input = `4	10	4	1	8	4	9	14	5	1	14	15	0	15	3	5`;