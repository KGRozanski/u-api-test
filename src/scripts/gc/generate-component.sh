#!/bin/bash

node "./src/scripts/gc/genrate-cmp.js" $1;
node "./src/scripts/gc/register-cmp-themes.js";
ng g c $1
