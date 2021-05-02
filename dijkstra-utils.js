import Module from "./dijkstraWASM.js"

const calcBtn = document.getElementById("calc-btn");

Module().then(function(mymod) {
  calcBtn.onclick = () => {
    let cResult, cTime = cRunner(mymod);
    addToTable(cResult, cTime);
    }
  }
)

const cRunner = (Module) => {
  //let graph = getGraph();
		

  let startTime = window.performance.now();
  let result = Module._dijkstra(7, 0);
  let endTime = window.performance.now();

  console.log('result', result);
  return result, endTime - startTime
}

const addToTable = (resultArr) => {
  const table = document.getElementById("result-table");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell2.innerHTML = `${resultArr[0]}`;
  cell3.innerHTML = `${resultArr[1]} ms`;
}