export type CurrencyCode = 'THB' | 'USD';

export interface FormatCurrencyOptions {
  currency: CurrencyCode;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

const currencyDefaults: Record<CurrencyCode, { locale: string; digits: number }> = {
  THB: { locale: 'th-TH', digits: 2 },
  USD: { locale: 'en-US', digits: 2 }
};

export const formatCurrency = (
  value: number,
  { currency, locale, minimumFractionDigits, maximumFractionDigits }: FormatCurrencyOptions
): string => {
  const defaults = currencyDefaults[currency];
  const digits = defaults.digits;

  return new Intl.NumberFormat(locale ?? defaults.locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: minimumFractionDigits ?? digits,
    maximumFractionDigits: maximumFractionDigits ?? digits
  }).format(value);
};

export interface FormatDecimalOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export const formatDecimal = (
  value: number,
  { locale, minimumFractionDigits, maximumFractionDigits }: FormatDecimalOptions = {}
): string =>
  new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
