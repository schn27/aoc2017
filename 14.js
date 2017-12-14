"use strict";

function calc() {
	let map = [];
	let used = 0;

	for (let row = 0; row < 128; ++row) {
		const hash = knotHash(input + "-" + row);
		
		let rowValues = [];

		hash.forEach(byte => {
			for (let i = 7; i >= 0; --i) {
				const bit = (byte >> i) & 1;
				rowValues.push(bit ? -1 : 0);
				used += bit;
			}
		});

		map.push(rowValues);
	}

	let group = 0;

	for (let row = 0; row < 128; ++row) {
		for (let col = 0; col < 128; ++col) {
			if (map[row][col] == -1) {
				markGroup(map, row, col, ++group);
			}
		}
	}

	return used + " " + group;
}

function markGroup(map, row, col, group) {
	if (row >= 0 && col >= 0 && row < 128 && col < 128 && map[row][col] == -1) {
		map[row][col] = group;
		markGroup(map, row + 1, col, group);
		markGroup(map, row - 1, col, group);
		markGroup(map, row, col + 1, group);
		markGroup(map, row, col - 1, group);
	}
}

function knotHash(str) {
	const lengths = [...str.split("").map(c => c.charCodeAt()), 17, 31, 73, 47, 23];
	const sparse = knotHashRound(lengths, 64);
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

	return dense;
}

function knotHashRound(lengths, repeat) {
	let list = [...Array(256).keys()];
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


const input = "nbysizxe";
