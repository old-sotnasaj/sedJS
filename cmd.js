const fs = require('fs');
const groupsExp = require('./regexValidator').groupsExp;
const fileMngr = require('./fileValidator');
const rl = require('readline');
const backUpFile = 'file.bak';

function executeExpression(sedCMDS, file, options) {
  let patternSpace; // patternSpace .....
  let defualtWFlagFile = 'bak.up';// w flag file
  let writeToFile = false; // w flag
  let printDemand = false; // By p flag
  let match = false;
  let stringPipe = ''; // to write later
  let lineReader = rl.createInterface({ input: fs.createReadStream(file) });

  lineReader.on('line', function (line) {
    let replaceCMD, command;
    patternSpace = line.toString(); // Fill patterspace with original content

    for (let cmd of sedCMDS) {
      match = false; //reset match every loop
      command = groupsExp.exec(cmd); // get named groups of Regex
      // Generate the equivalent command to be applied
      replaceCMD = genRepCommand(command.groups.old, command.groups.flags);

      if (/(.*p.*)/.test(command.groups.flags)) printDemand = true; // print by demand
      if (replaceCMD.test(patternSpace)) match = true; // to check if it match (to print)
      //respective replacement of the content
      patternSpace = patternSpace.replace(replaceCMD, command.groups.new);

      if (/(.*w.*)/.test(command.groups.flags)) {
        writeToFile = true;
        if (command.groups.file !== undefined && command.groups.file!=='') {
          lastWFlagFile =  command.groups.file;
        }
      } 

    }
    if (!options.n && match) {
      console.log(patternSpace);
      if (options.i) stringPipe += patternSpace + '\n';
    }
    if (printDemand && match) {
      console.log(patternSpace);
      if (options.i) stringPipe += patternSpace + '\n';
    }
  });

  lineReader.on('close', () => {
    if(writeToFile) fileMngr.writeToFile(defualtWFlagFile, stringPipe);
    if (options.i) fileMngr.inPlace(file, backUpFile, stringPipe);
  });
}

function genRepCommand(oldStr, flags) {
  //first we checks if it is going to be both global and printed
  if (/(.*g.*I.*)|(.*I.*g.*)/.test(flags)) {
    return RegExp(oldStr, 'ig');
  }
  //first we checks if it is going to be just global
  if (/(.*g.*)/.test(flags)) {
    return RegExp(oldStr, 'g');
  }
  //first we checks if she is going to be just insesitive with us :C
  if (/(.*I.*)/.test(flags)) {
    return RegExp(oldStr, 'i');
  }

  return RegExp(oldStr);
}

module.exports = { executeExpression };
