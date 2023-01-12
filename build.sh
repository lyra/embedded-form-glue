#!/bin/bash

mkdir -p examples_build/react
mkdir examples_build/next
mkdir examples_build/server
mkdir examples_build/svelte

cd examples

npm ci --prefix server && 
npm ci --prefix angular && 
npm ci --prefix ember && 
npm ci --legacy-peer-deps --prefix ionic && 
npm ci --prefix next && 
npm ci --prefix react && 
npm ci --prefix vue/options && 
npm ci --prefix vue/composition && 
npm ci --prefix svelte 

wait

npm run build:example --prefix angular &&
npm run build:example --prefix ember &&
npm run build:example --prefix ionic &&
npm run build:example --prefix react &&
npm run build:example --prefix next &&
npm run build:example --prefix vue/options &&
npm run build:example --prefix vue/composition &&
npm run build:example --prefix svelte 

wait

cp -R server ../examples_build/

gulp replaceKeys
