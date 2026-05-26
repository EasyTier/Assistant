import { Wand2, SlidersHorizontal, RotateCcw, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../context/ConfigContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { TargetOS } from '../types/config';

interface HeaderProps {
  mode: 'wizard' | 'expert';
  onModeChange: (mode: 'wizard' | 'expert') => void;
}

const osOptions = [
  { value: 'linux' as TargetOS, label: 'Linux' },
  { value: 'windows' as TargetOS, label: 'Windows' },
  { value: 'macos' as TargetOS, label: 'macOS' },
];

export function Header({ mode, onModeChange }: HeaderProps) {
  const { t } = useTranslation();
  const { config, updateConfig, resetConfig } = useConfig();

  const handleOSChange = (os: TargetOS) => {
    updateConfig({ target_os: os });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg)]/80 dark:bg-[var(--color-bg-dark)]/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <img src="/easytier.png" alt="EasyTier" className="w-8 h-8 rounded-lg shrink-0" />
          <h1 className="text-lg font-semibold text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] truncate">
            {t('appTitle')}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          {/* Platform selector */}
          <div className="hidden sm:inline-flex items-center gap-1.5 mr-1">
            <Monitor size={14} className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]" />
            <select
              value={config.target_os}
              onChange={(e) => handleOSChange(e.target.value as TargetOS)}
              className="text-sm bg-transparent text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:focus:ring-[var(--color-accent-dark)] cursor-pointer"
            >
              {osOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="inline-flex rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-hidden">
            <button
              type="button"
              onClick={() => onModeChange('wizard')}
              className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === 'wizard'
                  ? 'bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white'
                  : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surface-dark)]'
              }`}
            >
              <Wand2 size={14} />
              <span className="hidden sm:inline">{t('wizardMode')}</span>
            </button>
            <button
              type="button"
              onClick={() => onModeChange('expert')}
              className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === 'expert'
                  ? 'bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white'
                  : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surface-dark)]'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">{t('expertMode')}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={resetConfig}
            title={t('resetConfig')}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surface-dark)] transition-colors"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
