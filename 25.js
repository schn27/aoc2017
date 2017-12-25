"use strict";

function calc() {
	const prog = parseInput(input);

	let tape = {};
	let cursor = 0;
	let state = prog.initState;
	let step = 0;

	while (step++ < prog.steps) {
		const act = prog[state][tape[cursor] || 0];
		tape[cursor] = act.write;
		cursor += act.move;
		state = act.continue;
	}

	return Object.values(tape).reduce((s, e) => s + e);
}

function parseInput(input) {
	let prog = {};
	let currentState;
	let currentAct;

	input.split("\n").forEach(line => {
		const tokens = line.split(" ");

		if (tokens.indexOf("Begin") >= 0) {
			prog.initState = line.split("state ")[1].split(".")[0];
		}

		if (tokens.indexOf("Perform") >= 0) {
			prog.steps = +line.match(/\d+/);
		}

		if (tokens.indexOf("In") >= 0) {
			let id = tokens[2].split(":")[0];
			prog[id] = [{}, {}];
			currentState = prog[id];
		}

		if (tokens.indexOf("If") >= 0) {
			currentAct = currentState[+line.match(/\d+/)];
		}

		if (tokens.indexOf("Write") >= 0) {
			currentAct.write = +line.match(/\d+/);
		}

		if (tokens.indexOf("Move") >= 0) {
			currentAct.move = (tokens.indexOf("right.") >= 0) ? 1 : -1;
		}

		if (tokens.indexOf("Continue") >= 0) {
			currentAct.continue = line.split("state ")[1].split(".")[0];
		}
	});

	return prog;	
}

const input = `Begin in state A.
Perform a diagnostic checksum after 12481997 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state C.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state D.

In state C:
  If the current value is 0:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state E.

In state D:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the right.
    - Continue with state B.

In state E:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state F.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state C.

In state F:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state D.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`;
