/**
 * ==============================================================================
 * ATTRAVOYA SHARED CONFIG - LANGUAGES
 * ==============================================================================
 * Lists translation interface languages and Right-to-Left (RTL) indicators.
 */

export const languages = {
  en: {
    code: "en",
    name: "English",
    localName: "English",
    flagEmoji: "🇺🇸",
    isRtl: false // Standard left-to-right reading
  },
  fr: {
    code: "fr",
    name: "French",
    localName: "Français",
    flagEmoji: "🇫🇷",
    isRtl: false
  },
  ja: {
    code: "ja",
    name: "Japanese",
    localName: "日本語",
    flagEmoji: "🇯🇵",
    isRtl: false
  },
  es: {
    code: "es",
    name: "Spanish",
    localName: "Español",
    flagEmoji: "🇪🇸",
    isRtl: false
  }
};

export const defaultLanguage = "en";