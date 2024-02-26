const http = require('http');
const qs = require('querystring')
const url = require('url');
const {Worker} = require('worker_threads')

function findSum(n, cb){
    let sum =0;
    function add (i, cb){
        sum +=i;
        if(i==n)  return cb(sum);
        setImmediate(()=>{
            add( i+1, cb)
        })
        // add(i+1,cb)
    }
    add(1, cb)

}
function add(n){
    let sum=0;
  for(let i=0;i<n;i++){
sum+=i;
  }
  return String(sum);
}


function findSumUsingThreads(n){
    return new Promise((resolve, reject)=>{
        const worker =  new  Worker('./workerThreads/sum.js', {workerData:{n}});
        worker.on('message',resolve)
        worker.on('error',reject )
    })

}
const server = http.createServer(async (req, res) => {
    res.write('your request is being processed ')
    const query = url.parse(req.url).query;
    const n = Number(qs.parse(query)['n']);
      if(n>10000000000){
        res.end('please enter smaller number than 100000')
    }
    // res.end(add(n))

    const a = await findSumUsingThreads(n);
    res.end('sum is     '+String(a))

    // findSum(n, (sum)=>{res.end(`the sum is ${sum}`)})
  
})
server.listen(3000, () => {
    console.log('server running on 3000')
})


