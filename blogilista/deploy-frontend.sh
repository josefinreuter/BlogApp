#!/bin/sh
cd ..
cd blogilista-frontend
npm run build
rm -rf ../blogilista/build
cp -r build ../blogilista/
cd ..
cd blogilista