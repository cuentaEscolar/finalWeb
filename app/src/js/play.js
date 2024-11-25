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
  generatedTable += create_thead(x.cols);
  generatedTable += create_tbody( x.rows, x.cols);
  generatedTable += `
              </table>
  `

  table.innerHTML = generatedTable;
}
loadBtn.addEventListener("click", ()=> loadTable(game));
