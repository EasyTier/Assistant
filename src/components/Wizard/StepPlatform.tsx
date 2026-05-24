import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/ConfigContext';
import { getDefaultLogDir } from '../../types/config';
import type { TargetOS } from '../../types/config';

export function StepPlatform() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();

  const platforms: { value: TargetOS; label: string; desc: string }[] = [
    { value: 'linux', label: t('linux'), desc: t('linuxDesc') },
    { value: 'windows', label: t('windows'), desc: t('windowsDesc') },
    { value: 'macos', label: t('macos'), desc: t('macosDesc') },
  ];

  const handleSelect = (os: TargetOS) => {
    updateConfig({
      target_os: os,
      file_logger: {
        ...config.file_logger,
        dir: getDefaultLogDir(os),
      },
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        {t('platformDesc')}
      </p>
      <div className="grid grid-cols-1 gap-3">
        {platforms.map((p) => {
          const active = config.target_os === p.value;
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => handleSelect(p.value)}
              className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                active
                  ? 'border-[var(--color-accent)] dark:border-[var(--color-accent-dark)] bg-[var(--color-accent-bg)] dark:bg-[var(--color-accent-bg-dark)]'
                  : 'border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] hover:border-[var(--color-accent)] dark:hover:border-[var(--color-accent-dark)]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold shrink-0 ${
                  active
                    ? 'bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white'
                    : 'bg-[var(--color-code-bg)] dark:bg-[var(--color-code-bg-dark)] text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)]'
                }`}
              >
                {p.value === 'linux' && '🐧'}
                {p.value === 'windows' && '🪟'}
                {p.value === 'macos' && '🍎'}
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)]">
                  {p.label}
                </div>
                <div className="text-xs text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
                  {p.desc}
                </div>
              </div>
              {active && (
                <svg
                  className="ml-auto shrink-0 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
