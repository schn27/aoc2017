"use strict";

function calc() {
	const components = input.split("\n").map(line => line.split("/").map(Number));

	const bridgesInfo = makeBridges(components, [], [])
		.map(b => [b.reduce((s, c) => s + c[0] + c[1], 0), b.length]);

	const part1 = bridgesInfo.reduce((m, b) => Math.max(m, b[0]), 0);

	const maxLength = bridgesInfo.reduce((m, b) => Math.max(m, b[1]), 0);
	const part2 = bridgesInfo.filter(b => b[1] == maxLength)
		.reduce((m, b) => Math.max(m, b[0]), 0);

	return part1 + " " + part2;
}

function makeBridges(components, bridge, bridgeList) {
	const backEnd = bridge.length == 0 ? 0 : bridge[bridge.length - 1][1];
	const candidates = components.filter(c => c[0] == backEnd || c[1] == backEnd);

	if (candidates.length == 0) {
		bridgeList.push(bridge);
	} else {
		candidates.forEach(c => {
			let availableComp = components.slice();
			availableComp.splice(availableComp.indexOf(c), 1);
			let bridgeFork = bridge.slice();
			bridgeFork.push(c[0] == backEnd ? [c[0], c[1]] : [c[1], c[0]]);
			makeBridges(availableComp, bridgeFork, bridgeList);
		});
	}

	return bridgeList;
}

const input = `25/13
4/43
42/42
39/40
17/18
30/7
12/12
32/28
9/28
1/1
16/7
47/43
34/16
39/36
6/4
3/2
10/49
46/50
18/25
2/23
3/21
5/24
46/26
50/19
26/41
1/50
47/41
39/50
12/14
11/19
28/2
38/47
5/5
38/34
39/39
17/34
42/16
32/23
13/21
28/6
6/20
1/30
44/21
11/28
14/17
33/33
17/43
31/13
11/21
31/39
0/9
13/50
10/14
16/10
3/24
7/0
50/50`;
