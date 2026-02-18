
import React from 'react';

export interface Language {
  id: string;
  label: string;
}

const LANGUAGES: Language[] = [
  { id: 'en', label: 'English' },
  { id: 'fr', label: 'French' },
  { id: 'ar', label: 'Arabic' },
  { id: 'de', label: 'German' },
];

interface LanguageDropdownProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="w-44 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden py-1.5">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onSelect(lang.id)}
          className={`w-[calc(100%-12px)] mx-1.5 flex items-center px-4 py-2.5 text-sm transition-all rounded-lg ${
            selectedId === lang.id
              ? 'bg-indigo-50 text-indigo-600 font-semibold'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
