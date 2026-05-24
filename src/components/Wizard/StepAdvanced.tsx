import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/ConfigContext';
import { FormField } from '../common/FormField';
import { Toggle } from '../common/Toggle';
import { Select } from '../common/Select';

export function StepAdvanced() {
  const { t } = useTranslation();
  const { config, updateFlags } = useConfig();
  const flags = config.flags ?? {};

  const setFlag = (key: string, value: string | number | boolean) => {
    updateFlags({ [key]: value });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        {t('advancedDesc')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={t('encryptionAlgorithm')} htmlFor="wz-enc">
          <Select
            id="wz-enc"
            value={(flags.encryption_algorithm as string) ?? 'aes-gcm'}
            options={[
              { value: 'aes-gcm', label: 'AES-GCM' },
              { value: 'aes-256-gcm', label: 'AES-256-GCM' },
              { value: 'chacha20', label: 'ChaCha20' },
              { value: 'xor', label: 'XOR' },
            ]}
            onChange={(v) => setFlag('encryption_algorithm', v)}
          />
        </FormField>
        <FormField label="MTU" htmlFor="wz-mtu">
          <input
            id="wz-mtu"
            type="number"
            value={(flags.mtu as number) ?? 1380}
            onChange={(e) => setFlag('mtu', parseInt(e.target.value) || 1380)}
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:focus:ring-[var(--color-accent-dark)] transition-shadow"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Toggle
          id="wz-enc-toggle"
          checked={(flags.enable_encryption as boolean) ?? true}
          onChange={(v) => setFlag('enable_encryption', v)}
          label={t('enableEncryption')}
        />
        <Toggle
          id="wz-ipv6"
          checked={(flags.enable_ipv6 as boolean) ?? true}
          onChange={(v) => setFlag('enable_ipv6', v)}
          label={t('enableIpv6')}
        />
        <Toggle
          id="wz-latency"
          checked={(flags.latency_first as boolean) ?? false}
          onChange={(v) => setFlag('latency_first', v)}
          label={t('latencyFirstRoute')}
        />
        <Toggle
          id="wz-p2p"
          checked={(flags.disable_p2p as boolean | undefined) !== true}
          onChange={(v) => setFlag('disable_p2p', !v)}
          label={t('enableP2p')}
        />
      </div>
    </div>
  );
}
