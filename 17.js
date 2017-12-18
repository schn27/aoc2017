"use strict";

function calc() {
	return part1() + " " + part2();
}

function part1() {
	let b = [0];

	let pos = 0;
	let step = 0;

	while (step++ < 2017) {
		pos = (pos + input + 1) % b.length;
		b.splice(pos + 1, 0, step);
	}

	return b[b.indexOf(2017) + 1];
}

function part2() {
	let pos = 0;
	let step = 0;

	let value = 0;

	while (step++ < 50000000) {
		pos = (pos + input + 1) % step;

		if (pos == 0) {
			value = step;
		}
	}

	return value;	
}

const input = 348;
