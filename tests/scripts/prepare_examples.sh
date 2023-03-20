echo "Copy server to examples_build"
mkdir examples_build/server
cd examples
cp -R server ../examples_build/
cd ../examples_build/server
echo "Install server dependencies"
npm install
cd ../..
echo "Replace keys"
npx gulp replaceKeys