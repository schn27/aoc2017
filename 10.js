"use strict";

function calc() {
	return part1() + " " + part2();
}

function part1() {
	const lengths = input.split(",").map(Number);
	let list = knotHash([...Array(256).keys()], lengths, 1);
	return list[0] * list[1];	
}

function part2() {
	const lengths = [...input.split("").map(c => c.charCodeAt()), 17, 31, 73, 47, 23];
	const sparse = knotHash([...Array(256).keys()], lengths, 64);
	let dense = [];
	let xor = 0;
	let n = 0;
	sparse.forEach(e => {
		xor ^= e;
		if (++n == 16) {
			dense.push(xor);
			xor = 0;
			n = 0;
		}
	});

	return dense.map(e => ("0"+(e.toString(16))).slice(-2)).join("");
}

function knotHash(list, lengths, repeat) {
	let pos = 0;
	let skip = 0;

	while (repeat-- > 0) {
		lengths.forEach(len => {
			let subList = [...list, ...list].slice(pos, pos + len).reverse();

			for (let j = 0; j < len; ++j) {
				list[(pos + j) % list.length] = subList[j];
			}

			pos = (pos + len + skip++) % list.length;
		});
	}

	return list;
}

let input = `212,254,178,237,2,0,1,54,167,92,117,125,255,61,159,164`;
