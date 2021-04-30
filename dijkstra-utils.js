import Module from "./dijkstraWASM.js"

const calcBtn = document.getElementById("calc-btn");

Module().then(function(mymod) {
  calcBtn.onclick = () => {
    let cResult, cTime = cRunner(mymod);
    addToTable(cResult, cTime);
    }
  }
)

const getGraph = (n=7) => {
  let Graph = [];
  for (let i = 0; i < n; i++) {
    Graph[i] = new Array(n);
  }

  Graph[0][0] = 0;
  Graph[0][1] = 0;
  Graph[0][2] = 1;
  Graph[0][3] = 2;
  Graph[0][4] = 0;
  Graph[0][5] = 0;
  Graph[0][6] = 0;

  Graph[1][0] = 0;
  Graph[1][1] = 0;
  Graph[1][2] = 2;
  Graph[1][3] = 0;
  Graph[1][4] = 0;
  Graph[1][5] = 3;
  Graph[1][6] = 0;

  Graph[2][0] = 1;
  Graph[2][1] = 2;
  Graph[2][2] = 0;
  Graph[2][3] = 1;
  Graph[2][4] = 3;
  Graph[2][5] = 0;
  Graph[2][6] = 0;

  Graph[3][0] = 2;
  Graph[3][1] = 0;
  Graph[3][2] = 1;
  Graph[3][3] = 0;
  Graph[3][4] = 0;
  Graph[3][5] = 0;
  Graph[3][6] = 1;

  Graph[4][0] = 0;
  Graph[4][1] = 0;
  Graph[4][2] = 3;
  Graph[4][3] = 0;
  Graph[4][4] = 0;
  Graph[4][5] = 2;
  Graph[4][6] = 0;

  Graph[5][0] = 0;
  Graph[5][1] = 3;
  Graph[5][2] = 0;
  Graph[5][3] = 0;
  Graph[5][4] = 2;
  Graph[5][5] = 0;
  Graph[5][6] = 1;

  Graph[6][0] = 0;
  Graph[6][1] = 0;
  Graph[6][2] = 0;
  Graph[6][3] = 1;
  Graph[6][4] = 0;
  Graph[6][5] = 1;
  Graph[6][6] = 0;

  return Graph;
}

const cRunner = (Module) => {
  let graph = getGraph();
  let startTime = window.performance.now();
  let result = Module._dijkstra(graph, 7, 0);
  let endTime = window.performance.now();

  console.log('result', result);
  return result, endTime - startTime
}

// aqui arroja error
const addToTable = (resultArr) => {
  const table = document.getElementById("result-table");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell2.innerHTML = `${resultArr[0]}`;
  cell3.innerHTML = `${resultArr[1]} ms`;
}