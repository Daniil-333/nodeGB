#!/usr/local/bin/node

const yargs = require('yargs');
// const readline = require('readline');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const {hideBin} = require("yargs/helpers");


/** 
 * node cli.js
 * 
 * 1. Возможность передавать путь к директории в программу. Это актуально, когда вы не хотите
 *    покидать текущую директорию, но надо просмотреть файл, находящийся в другом месте.
 * 2. В директории переходить во вложенные каталоги.
 * 3. Во время чтения файлов искать в них заданную строку или паттерн. 
*/

const executionDir = process.cwd();
const options = yargs
    .usage('Usage: -p <file path>')
    .option('p', {
        alias: 'path',
        describe: 'Directory path',
        type: 'string' || undefined,
        demandOption: false,
    }).argv;
const pathDir = path.resolve(options.p) ?? './';

const isFile = (fileName) => fs.lstatSync(fileName).isFile();
const list = fs.readdirSync( pathDir ).filter(isFile);

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list', // input, number, confirm, list, checkbox, password
        message: 'Выберите файл',
        choices: list,
    }
]).then(({ fileName }) => {
    console.log(argv.p)
    const fullPath = path.join(executionDir, fileName);
    const data = fs.readFileSync(fullPath, 'utf-8');

    console.log(data);
});