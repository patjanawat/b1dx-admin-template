'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const stored = localStorage.getItem('language');
    if (stored && stored !== i18n.language) {
      i18n.changeLanguage(stored);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
