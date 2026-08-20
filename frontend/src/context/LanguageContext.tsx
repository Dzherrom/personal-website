import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LOCALE_STORAGE_KEY,
  LOCALES,
  translate,
  type Locale,
} from "../i18n/translations";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "es";

  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  return LOCALES.includes(stored as Locale) ? (stored as Locale) : "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "es" ? "en" : "es");
  }, [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback((key: string) => translate(locale, key), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
