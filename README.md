
# LocalServer

## General

A light weight development web server. Connects a folder and get http and https access to that folder. 

Simular to Pythons SimpleHTTPServer or http.server

### Usage

- Go to the target directory
  
run for options

    localserver --help

run default - current directory, http on port 8080, https on port 4443

    localserver


### Install

For global access:

clone into /usr/local/lib/node_modules/localserver/

run:

    npm install

make a symlink

    cd /usr/local/bin

    ln -s /usr/local/lib/node_modules/localserver/server.js localserver


Take it out for a spin!    