import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="inline-flex rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-hidden">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors ${
            i18n.language === lang.code
              ? 'bg-[var(--color-text-h)] dark:bg-[var(--color-text-h-dark)] text-white dark:text-black'
              : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-accent-bg)] dark:hover:bg-[var(--color-accent-bg-dark)]'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
