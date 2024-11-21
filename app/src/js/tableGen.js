'use strict';

let game = {

  rows: 0,
  cols: 0,
  title: "",
  topics: [],
  questions: [],
  answers: [],
  scores: [],
}

// Aquí obten el input de titulo
let title = document.getElementById("titleInput");
// Aquí busca y guarda el elemento del botón de Generar Tablero
let btnGameBoard = document.getElementById("boardGenerator");
// Aquí busca y guarda el elemento del botón de Generar JSON
let btnJsonStr = document.getElementById("jsonGenerator");
// aquí guarda la única tabla en el html (no tiene id)
let preTable = document.getElementsByClassName("table");
let mainTable = preTable[0];
// aquí guarda el botón de guardar de la ventana modal.
let btnSave = document.getElementById("btnSave");
let thead = mainTable.getElementsByTagName("thead")[0];
let tbody = mainTable.getElementsByTagName("tbody")[0];
let rows = document.getElementById("rowsInput");
let cols = document.getElementById("colsInput");
let rowsVal, colsVal; rowsVal = rows.value; colsVal = cols.value;
let theadRow = thead.childNodes[1].childNodes;
// almacenará la celda actual (cuando den clic en algún link a editar)
let cell;  // esta variable se usará después en la función de requestData()


// añade un handler a keyup para que cuando el titulo tenga texto se active el boton
//  y si no tiene que se desactive  (añade o quita la clase disabled)
let enabled = "btn btn-primary enabled ";
let disabled = "btn btn-primary disabled";
let current = disabled;
let buttonStateCur = 0;
const setClass = ((object) => object.setAttribute("class", current));
const saveGame = (() => {

  // guarda el titulo en el objeto game
  game.title = title.value;
  game.rows = parseInt(rows.value);
  game.cols = parseInt(cols.value);

  //guarda los valores  (si rows o cols es > 4 dejala en 4 si es menor a 2 dejala en 2)
  //afortunadamente eso se maneja solo C:


  // crea el arreglo de temas en el objeto game
  game.topics = [];
  theadRow.forEach((element) => {
    if (element.textContent === "Valores ") return;
    if (element.nodeName === "#text") return;
    if (element.hidden) return;
    return game.topics.push(element.textContent);
  });

  // crea la matriz de preguntas en el objeto game
  game.questions = [];
  tbody.childNodes.forEach((element) => {
    if (element.nodeName === "#text") return;
    if (element.hidden) return;
    //element.setAttribute("style", `nth-of-type(${});`);
    let questions_ = [];
    let first = true;
    element.childNodes.forEach((element2) => {
      if (element2.nodeName === "#text") return;
      if (first) { first = false; return; }
      if (element2.hidden) return;
      questions_.push("");
    });
    game.questions.push(questions_);
  });

});

const topicIndexGetter = ((topic) => game.topics.findIndex(topic));
const indexHelper = ((topic, question) => {
  let topic_i, question_i;
  topic_i = 0; question_i = 0;
  topic_i = topicIndexGetter(topic);
  if (topic_i === -1) return [-1, -1];
  let topicRow = game.questions[topic_i];
  question_i = topicRow.findIndex(question);
  if (question_i === -1) return [-1, -1];
  return [topic_i, question_i];
});
const getQuestion = (
  (topic_i, question_i) =>
    game.questions[topic_i][question_i]
);
const updateQuestion = (
  (topic_i, question_i) =>
  ((newVal) =>
    game.questions[topic_i][question_i] = newVal
  )
);

const enableDisableButtons = (() => {
  if (title.value.length === 0) {
    if (buttonStateCur === 0) return;
    buttonStateCur = 0;
    current = disabled;
  }
  else {
    if (buttonStateCur === 1) return;
    buttonStateCur = 1;
    current = enabled;
  }
  setClass(btnGameBoard);
  //console.log(btnGameBoard.getAttribute("data-target"))
  //setClass(btnJsonStr);
});
title.addEventListener("keyup", enableDisableButtons);

/*
*  Aquí añadele al botón de btnGameBoard un handler del evento click a la función generateGameBoard
*/
btnGameBoard.onclick = (generateGameBoard);

/* la función generar tablero:
*  guarda en el objeto game los valores de titulo, row y cols
*  además muestra la tabla pero oculta los renglones y columnas no necesarios
*/
function generateGameBoard(event) {
  console.log('generateGameBoard')
  // guarda en las variables title, rows, y cols los elementos correspondientes del html
  rows = document.getElementById("rowsInput");
  cols = document.getElementById("colsInput");
  title = document.getElementById("titleInput");
  rowsVal, colsVal; rowsVal = rows.value; colsVal = cols.value;
  //console.log(mainTable.innerHTML);

  //let title =  title;

  // oculta renglones y columnas innecesarios
  // tip: primero muestra todo (tr, td y th) puedes usar un forEach  (se puede en una línea de código)
  let i_rows = 0;
  tbody.childNodes.forEach((element) => {
    if (element.nodeName === "#text") return;
    element.removeAttribute("hidden");
    if (i_rows >= rowsVal) element.setAttribute("hidden", "");
    let i_cols = 0;
    element.childNodes.forEach((element2) => {
      if (element2.nodeName === "#text") return;
      element2.removeAttribute("hidden");
      if (i_cols > colsVal) element2.setAttribute("hidden", "");
      i_cols += 1;
    });
    i_rows += 1;
  });
  //console.log(theadRow);return;
  let i_cols = 0;
  theadRow.forEach((element) => {
    if (element.nodeName === "#text") return;
    //  console.log(element);
    element.removeAttribute("hidden");
    if (i_cols > colsVal) element.setAttribute("hidden", "");
    i_cols += 1;

  });
  // selecciona los reglones usando nth-of-type(n+ algo ) y oculta
  // selecciona las columnas usando nth-of type(n+ algo ) para td y th

  // muestra la tabla (propiedad hidden)
  mainTable.removeAttribute('hidden');
  saveGame();
  // activar botón de generateJson
  setClass(btnJsonStr);
  return false;


  // regresa falso o usa
  // event.preventDefault();
  // return false;

}

// Aquí asocia evento click a la función requestData(event)
mainTable.onclick = requestData;

// completa la función requestData(event)
let modalBody = document.getElementsByClassName("modal-body")[0];
let container = modalBody.childNodes[1];
let question = container.getElementsByClassName("question")[0];
let theme = container.getElementsByClassName("theme")[0];
let json = container.getElementsByClassName("json")[0];

function requestData(event) {
  // filtrar, si no son tipo anchor Tag salirse de la función

  // actualiza la variable cell (que sea una celda tipo td o th)
  let isTd = false;
  cell = event.target.closest("td");
  if (cell) isTd = true;
  else cell = event.target.closest("th");
  if (!cell) return;

  // console.log(container[0].childNodes);
  theme.setAttribute("hidden", "");
  question.setAttribute("hidden", "");
  json.setAttribute("hidden", "");
  // si están en un TH mostrar el modal solo la parte de la temática
  // Añade al valor el tema que se tiene guardado en el objeto
  let topic_i, question_i;
  topic_i = cell.parentNode.rowIndex; question_i = cell.cellIndex;
  if (!isTd) {
    theme.removeAttribute("hidden");
    theme.getElementsByTagName("input")[0].textContent = game.topics[topic_i];
  } else {
    // si están en un TD mostrar el modal solo la parte de la pregunta
    // Muestra el Tema y el valor
    // Muestra el valor de la pregunta
    question.removeAttribute("hidden");

    question.getElementsByTagName("textarea")[0].value = getQuestion(cell.parentNode.rowIndex - 1, cell.cellIndex - 1);
  }
  btnSave.onclick = curryPosition(cell.parentNode.rowIndex, cell.cellIndex);

}

// Aquí asocia al btnJsonStr el handler al hacer click con la función generateJson
btnJsonStr.onclick = generateJson;


// completa la función
function generateJson(event) {
  console.log("i");

  theme.setAttribute("hidden", "");
  question.setAttribute("hidden", "");
  json.removeAttribute("hidden");
  let textArea = json.getElementsByTagName("textarea")[0];
  textArea.value = JSON.stringify(game);
  // que solo muestre lo necesario para ver el JSON en la ventana modal
  return false;
}

// aquí asocia a btnSave
// btnSave.on
btnSave.onclick = curryPosition(-1, -1);
function curryPosition(topic_i, question_i) {
  if (topic_i === -1 || question_i === -1) return ((element) => (1));
  function saveTopic(event) {
    cell = mainTable.rows[topic_i].cells[question_i];
    game.topics[topic_i] = theme.getElementsByTagName("input")[0].value;
    cell.getElementsByTagName("a")[0].textContent = game.topics[topic_i];
  }
  function saveQuestion(event) {
    cell = mainTable.rows[topic_i].cells[question_i];
    cell.removeAttribute("class");
    updateQuestion(topic_i - 1, question_i - 1)(question.getElementsByTagName("textarea")[0].value);
    if (getQuestion(topic_i - 1, question_i - 1) != "") cell.setAttribute("class", "table-dark")
  }
  //  realiza las operaciones dependiendo en caso de pregunta o tema
  if (topic_i == 0) return saveTopic;
  return saveQuestion;

}
