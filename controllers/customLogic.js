const { Transform } = require('stream');

function getTransformObject() {
    const jsonToDb = new Transform({
        writableObjectMode: true,
        readableObjectMode: true,
        transform(chunk, encoding, callback) {
            
            // const used = process.memoryUsage().heapUsed / 1024 / 1024;
            // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
            
            this.records.push(chunk);
            // batch processing of records
            if (this.records.length == 10) {
                saveDataToDB(this.records)
                    .then((data) => {
                        // data is modified data
                        data.forEach((record) => {
                            this.push([...Object.values(record)])
                        });
                        // reset records for batch processing
                        this.records = [];
                        callback();
                    })
            }
            else {
                callback();
            }
        },
        flush(done) {
            // flush we repeat steps for last records,
            // eg total records 108, last 8 records are left to process
            if (this.records.length > 0) {
                saveDataToDB(this.records)
                    .then((data) => {
                        data.forEach((record) => {
                            this.push([...Object.values(record)])
                        })
                        this.records = [];
                        console.log('done processing')
                        done();
                    });
            } else {
                console.log('done processing')
                done();
            }
        }
    });
    jsonToDb.records = [];
    return jsonToDb;
}

function saveDataToDB(array) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // here data can be modified 
            console.log("##",array)
            resolve(array.map(e => ({ ...e, id: Math.floor((Math.random() * 10) + 1) })))
        }, 10)
    })
}

module.exports = {
    getTransformObject
}