"use strict";
let table = document.getElementById("table");
let game = JSON.parse(sessionStorage.getItem("latestGame"));
let loadBtn = document.getElementById("loadBtn");
let playBtn = document.getElementById("playBtn");

let answerBox = document.getElementById("answer");
let questionBox = document.getElementById("question");
let playerBox = document.getElementById("playerBox");

let answerVal = document.getElementById("answerVal");
let questionVal = document.getElementById("questionVal");

const hide = (object) => object.setAttribute("hidden", "");
const unHide = (object) => object.removeAttribute("hidden");

console.log(game);

//table.innerHTML = "";

function loadTable(x) {
	let generatedTable = `
              <table class="table table-light mt-3" id="table" >
  `
	generatedTable += create_thead_full(x.cols, x.topics);
	generatedTable += create_tbody_full(x.rows, x.cols, x.topics);
	generatedTable += `
              </table>
  `

	table.innerHTML = generatedTable;

}
function create_players(playerNo) {

	let str = `<div class="row">`;

	for (let index = 0; index < playerNo; index++) {
		str += `<div class="col-md-${Math.floor(12 / playerNo)}">
				<h5>Equipo${index + 1}</h5>
				<div class=""> Scores </div>
				<div class="box"> </div>
			</div>`
	}
	str += `</div>`;
	return str;

}
function runGame(g) {
	let turnNo = 0;
	let state = 0;
	let players = document.getElementById("playerNo").value;

	hide(answerBox);
	hide(questionBox);
	playerBox.innerHTML = create_players(players);
	console.log(players);

	let maxTurns = g.cols * g.rows;
	for (let turn = 0; turn < maxTurns; turn++) {
		console.log(turn);

	}
	console.log("running");

}
const run_a_turn = (maxTurns) => (curTurn) => {
	if (curTurn == maxTurns) return;
	console.log(curTurn);

}

loadBtn.addEventListener("click", () => loadTable(game));
playBtn.addEventListener("click", () => runGame(game));
