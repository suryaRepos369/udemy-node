const os = require('os')
const fs = require('fs')

//creating a file 

const filename = 'cpu1.txt'
const cpuInfo = os.cpus();

async function readAndWrite() {
    try {
        if (fs.existsSync(filename)) {

            const readableStream = fs.createReadStream(filename);
            readableStream.on('data', (chunk) => {
                console.log(chunk.toString())
            })
            readableStream.on('end', (error) => {
                console.log('Finished reading exiting ...')
            })

            readableStream.on('error', (error) => {
                throw new Error(error)
            })
        }
        else {
            await fs.promises.writeFile(filename, JSON.stringify(cpuInfo));
            console.log('file written successfully ')

        }
    }
    catch (error) {
        console.log('caught on err', error)
    }

}

readAndWrite();