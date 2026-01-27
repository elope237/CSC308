const myFunctions = require("./sample-functions.js");

test("div: 10 / 2 = 5", () => {
  expect(myFunctions.div(10, 2)).toBe(5);
});

test("div: decimals", () => {
  expect(myFunctions.div(1, 4)).toBeCloseTo(0.25);
});

test("containsNumbers: has digit", () => {
  expect(myFunctions.containsNumbers("abc3")).toBe(true);
});

test("containsNumbers: no digits", () => {
  expect(myFunctions.containsNumbers("abcdef")).toBe(false);
});

test("containsNumbers: empty string", () => {
  expect(myFunctions.containsNumbers("")).toBe(false);
});

// BUG
test("containsNumbers: spaces but no digits", () => {
  expect(myFunctions.containsNumbers("hello world")).toBe(false);
});
