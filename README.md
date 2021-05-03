# Tarea 3 Web Assembly

## Comandos

> emcc -s WASM=1 -s EXPORT_ES6=1 -s EXPORTED_FUNCTIONS="['_tsp', '_calloc', '_free']" -s EXPORTED_RUNTIME_METHODS="['getValue', 'setValue']" -o tspWASM.js tsp.c

Si el comando anterior no funciona se deben setear las variables de entorno:

> source "insertar_path_absoluto/emsdk/emsdk_env.sh"
