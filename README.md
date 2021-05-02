# Tarea 3 Web Assembly

## Comandos

> emcc -s WASM=1 -s EXPORT_ES6=1 -s EXPORTED_FUNCTIONS="['_dijkstra', '_calloc']" -s EXPORTED_RUNTIME_METHODS="['getValue']" -o dijkstraWASM.js dijkstra.c