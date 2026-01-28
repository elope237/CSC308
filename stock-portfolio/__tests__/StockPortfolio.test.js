/*

TDD Reflection (Task 3):

Yes, I was mostly able to follow the test-first (red-green-refactor) cycle in this assignment. 
Writing the test first helped me clarify the exact behavior I needed especially for edge cases like selling to zero shares and preventing selling more than owned.
The red step forced me to think about the interface and expected outcomes before writing implementation code, and the green step kept me focused on the minimum code required to pass.
Refactoring was useful after a few tests passed because I could safely clean up duplication and simplify the logic without breaking behavior.
Overall, TDD felt slower at the very beginning, but it made debugging easier and gave me confidence that changes didn’t break previous requirements.

*/

// __tests__/StockPortfolio.test.js
const StockPortfolio = require("../src/StockPortfolio");

describe("StockPortfolio basic behavior", () => {
  test("2.1: new portfolio is empty and sharesOf returns 0", () => {
    const p = new StockPortfolio();
    expect(p.isEmpty()).toBe(true);
    expect(p.sharesOf("AAPL")).toBe(0);
  });

  test("2.2: isEmpty false after purchase", () => {
    const p = new StockPortfolio();
    p.purchase("AAPL", 1);
    expect(p.isEmpty()).toBe(false);
  });

  test("2.3: purchase accumulates shares", () => {
    const p = new StockPortfolio();
    p.purchase("AAPL", 3);
    expect(p.sharesOf("AAPL")).toBe(3);
    p.purchase("AAPL", 2);
    expect(p.sharesOf("AAPL")).toBe(5);
  });

  test("2.4: selling subtracts shares", () => {
    const p = new StockPortfolio();
    p.purchase("AAPL", 5);
    p.sell("AAPL", 2);
    expect(p.sharesOf("AAPL")).toBe(3);
  });

  test("2.5: countUniqueSymbols counts only distinct owned symbols", () => {
    const p = new StockPortfolio();
    p.purchase("GMR", 5);
    p.purchase("RBLX", 10);
    expect(p.countUniqueSymbols()).toBe(2);
    p.purchase("GMR", 1);
    expect(p.countUniqueSymbols()).toBe(2);
  });

  test("2.6: symbol removed when shares reduced to zero", () => {
    const p = new StockPortfolio();
    p.purchase("AAPL", 2);
    expect(p.countUniqueSymbols()).toBe(1);
    p.sell("AAPL", 2);
    expect(p.sharesOf("AAPL")).toBe(0);
    expect(p.countUniqueSymbols()).toBe(0);
    expect(p.isEmpty()).toBe(true);
  });

  test("2.7: sharesOf returns 0 for missing symbol", () => {
    const p = new StockPortfolio();
    expect(p.sharesOf("MISSING")).toBe(0);
  });

  test("2.8: cannot sell more than owned - throws required message", () => {
    const p = new StockPortfolio();
    p.purchase("AAPL", 3);
    expect(() => p.sell("AAPL", 4)).toThrow(
      "Not possible to sell this number of shares.",
    );
  });

  // optional: validation tests for input
  test("validate purchase rejects non-positive shares", () => {
    const p = new StockPortfolio();
    expect(() => p.purchase("AAPL", 0)).toThrow();
    expect(() => p.purchase("AAPL", -1)).toThrow();
  });
});
