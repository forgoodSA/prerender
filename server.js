#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    workers: process.env.PRERENDER_NUM_WORKERS,
    iterations: process.env.PRERENDER_NUM_ITERATIONS,
    pageDoneCheckTimeout: 300,
    resourceDownloadTimeout: 120000,
    waitAfterLastRequest: 5000,
    jsTimeout: 30000,
    port: 4000
});


server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());
// server.use(require('prerender-redis-cache'));

server.start();
