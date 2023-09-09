#!/usr/bin/env bash
IFS=$'\n'       # make newlines the only separator
arquivos="$(ls -1 by_tomb_id/**/*{JPG,jpg} )"   

for arquivo in $arquivos; do
    echo $arquivo;
    echo  "${arquivo::(-3)}avif"
    
    convert $arquivo "${arquivo::(-3)}avif"
    rm $arquivo
done

echo "acabou"
