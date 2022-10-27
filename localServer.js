const express = require('express')
const http = require('http')
const https = require('https')

const defaultPorts = {
    http:8080,
    https:4443
}

const appSettings = {
    ports: defaultPorts,
    directory: process.cwd()
}

var app = {}

const start = (settings) => {
    app = express();

    app.use(function (req, res, next) {
        console.log(`${req.protocol} ${req.url} `)
        next()
    })

    app.use(express.static(settings.directory, {index: false}))

    const httpServer = http.createServer(app)
    httpServer.listen(settings.ports.http)

    httpServer.on('listening', (ev) => {
        console.log(`HTTP server listening on port ${settings.ports.http}`)
    })

    var pem = require('pem')
    pem.createCertificate({ days: 1, selfSigned: true}, (err,keys) => {
        if (err) { 
            console.log(`Bogus SSL: ${err}`)
            throw err 
        }
    
        const httpsServer = https.createServer({
            key: keys.serviceKey,
            cert: keys.certificate
        }, app )

        httpsServer.listen(settings.ports.https);
        httpsServer.on('listening', (ev) => {
            console.log(`HTTPS server listening on port ${settings.ports.https}`)
        })

    });
}


module.exports = {
    app,
    appSettings,
    start
}

