#!/bin/sh
cd ..
cd blogilista-frontend
npm install
CI=false npm run build
rm -rf ../blogilista/build
cp -r build ../blogilista/
cd ..
cd blogilista