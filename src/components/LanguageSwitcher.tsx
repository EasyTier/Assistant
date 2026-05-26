import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="inline-flex rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-hidden">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`inline-flex items-center px-2 sm:px-3 py-1.5 text-sm font-medium transition-colors ${
            i18n.language === lang.code
              ? 'bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white'
              : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surface-dark)]'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
