#!/bin/bash

node "./src/scripts/genrate-cmp.js" $1;
node "./src/scripts/register-cmp-themes.js";
ng g c $1
