#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');
const rl = require('readline');
const fileVal = require('./fileValidator');
const regexVal = require('./regexValidator');
const cmd = require('./cmd');

const argv = yargs
  .usage('Usage: $0 [options] <cmd>')
  .options({
    expression: {
      describe: 'Regex to be executed',
      array: false,
      alias: 'e',
      demandOption: false,
      nargs: 1,
      type: 'string',
      conflicts: 'f',
    },
    silent: {
      describe: 'Flush the output of the match',
      array: false,
      alias: ['quiet', 'n'],
      demandOption: false,
      nargs: 0,
      type: 'boolean',
      default: false,
    },
    inPlace: {
      describe: 'Substitution in place, for a backup a [suffix] is necessary',
      array: false,
      alias: 'i',
      demandCommand: false,
      nargs: 0,
      type: 'boolean',
      default: false,
    },
    file: {
      describe: 'You can specified a file with commands',
      array: false,
      alias: 'f',
      demandCommand: false,
      type: 'string',
      conflicts: 'e',
    },
  })
  .command('$0 <regex> <path>', '***IMPORTANTE , -f <archivo> overrides typed commands', (yargs) => {
    yargs
      .positional('regex', {
        describe: 'Regular expression to evaluate',
        type: 'string',
        array: false
      })
      .positional('path', {
        describe: 'File to be processed',
        type: 'string',
        array: false,
      });
  })
  .check((yargs) => {
    if (fileVal.checkReadExist(yargs.path)) {
      return true;
    }
    throw new Error('Some files seems to be wrong, give them a check ;) ');
  })
  .check((yargs) => {
    if (regexVal.validateCMD(yargs.regex)) {
      return true;
    }
    throw new Error('Some regex seems to be wrong, give them a check ;) ');
  })
  .check((yargs) => {
    if (yargs.e !== undefined) {
      let arr = [...yargs.e];
      if (regexVal.validateMulCMD(arr)) {
        return true;
      }
      throw new Error(
        'Some regex with -e seems to be wrong, give them a check ;) '
      );
    }
    return true;
  })
  .check((yargs) => {
    if (yargs.f === undefined) {
      return true;
    } else {
      if (fileVal.checkReadExist(yargs.f)) {
        return true;
      }
      throw new Error(
        'The file with commands seems to be wrong, give it a check ;) '
      );
    }
  })
  .demandCommand(1, 1).argv;

let flags = {
  n: argv.silent,
  i: argv.inPlace,
  e: argv.expression,
  f: argv.file
}

if (argv.file !== undefined) {
  let commandsFF = [];
  let lineReader = rl.createInterface({
    input: fs.createReadStream(argv.f),
  });
  lineReader.on('line', function (line) {
    commandsFF.push(line.toString());
  });
  lineReader.on('close', () => {
    cmd.executeExpression(commandsFF, argv.path,flags);
  });
} else if (argv.expression !== undefined) {
  let arrayRegex = [...argv.e];
  cmd.executeExpression(arrayRegex, argv.path, flags);
} else {
  let arrayRegex = [argv.regex];
  cmd.executeExpression(arrayRegex, argv.path, flags);
}
