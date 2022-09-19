#!/bin/bash

cd examples_build
( cd server ; npm start) &
( cd angular ; http-server -p 9000) &
( cd emberjs ; http-server -p 9001) &
( cd ionic ; http-server -p 9002) &
( cd react ; http-server -p 9003) &
( cd next ; http-server -p 9004) &
( cd svelte ; http-server -p 9005) &
( cd vue ; http-server -p 9006) &
( cd ../ ; http-server -p 8080) 
