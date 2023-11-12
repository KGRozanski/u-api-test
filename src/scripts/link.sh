#!/bin/bash

cd ../fadein/dist

npm link

cd ../../u-api-test/node_modules

npm link @fadein/commons