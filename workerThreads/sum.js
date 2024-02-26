const {workerData, parentPort} = require('worker_threads');

const n = workerData.n;
let sum = 0;

for(let i =1 ; i<= n ;i++){
    sum+=i;
}

parentPort.postMessage(sum)