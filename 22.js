"use strict";

function calc() {
	const grid = input.split("\n").map(line => line.split(""));
	const x0 = Math.floor(grid[0].length / 2);
	const y0 = Math.floor(grid.length / 2)

	return getPart1(createMap(grid), x0, y0) + " " + getPart2(createMap(grid), x0, y0);
}

function createMap(grid) {
	let m = {};

	for (let y = 0; y < grid.length; ++y) {
		for (let x = 0; x < grid[y].length; ++x) {
			if (grid[y][x] == "#") {
				m[[x, y].join(",")] = "I";
			}
		}
	}

	return m;	
}

function getPart1(m, x, y) {
	let infected = 0;
	let dx = 0;
	let dy = -1;

	for (let iter = 0; iter < 10000; ++iter) {
		let key = [x, y].join(",");
		if (m[key] == "I") {
			[dx, dy] = [-dy, dx];
			m[key] = undefined;
		} else {
			[dx, dy] = [dy, -dx];
			m[key] = "I";
			++infected;
		}

		x += dx;
		y += dy;
	}

	return infected;	
}

function getPart2(m, x, y) {
	let infected = 0;
	let dx = 0;
	let dy = -1;

	for (let iter = 0; iter < 10000000; ++iter) {
		let key = [x, y].join(",");
		if (m[key] == "I") {
			[dx, dy] = [-dy, dx];
			m[key] = "F";
		} else if (m[key] == "W") {
			++infected;
			m[key] = "I";
		} else if (m[key] == "F") {
			[dx, dy] = [-dx, -dy];
			m[key] = undefined;
		} else {
			[dx, dy] = [dy, -dx];
			m[key] = "W";
		}

		x += dx;
		y += dy;
	}

	return infected;	
}

const input = `...##.#.#.####...###.....
..#..##.#...#.##.##.#..#.
.#.#.#.###....#...###....
.#....#..####.....##.#..#
##.#.#.#.#..#..#.....###.
#...##....##.##.#.##.##..
.....###..###.###...#####
######.####..#.#......##.
#..###.####..####........
#..######.##....####...##
...#.##.#...#.#.#.#..##.#
####.###..#####.....####.
#.#.#....#.####...####...
##...#..##.##....#...#...
......##..##..#..#..####.
.##..##.##..####..##....#
.#..#..##.#..##..#...#...
#.#.##.....##..##.#####..
##.#.......#....#..###.#.
##...#...#....###..#.#.#.
#....##...#.#.#.##..#..##
#..#....#####.....#.##.#.
.#...#..#..###....###..#.
..##.###.#.#.....###.....
#.#.#.#.#.##.##...##.##.#`;
