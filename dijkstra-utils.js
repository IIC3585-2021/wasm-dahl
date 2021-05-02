import Module from "./dijkstraWASM.js"

const calcBtn = document.getElementById("calc-btn");

Module().then(function(mymod) {
  calcBtn.onclick = () => {
    let cResult, cTime = cRunner(mymod);
    addToTable(cResult, cTime);
    }
  }
)

const getArrayFromPtr = (myModule, ptr) => {
  let resultMatrix = [];
  for (let i = 0; i < 5; i++) {
    resultMatrix[i] = myModule.getValue(ptr + i * 4, "i32");
  }
  return resultMatrix;
}


const cRunner = (Module) => {
  //let graph = getGraph();

  const arrayPtr = Module._calloc(10, 4);

  let startTime = window.performance.now();
  let result = Module._dijkstra(arrayPtr);
  let endTime = window.performance.now();
  console.log('result', result);

  let matrix = getArrayFromPtr(Module, arrayPtr);

  console.log('matrix', matrix);

  return [999, 999];
}

const addToTable = (resultArr) => {
  const table = document.getElementById("result-table");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  cell1.innerHTML = `${resultArr[0]}`;
}