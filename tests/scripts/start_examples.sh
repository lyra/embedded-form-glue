#!/bin/bash

cd examples_build
( cd server ; npm start) &
( cd angular ; http-server -p 9000) &
( cd ember ; http-server -p 9001) &
( cd ionic ; http-server -p 9002) &
( cd react ; http-server -p 9003) &
( cd next ; http-server -p 9004) &
( cd svelte ; http-server -p 9005) &
( cd vue-options ; http-server -p 9006) &
( cd vue-composition ; http-server -p 9007) &
( cd ../ ; http-server -p 8080) 
