"use strict";

function calc() {
	const states = parseInput(input);

	console.log(states);

	let tape = {};
	let cursor = 0;
	let state = states.initState;
	let step = 0;

	while (step++ < states.steps) {
		let value = tape[cursor] || 0;

		let act = states[state].act[value];
		tape[cursor] = act.write;
		cursor += act.move === "right" ? 1 : -1;
		state = act.continue;
	}

	console.log(tape);

	let part1 = Object.values(tape).reduce((s, e) => s + e);

	return part1;
}

function parseInput(input) {
	let states = {};
	let currentState = undefined;
	let currentAct = 0;

	input.split("\n").forEach(line => {
		if (states.initState == undefined) {
			states.initState = line.split(" ")[3].split(".").join("");
		} else if (states.steps == undefined) {
			states.steps = +line.split(" ")[5];
		} else {
			if (line.length == 0) {
				if (currentState != undefined) {
					states[currentState.id] = currentState;
					currentState = undefined;
				}
			} else {
				let tokens = line.split(" ");
				if (tokens.indexOf("In") >= 0) {
					currentState = {};
					currentState.id = tokens[2].split(":").join("");
					currentState.act = [undefined, undefined];
				}

				if (tokens.indexOf("If") >= 0) {
					currentAct = +tokens[tokens.indexOf("If") + 5].split(":").join("");
					currentState.act[currentAct] = {};
				}

				if (tokens.indexOf("Write") >= 0) {
					currentState.act[currentAct].write = 
						+tokens[tokens.indexOf("Write") + 3].split(".").join("");	
				}

				if (tokens.indexOf("Move") >= 0) {
					currentState.act[currentAct].move = 
						(tokens[tokens.indexOf("Move") + 5].split(".").join(""));	
				}

				if (tokens.indexOf("Continue") >= 0) {
					currentState.act[currentAct].continue = 
						(tokens[tokens.indexOf("Continue") + 3].split(".").join(""));
				}

			}
		}
	});

	if (currentState != undefined) {
		states[currentState.id] = currentState;
	}

	return states;	
}

const input2 = `Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`;

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
