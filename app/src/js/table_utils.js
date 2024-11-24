
function create_thead(cols) {
  let str = `<thead>
                  <tr>
                    <th>Valores </th>
   `;
  for (let index = 0; index < cols; index++) {
    str += `
                    <th><a href="#" data-toggle="modal" data-target="#gameSummaryModal">Tema${index + 1}</a></th>
    `;
  }

  str += `
                  </tr>
                </thead>
  `
  return str;
}
function create_td(rows, cols) {
  let s = `
                    <td><a href="#" data-toggle="modal" data-target="#gameSummaryModal">Pregunta:Tema${cols}-${(rows + 1) * 100}</a></td>
`
  return s;
}

function create_tbody(rows, cols) {
  let str = `
                <tbody>
                `
  for (let index = 0; index < rows; index++) {
    str += `
                  <tr>
                    <td scope="row">${(index + 1) * 100}</td>
    `
    for (let jndex = 0; jndex < cols; jndex++) {
      str += create_td(index, jndex);
    }
    str += `
                  </tr>
    `
  }
  str += `
                </tbody>
  `
  return str;
}
function fillTable(rows, cols) {
  let generatedTable = create_thead(cols);
  generatedTable += create_tbody(rows, cols);
  mainTable.innerHTML = "";
  mainTable.innerHTML = generatedTable;

}
