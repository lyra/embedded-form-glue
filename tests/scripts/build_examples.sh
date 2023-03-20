#!/bin/bash

cd examples

echo "Removing angular node_modules"
rm -rf angular/node_modules
echo "Removing ember node_modules"
rm -rf ember/node_modules
echo "Removing ionic node_modules"
rm -rf ionic/node_modules
echo "Removing next node_modules"
rm -rf next/node_modules
echo "Removing react node_modules"
rm -rf rect/node_modules
echo "Removing server node_modules"
rm -rf server/node_modules
echo "Removing svelte node_modules"
rm -rf svelte/node_modules
echo "Removing vue options node_modules"
rm -rf vue/options/node_modules
echo "Removing vue composition node_modules"
rm -rf vue/composition/node_modules

echo "Installing server dependencies"
npm i --prefix server
echo "Installing angular dependencies"
npm i --prefix angular
echo "Installing ember dependencies"
npm i --prefix ember
echo "Installing ionic dependencies"
npm i --legacy-peer-deps --prefix ionic
echo "Installing next dependencies"
npm i --prefix next
echo "Installing react dependencies"
npm i --prefix react
echo "Installing vue options dependencies"
npm i --prefix vue/options
echo "Installing vue composition dependencies"
npm i --prefix vue/composition
echo "Installing svelte dependencies"
npm i --legacy-peer-deps --prefix svelte

cd ..
echo "Remove examples_build"
rm -rf examples_build

mkdir -p examples_build/react
mkdir examples_build/next
mkdir examples_build/svelte

cd examples

wait

echo "Build examples"
npm run build:example --prefix angular &&
npm run build:example --prefix ember &&
npm run build:example --prefix ionic &&
npm run build:example --prefix react &&
npm run build:example --prefix next &&
npm run build:example --prefix vue/options &&
npm run build:example --prefix vue/composition &&
npm run build:example --prefix svelte 
