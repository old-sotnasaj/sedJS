const stringTest = 's/poko/ipoiji/gI';
const sedVal = RegExp(`^(s)(\/)(.*)(\/)(.*)(\/)(?<flags>(I|p|g|w){0,4})$`);


console.log(validateRegex(stringTest));

function validateRegex(expression) {
  let isOK = sedVal.exec(expression);
  if (isOK !== null) {
    if (isOK.groups.flags.length > 0) {
      return uniqueChars(isOK.groups.flags);
    } else if (isOK.groups.flags.length === 0) return true;
  }
  return false;
}

function uniqueChars(chars) {
  for (let i = 0; i < chars.length - 1; i++) {
    for (let b = i + 1; b <= chars.length - 1; b++) {
      if (chars[i] === chars[b]) return false;
    }
  }
  return true;
}
module.exports = { validateRegex };

/* 

 let isOK = sedVal.test(expression);
  return isOK ? true : false ? (sedVal.gr)
const sedExp = RegExp(`^(?<command>s)\
  (?<openslash>\/)\
  (?<old>.*)\
  (?<slash>\/)\
  (?<new>.*)\
  (?<closeslash>\/)\
  (?<flags>(I|p|g|w){0,4})$`);

*/
