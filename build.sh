#!/bin/bash

mkdir -p examples_build/react/minimal
mkdir examples_build/react/next
mkdir examples_build/server
mkdir examples_build/svelte

cd examples

npm run build:example --prefix angular/minimal-example &
npm run build:example --prefix emberjs &
npm run build:example --prefix ionic/minimal-example &
npm run build:example --prefix react/minimal-example &
npm run build:example --prefix react/next-minimal &
npm run build:example --prefix vuejs/minimal-example &
npm run build:example --prefix svelte/minimal-example 

wait

cp -R server ../examples_build/

echo "DONE!"

