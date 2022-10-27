#!/usr/bin/env node

const fs = require('fs')
const {app,appSettings,start} = require("./localServer")


const {argv} = require('yargs')
        .scriptName("localServer")
        .usage("Usage: $0 [-f] [-p] [-s]")
        .example(
            "$0 -f ~/tmp -p 8080 -s 4443",
            "Starts a server in ~/tmp on port 8080 and https-server on port 4443."
        )
        .option("f", {
            alias: "folder",
            describe: "The folder with the static content. Defaults to current working directory",
            default: appSettings.directory,
            type: "string",
            nargs: 1,
        })
        .option("p", {
            alias: "http",
            describe: "The http port.",
            default: appSettings.ports.http,
            type: "number",
            nargs: 1,
        })
        .option("s", {
            alias: "https",
            describe: "The https port.",
            default: appSettings.ports.https,
            type: "number",
            nargs: 1,
        })

//console.log({argv})

const dir = argv.f;

if(fs.existsSync(dir)){
    const runSettings = {
        ports: {
            http:argv.p,
            https:argv.s
        },
        directory:argv.f
    }
    
    
    //console.log({runSettings})
    console.log(`\nlocalServer - starting in ${runSettings.directory} \n`)
    start(runSettings)
} else {
    console.log(`Directory ${dir} does not exist.`)
}




