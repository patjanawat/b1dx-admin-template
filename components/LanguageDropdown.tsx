import React from 'react';

export interface Language {
  id: string;
  label: string;
}

const LANGUAGES: Language[] = [
  { id: 'en', label: 'English' },
  { id: 'th', label: 'ไทย' },
];

interface LanguageDropdownProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="w-44 bg-popover rounded-xl shadow-2xl border border-border overflow-hidden py-1.5">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onSelect(lang.id)}
          className={`w-[calc(100%-12px)] mx-1.5 flex items-center px-4 py-2.5 text-sm transition-all rounded-lg ${
            selectedId === lang.id
              ? 'bg-accent text-accent-foreground font-semibold'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};