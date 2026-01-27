function div(a, b) {
  return a / b;
}

/* 
!isNaN(" ") (a space) is false in JavaScript (because " " gets coerced to 0), so !isNaN(" ") becomes true.
That means "hello world" incorrectly returns true just because it contains a space.
*/

function containsNumbers(text) {
  for (let i = 0; i < text.length; i++) {
    const ch = text.charAt(i);
    if (ch >= "0" && ch <= "9") return true;
  }
  return false;
}

exports.div = div;
exports.containsNumbers = containsNumbers;
