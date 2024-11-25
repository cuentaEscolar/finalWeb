"use strict";
let table = document.getElementById("table"); 
let game =  JSON.parse(sessionStorage.getItem("latestGame"));
let loadBtn = document.getElementById("loadBtn");
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
function runGame(){

}
loadBtn.addEventListener("click", ()=> loadTable(game));
