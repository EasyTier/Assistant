import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/ConfigContext';
import { FormField } from '../common/FormField';
import { Select } from '../common/Select';
import { RepeatableField } from '../common/RepeatableField';

export function StepConnections() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();

  const methodOptions = [
    { value: 'manual', label: t('manualConfigPeers') },
    { value: 'standalone', label: t('standaloneMode') },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        {t('connectionsDesc')}
      </p>
      <FormField label={t('networkingMethod')} htmlFor="wz-method">
        <Select
          id="wz-method"
          value={config.networking_method}
          options={methodOptions}
          onChange={(v) =>
            updateConfig({ networking_method: v as 'manual' | 'standalone' })
          }
        />
      </FormField>

      {config.networking_method === 'manual' && (
        <FormField label={t('peers')} description={t('peerDesc')}>
          <RepeatableField
            values={config.peers?.map((p) => p.uri) ?? []}
            onChange={(uris) =>
              updateConfig({ peers: uris.map((uri) => ({ uri })) })
            }
            placeholder="tcp://host:11010"
            addLabel={t('addPeer')}
          />
        </FormField>
      )}
    </div>
  );
}
