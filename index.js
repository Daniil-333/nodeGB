const readline = require('readline');
const fs = require('fs');
const ACCESS_LOG = './access_tmp.log';
const IP1 = '89.123.1.41';
const IP2 = '34.48.240.111';


/** 
 * node index.js
 * 
 * Напишите программу, которая находит в этом файле все записи с ip-адресами 89.123.1.41 и 34.48.240.111, 
 * а также сохраняет их в отдельные файлы с названием %ip-адрес%_requests.log. 
*/

class WriteStream {
    constructor(ip) {
        this.ip = ip;

        return fs.createWriteStream(`./${this.ip }_requests.log`, {
            encoding: 'utf-8',
            flags: 'a'
        })
    }
}

const readInterface = readline.createInterface({
    input: fs.createReadStream(ACCESS_LOG),
});

const writeStreamIP1 = new WriteStream(IP1);
const writeStreamIP2 = new WriteStream(IP2);

readInterface.on('line', function(line) {
    if(line.length) {

        if(/89\.123\.1\.41/.test(line)) {
            writeStreamIP1.write(`${line}\n`);
        }

        if(/34\.48\.240\.111/.test(line)) {
            writeStreamIP2.write(`${line}\n`);
        }
    }
});