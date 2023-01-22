#!C:\Program Files\nodejs\node

const readline = require('readline');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');


/** 
 * node cli.js
 * 
 * 1. Возможность передавать путь к директории в программу. Это актуально, когда вы не хотите
 *    покидать текущую директорию, но надо просмотреть файл, находящийся в другом месте.
 * 2. В директории переходить во вложенные каталоги.
 * 3. Во время чтения файлов искать в них заданную строку или паттерн. 
*/

// const options = yargs
//     .usage('Usage: -p <file path>')
//     .option('p', {
//         alias: 'path',
//         describe: 'File path',
//         type: 'string',
//         demandOption: true,
//     }).argv;
//
// console.log(options)

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question('Введите путь до файла: ', (filePath) => {
//     console.log(filePath);
//     rl.question('Введите кодировку файла: ', (encoding) => {
//         console.log(encoding);
//         rl.close();
//     });
// });
//
// const question = (query) => new Promise(resolve => rl.question(query, resolve));
//
// (async () => {
//     const filePath = await question('Введите путь до файла: ');
//     const encoding = await question('Введите кодировку файла: ');
//
//     const fullPath = path.join(__dirname, filePath);
//     const data = await fs.readFile(fullPath, encoding);
//
//     console.log(data);
//     rl.close();
// })();
const executionDir = process.cwd();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();
const list = fs.readdirSync('./').filter(isFile);

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list', // input, number, confirm, list, checkbox, password
        message: 'Выберите файл',
        choices: list,
    }
]).then(({ fileName }) => {
    const fullPath = path.join(executionDir, fileName);
    const data = fs.readFileSync(fullPath, 'utf-8');

    console.log(data);
});