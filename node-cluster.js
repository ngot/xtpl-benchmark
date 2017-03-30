'use strict';

const cluster = require('cluster');
const http = require('http');
const fs = require('fs');
const Xtemplate = require('xtemplate');
const numCPUs = require('os').cpus().length;

const tpl = fs.readFileSync('./tpl.xtpl').toString();

console.log(tpl);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    const r = new Xtemplate(tpl).render({ a: 'for test' });
    res.end(r);
    // res.end('hello world\n');
  }).listen(8000);
  console.log(`Worker ${process.pid} started`);
}