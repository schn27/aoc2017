"use strict";

function calc() {
	let [a, b] = input.split("\n").map(l => l.split(/[^\d]+/g)
		.filter(e => e.length > 0).map(Number).reduce((a, e) => e));	

	const cA = 16807;
	const cB = 48271;
	const div = 2147483647;
	const mask = (1 << 16) - 1;

	let score = 0;
	let listA = [];
	let listB = [];

	const numPairs = 40000000;
	const numPairs2 = 5000000;

	for (let i = 0; i < numPairs || listA.length < numPairs2 || listB.length < numPairs2; ++i) {
		a = (a * cA) % div;
		b = (b * cB) % div;

		if ((i < numPairs) && (((a ^ b) & mask) == 0)) {
			++score;
		}

		if ((listA.length < numPairs2) && ((a % 4) == 0)) {
			listA.push(a);
		}

		if ((listB.length < numPairs2) && ((b % 8) == 0)) {
			listB.push(b);
		}
	}

	let score2 = listA.reduce((s, a, i) => (((a ^ listB[i]) & mask) == 0) ? s + 1 : s, 0);

	return score + " " + score2;
}

const input = `Generator A starts with 722
Generator B starts with 354`;
