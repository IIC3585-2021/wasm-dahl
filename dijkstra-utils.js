import Module from "./dijkstraWASM.js";

const calcBtn = document.getElementById("calc-btn");

Module().then(function (mymod) {
  calcBtn.onclick = () => {
    let cResult,
      cTime = cRunner(mymod);
    addToTable(cResult, cTime);
  };
});

const getArrayFromPtr = (myModule, ptr, N) => {
  let resultMatrix = [];
  for (let i = 0; i < N; i++) {
    resultMatrix[i] = myModule.getValue(ptr + i * 4, "i32");
  }
  return resultMatrix;
};

/*const graph = [
  [0, 10, 0, 30, 100],
  [10, 0, 50, 0, 0],
  [0, 50, 0, 20, 10],
  [30, 0, 20, 0, 60],
  [100, 0, 10, 60, 0],
];
*/
/*
const graph = [
  [0, 10, 0, 30, 100, 0],
  [10, 0, 50, 0, 0, 20],
  [0, 50, 0, 20, 10, 10],
  [30, 0, 20, 0, 60, 0],
  [100, 0, 10, 60, 0, 10],
  [20, 0, 10, 60, 0, 0],
];*/

/*const graph = [
  [0, 10, 0, 30, 100, 20],
  [10, 0, 50, 0, 0, 20],
  [0, 50, 0, 20, 10, 10],
  [30, 0, 20, 0, 60, 60],
  [100, 0, 10, 60, 0, 0],
  [20, 0, 10, 60, 0, 0],
];
*/
const graph = [
  [0, 4, 1, 3],
  [4, 0, 2, 1],
  [1, 2, 0, 5],
  [3, 1, 5, 0],
];

const makePtrOfArray = (myModule, N) => {
  const arrayPtr = myModule._calloc(N, 4);
  for (let i = 0; i < N; i++) {
    let rowsPtr = myModule._calloc(N, 4);
    myModule.setValue(arrayPtr + i * 4, rowsPtr, "i32");
    for (let j = 0; j < N; j++) {
      myModule.setValue(rowsPtr + j * 4, graph[i][j], "i32");
    }
  }
  return arrayPtr;
};

const cRunner = (Module) => {
  //let graph = getGraph();

  const arrayPtr = Module._calloc(10, 4);
  const G = makePtrOfArray(Module, 4);

  let startTime = window.performance.now();
  let result = Module._dijkstra(arrayPtr, G);
  let endTime = window.performance.now();
  console.log("result", result);

  let matrix = getArrayFromPtr(Module, arrayPtr, 5);

  console.log("matrix", matrix);

  return [999, 999];
};

const addToTable = (resultArr) => {
  const table = document.getElementById("result-table");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  cell1.innerHTML = `${resultArr[0]}`;
};
