"use strict";

function calc() {
	const prog = input.split("\n").map(line => line.split(" "));

	let regs = {pc: 0, a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, mulcnt: 0};

	while(step(prog, regs)) {
	}

	return regs.mulcnt + " " + part2();
}

function step(prog, regs) {
	if (regs.pc < 0 || regs.pc >= prog.length) {
		return false;
	}

	const a = prog[regs.pc][1];
	const b = prog[regs.pc][2];

	switch (prog[regs.pc][0]) {
	case "set":
		regs[a] = getV(regs, b);
		break;
	case "sub":
		regs[a] = getV(regs, a) - getV(regs, b);
		break;
	case "mul":
		regs[a] = getV(regs, a) * getV(regs, b);
		++regs.mulcnt;
		break;
	case "jnz":
		if (getV(regs, a) != 0) {
			regs.pc += getV(regs, b) - 1;
		}
		break;
	case "jgz":
		if (getV(regs, a) > 0) {
			regs.pc += getV(regs, b) - 1;
		}
		break;
	case "add":
		regs[a] = getV(regs, a) + getV(regs, b);
		break;
	}

	++regs.pc;

	return true;
}

function getV(regs, arg) {
	if (regs[arg] != undefined) {
		return +regs[arg];
	} else {
		return +arg;
	}
}

// manual reverse engineered code from the input
function part2() {
	let h = 0;
	for (let b = 105700; b <= 105700 + 17000; b += 17) {
		for (let d = 2; d < b; ++d) {
			if ((b % d) == 0) {
				++h;
				break;
			}
		}
	}

	return h;
}

const input = `set b 57
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`;
