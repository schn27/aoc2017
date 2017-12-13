"use strict";

function calc() {
	const layers = input.split("\n").map(l => l.split(/[^\d]+/g).map(Number));

	let delay = 0;
	while (getSeverity(layers, ++delay) >= 0) {}

	return getSeverity(layers, 0) + " " + delay;
}

function getSeverity(layers, delay) {
	let severity = 0;
	let caught = false;

	layers.every(l => {
		if (((l[0] + delay) % (l[1] * 2 - 2)) == 0) {
			severity += l[0] * l[1];
			caught = true;
		}

		return delay == 0 || !caught;
	});

	return caught ? severity : -1;
}

let input = `0: 3
1: 2
2: 4
4: 6
6: 5
8: 8
10: 6
12: 4
14: 8
16: 6
18: 8
20: 8
22: 6
24: 8
26: 9
28: 12
30: 8
32: 14
34: 10
36: 12
38: 12
40: 10
42: 12
44: 12
46: 12
48: 12
50: 14
52: 12
54: 14
56: 12
60: 14
62: 12
64: 14
66: 14
68: 14
70: 14
72: 14
74: 14
78: 26
80: 18
82: 17
86: 18
88: 14
96: 18`;
