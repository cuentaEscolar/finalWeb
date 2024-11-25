"use strict";
let table = document.getElementById("table"); 
let game =  JSON.parse(sessionStorage.getItem("latestGame"));
let loadBtn = document.getElementById("loadBtn");
let playBtn = document.getElementById("playBtn");

let answerBox = document.getElementById("answer");
let questionBox = document.getElementById("question");

let answerVal = document.getElementById("answerVal");
let questionVal = document.getElementById("questionVal");

console.log(game);

//table.innerHTML = "";

function loadTable(x){
  let generatedTable = `
              <table class="table table-light mt-3" id="table" >
  `
  generatedTable += create_thead_full(x.cols, x.topics);
  generatedTable += create_tbody_full( x.rows, x.cols, x.topics);
  generatedTable += `
              </table>
  `

  table.innerHTML = generatedTable;

}
function runGame(g){
  let turnNo = 0;
  let state = 0;
	let players = document.getElementById("playerNo").value;
	console.log(players);
console.log("running");

}
loadBtn.addEventListener("click", ()=> loadTable(game));
playBtn.addEventListener("click", ()=> runGame(game));
