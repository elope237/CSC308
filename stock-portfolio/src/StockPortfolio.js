// src/StockPortfolio.js
class StockPortfolio {
  constructor() {
    this.holdings = new Map(); // symbol -> shares (integer)
  }

  // true if no owned symbols
  isEmpty() {
    return this.holdings.size === 0;
  }

  // add shares to a symbol
  purchase(symbol, shares) {
    if (typeof symbol !== "string" || symbol.trim() === "") {
      throw new Error("Invalid symbol");
    }
    if (!Number.isInteger(shares) || shares <= 0) {
      throw new Error("Shares must be a positive integer");
    }
    const current = this.holdings.get(symbol) || 0;
    this.holdings.set(symbol, current + shares);
  }

  // subtract shares; throw if selling more than owned.
  sell(symbol, shares) {
    if (typeof symbol !== "string" || symbol.trim() === "") {
      throw new Error("Invalid symbol");
    }
    if (!Number.isInteger(shares) || shares <= 0) {
      throw new Error("Shares must be a positive integer");
    }
    const current = this.holdings.get(symbol) || 0;
    if (shares > current) {
      // EXACT required message (tests may assert exact text)
      throw new Error("Not possible to sell this number of shares.");
    }
    const remaining = current - shares;
    if (remaining === 0) {
      this.holdings.delete(symbol);
    } else {
      this.holdings.set(symbol, remaining);
    }
  }

  // how many unique ticker symbols currently owned
  countUniqueSymbols() {
    return this.holdings.size;
  }

  // number of shares for symbol (0 if missing)
  sharesOf(symbol) {
    if (typeof symbol !== "string" || symbol.trim() === "") return 0;
    return this.holdings.get(symbol) || 0;
  }
}

module.exports = StockPortfolio;
