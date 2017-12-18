"use strict";

function calc() {
	const prog = input.split("\n").map(line => line.split(" "));

	let regs0 = {id: 0, pc: 0, p: 0, snd: 0};
	let regs1 = {id: 1, pc: 0, p: 1, snd: 0};
	let pipes = [[], []];

	let deadlock = false;

	while (!deadlock) {
		let cnt0 = 0;
		let cnt1 = 0;

		while (step(prog, regs0, pipes)) {
			++cnt0;
		}

		while (step(prog, regs1, pipes)) {
			++cnt1;
		}

		deadlock = (cnt0 == 0) && (cnt1 == 0);
	}

	return regs1["snd"];
}

function step(prog, regs, pipes) {
	if (regs.pc < 0 || regs.pc >= prog.length) {
		return false;
	}

	const a = prog[regs.pc][1];
	const b = prog[regs.pc][2];

	let lock = false;

	switch (prog[regs.pc++][0]) {
	case "set":
		regs[a] = getV(regs, b);
		break;
	case "mul":
		regs[a] = getV(regs, a) * getV(regs, b);
		break;
	case "jgz":
		if (getV(regs, a) > 0) {
			regs.pc += getV(regs, b) - 1;
		}
		break;
	case "add":
		regs[a] = getV(regs, a) + getV(regs, b);
		break;
	case "mod":
		regs[a] = getV(regs, a) % getV(regs, b);
		break;
	case "snd":
		pipes[regs.id].push(getV(regs, a));
		++regs.snd;
		break;
	case "rcv":
		const pipe = pipes[regs.id ^ 1];
		if (pipe.length > 0) {
			regs[a] = pipe[0];
			pipe.shift();
		} else {
			lock = true;
		}
		break;
	}

	return !lock && regs.pc >= 0 && regs.pc < prog.length;
}

function getV(regs, arg) {
	if (regs[arg] != undefined) {
		return +regs[arg];
	} else {
		return +arg;
	}
}

const input = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 316
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`;
