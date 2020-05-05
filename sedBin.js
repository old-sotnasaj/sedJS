#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');

const argv = yargs
  .options({
    expression: {
      describe: 'Regex to be executed',
      array: true,
      alias: 'e',
      demandOption: false,
      nargs: 1,
      type: 'string',
    },
    quiet: {
      describe: 'Flush the output of the match',
      array: false,
      alias: ['quiet', 'n'],
      demandOption: false,
      nargs: 0,
      type: 'boolean',
      default: false,
    },
    inplace: {
      describe: 'Substitution in place, for a backup a [suffix] is necessary',
      array: false,
      alias: 'i',
      demandCommand: false,
      nargs: 0,
      type: 'boolean',
      default: false,
    },
    file: {
      describe:
        'You can specified a file path to save the output of the evaluation result',
      array: false,
      alias: 'f',
      demandCommand: false,
      nargs: 1,
      type: 'string',
    },
  })
  .demandCommand(1, 1)
  .help()
  .alias('help', 'h').argv;


if (validateRegex(argv._[0]) && validatePath(argv._[1])) {
    executeExpression(argv._[0]);
} 

function validateRegex(expression) {
    if (expression!==undefined) return true;
}

function validatePath(filePath) {
    if (filePath!==undefined) return true;
}

function executeExpression(expression) {
    let sfile = fs.createReadStream(argv._[1]);
    
    sfile.on('data', buff => {
        console.log(buff.toString());
    });
}

