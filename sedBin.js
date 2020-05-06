#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');

const argv = yargs
  .usage('Usage: $0 [options] <cmd>')
  .command('$0 <regex> <path..>', '', (yargs) => {
    yargs
      .positional('regex', {
        describe: 'Regular expression to evaluate',
        type: 'string',
        conflicts: 'e',
      })
      .positional('path', {
        describe: 'File to be processed',
        type: 'string',
      });
  })
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
      describe: 'You can specified a file path commands',
      array: true,
      alias: 'f',
      demandCommand: false,
      nargs: 1,
      type: 'string',
    },
  })
  // . check to be implemented
  .demandCommand(1, 2).argv;

console.log(argv);
