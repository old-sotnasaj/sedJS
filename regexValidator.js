const checkExp = RegExp(
  `^(s)(\/)(.*)(\/)(.*)(\/)(?<flags>(I|p|g|w){0,4})(?<file>.*)`
);
const groupsExp = RegExp(`^(?<command>s)\
(?<openslash>\/)\
(?<old>.*)\
(?<slash>\/)\
(?<new>.*)\
(?<closeslash>\/)\
(?<flags>(I|p|g|w){0,4})\
(?<file>.*)`);

var wFlag = false;

function validateCMD(expression) {
  let valid = false;
  let isOK = expression.match(checkExp);
  if (isOK !== null) {
    if (isOK.groups.flags.length > 0) {
      valid = uniqueChars(isOK.groups.flags);
    } else if (isOK.groups.file !== '' && !wFlag) valid = false;
  }
  return valid;
}

function validateMulCMD(some) { return true};
/*function validateMulCMD(regex) {
  for (let reg of regex) {
    let isOK = checkExp.exec(regex);
    if (isOK !== null) {
      if (isOK.groups.flags.length > 0) {
        if (!uniqueChars(isOK.groups.flags)) return false;
      }
    } else return false;
  }
  return true;
} */

function uniqueChars(chars) {
  for (let i = 0; i < chars.length - 1; i++) {
    for (let b = i + 1; b <= chars.length - 1; b++) {
      if (chars[i] === 'w') wFlag = true;
      if (chars[i] === chars[b]) return false;
    }
  }
  return true;
}
module.exports = { validateCMD, validateMulCMD, groupsExp };
