/**
 * ==============================================================================
 * ATTRAVOYA SHARED CONFIG - CURRENCIES
 * ==============================================================================
 * Lists the officially supported currencies, their symbols, and regional flags.
 */

export const currencies = {
  USD: {
    code: "USD",
    symbol: "$",
    name: "United States Dollar",
    flagEmoji: "🇺🇸",
    decimalPlaces: 2
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    flagEmoji: "🇪🇺",
    decimalPlaces: 2
  },
  JPY: {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    flagEmoji: "🇯🇵",
    decimalPlaces: 0 // Yen doesn't use decimals!
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "Great British Pound",
    flagEmoji: "🇬🇧",
    decimalPlaces: 2
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
    flagEmoji: "🇦🇺",
    decimalPlaces: 2
  }
};

export const defaultCurrency = "USD";