import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/ConfigContext';
import { FormField } from '../common/FormField';
import { Select } from '../common/Select';

const levelOptions = [
  { value: 'trace', label: 'Trace' },
  { value: 'debug', label: 'Debug' },
  { value: 'info', label: 'Info' },
  { value: 'warn', label: 'Warn' },
  { value: 'error', label: 'Error' },
];

export function SectionLogging() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();

  return (
    <section id="logging" className="scroll-mt-14">
      <h2 className="text-xl font-semibold text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] mb-4">
        {t('logging')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={t('consoleLogLevel')} htmlFor="console-level">
          <Select
            id="console-level"
            value={config.console_logger?.level ?? 'warn'}
            options={levelOptions}
            onChange={(v) =>
              updateConfig({
                console_logger: { level: v, ...(config.console_logger ?? {}) },
              })
            }
          />
        </FormField>

        <FormField label={t('fileLogLevel')} htmlFor="file-level">
          <Select
            id="file-level"
            value={config.file_logger?.level ?? 'info'}
            options={levelOptions}
            onChange={(v) =>
              updateConfig({
                file_logger: { level: v, ...(config.file_logger ?? {}) },
              })
            }
          />
        </FormField>

        <FormField label={t('logDir')} htmlFor="file-dir">
          <input
            id="file-dir"
            type="text"
            value={config.file_logger?.dir ?? ''}
            onChange={(e) =>
              updateConfig({
                file_logger: { ...(config.file_logger ?? {}), dir: e.target.value },
              })
            }
            placeholder="/tmp/easytier"
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[var(--color-surface-dark)] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)] focus:shadow-md transition-shadow border-0"
          />
        </FormField>

        <FormField label={t('logFileName')} htmlFor="file-name">
          <input
            id="file-name"
            type="text"
            value={config.file_logger?.file ?? ''}
            onChange={(e) =>
              updateConfig({
                file_logger: { ...(config.file_logger ?? {}), file: e.target.value },
              })
            }
            placeholder="easytier"
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[var(--color-surface-dark)] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-border)] dark:focus:ring-[var(--color-border-dark)] focus:shadow-md transition-shadow border-0"
          />
        </FormField>
      </div>
    </section>
  );
}
