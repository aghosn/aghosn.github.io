#!/bin/sh

find . -type f -exec sed -i 's/http:\/\/localhost:4000/https:\/\/aghosn.github.io/g' {} \;
