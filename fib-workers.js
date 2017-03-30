const http = require('http');
const path = require('path');
const rpc = require('rpc');
const Xtemplate = require('xtemplate');

const workerPath = path.join(__dirname, 'worker.js');

const helloHandlers = [
    rpc.open(workerPath),
    rpc.open(workerPath),
    rpc.open(workerPath),
    rpc.open(workerPath),
];

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var svr = new http.Server(8000, function (req) {
    const idx = getRandomIntInclusive(0, 3); // random balance
    try {
        const tplRes = helloHandlers[idx].render(idx);
        req.response.write(tplRes);
    } catch (e) {
        console.log('error idx:', idx);
        throw e;
    }
});

svr.run();
