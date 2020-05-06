const fs = require('fs');

// Sample data to make faster checks, it will be eventuallly removed
// const testFilePath = ['../empty.txt', '../other.txt'];

function checkReadExist(files) {
  for (let file of files) {
    access(file, constants.F_OK | constants.R_OK, (err) => {
      if (err) {
        let errorMsg;
        errorMsg = err.code === 'ENOENT' ? 'does not exist' : 'is not readable';
        console.error(file + ' ' + errorMsg);
        return false;
      }
    });
  }
  // If we get up to here it means that there are no errors , so we retrieve true
  return true;
}

module.exports =  { checkReadExist };
