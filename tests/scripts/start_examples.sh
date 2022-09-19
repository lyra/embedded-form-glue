#!/bin/bash

cd examples_build
( cd server ; npm start) &
( cd angular ; npx http-server -p 9000) &
( cd emberjs ; npx http-server -p 9001) &
( cd ionic ; npx http-server -p 9002) &
( cd react ; npx http-server -p 9003) &
( cd next ; npx http-server -p 9004) &
( cd svelte ; npx http-server -p 9005) &
( cd vue ; npx http-server -p 9006) &
( cd ../ ; npx http-server -p 8080) 

