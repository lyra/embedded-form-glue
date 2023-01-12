#!/bin/bash

kill $(lsof -t -i:8080)
kill $(lsof -t -i:3000)
kill $(lsof -t -i:9000)
kill $(lsof -t -i:9001)
kill $(lsof -t -i:9002)
kill $(lsof -t -i:9003)
kill $(lsof -t -i:9004)
kill $(lsof -t -i:9005)
kill $(lsof -t -i:9006)
kill $(lsof -t -i:9007)