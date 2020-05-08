const fs = require('fs');

function checkReadExist(file) {
  fs.accessSync(file, fs.constants.F_OK | fs.constants.R_OK, (err) => {
    if (err) {
      let errorMsg;
      errorMsg = err.code === 'ENOENT' ? 'does not exist' : 'is not readable';
      console.log(file + ' lol ' + errorMsg);
      return false;
    }
  });

  // If we get up to here it means that there are no errors , so we retrieve true
  return true;
}

function inPlace(oldF, newF, content) {
  fs.writeFile(newF,content, (err) => {
    if (err) throw err;
    fs.unlink(oldF, (err) => {
      if (err) throw err;
      fs.rename(newF, oldF, (err) => {
        if (err) throw err;
        console.log('\nModified [-i] \n');
      });
    });
  });
}

function writeToFile(file, content){
  fs.writeFile(file,content, (err) => {
    if (err) throw err;
    console.log('\nCreated [ /w ] '+file+'\n');
  });
}

module.exports = { checkReadExist, inPlace , writeToFile};
