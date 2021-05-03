import Module from "./tspWASM.js";

const calcBtn = document.getElementById("calc-btn");
// Obtiene desde memoria los resultados del script en C
const getArrayFromPtr = (myModule, ptr, N) => {
  let resultMatrix = [];
  for (let i = 0; i < N; i++) {
    resultMatrix[i] = myModule.getValue(ptr + i * 4, "i32");
  }
  return resultMatrix;
};

// Setea en memoria la matriz para que sea accesible por el script en C
const graph = [
  [0, 4, 1, 3],
  [4, 0, 2, 1],
  [1, 2, 0, 5],
  [3, 1, 5, 0],
];

const dim = 4;
const dimResult = dim + 1;

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

// Ejecuta el script en C
const cRunner = (Module, arrayPtr, G) => {
  let startTime = window.performance.now();
  let result = Module._tsp(arrayPtr, G, dim);
  let endTime = window.performance.now();
  console.log("result", result);
  const resultTime = endTime - startTime;
  return resultTime;
};

// Hace interactuar en JS los modulos exportados con wasm.
Module().then(function (mymod) {
  calcBtn.onclick = () => {
    const arrayPtr = mymod._calloc(dim, 4);
    const G = makePtrOfArray(mymod, dim);
    let cTime = cRunner(mymod, arrayPtr, G);
    let matrix = getArrayFromPtr(mymod, arrayPtr, dimResult);
    console.log(`cresult - ctime ${matrix} ${cTime}`);
    addToTable(matrix, cTime);
  };
});

// Rellena el HTML con los resultados
const addToTable = (resultArr, execTime) => {
  const table = document.getElementById("result-table");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell1.innerHTML = `${resultArr[0]}`;
  cell2.innerHTML = `${resultArr.slice(1).join("->")}`;
  cell3.innerHTML = `${execTime} ms`;
};
