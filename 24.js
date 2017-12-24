"use strict";

function calc() {
	const ports = input.split("\n").map(line => line.split("/").map(Number));

	const strengths = getStrength(makeTree(ports, [0, []]), 0, 0, []);

	const maxStrength = strengths.reduce((m, e) => Math.max(m, e[0]), 0);
	
	const maxLength = strengths.reduce((m, e) => Math.max(m, e[1]), 0);
	const maxStrength2 = strengths.filter(e => e[1] == maxLength)
		.reduce((m, e) => Math.max(m, e[0]), 0);

	return maxStrength + " " + maxStrength2;
}

function makeTree(ports, parent) {
	ports.filter(port => port[0] == parent[0] || port[1] == parent[0])
		.forEach(c => {
			let v = (c[0] == parent[0]) ? c[1] : c[0];
			let p = ports.slice();
			p.splice(p.indexOf(c), 1);
			parent[1].push(makeTree(p, [v, []]));
		});

	return parent;
}

function getStrength(parent, strength, size, strengths) {
	if (parent[1].length == 0) {
		strengths.push([strength, size]);
	} else {
		strength += parent[0];
		parent[1].forEach(c => getStrength(c, strength + c[0], size + 1, strengths));
	}

	return strengths;
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
