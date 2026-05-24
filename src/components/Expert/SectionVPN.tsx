import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/ConfigContext';
import { FormField } from '../common/FormField';
import { Toggle } from '../common/Toggle';

export function SectionVPN() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();
  const enabled = !!config.vpn_portal;

  return (
    <section id="vpn" className="scroll-mt-14">
      <h2 className="text-xl font-semibold text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] mb-4">
        {t('vpnPortal')}
      </h2>
      <div className="flex flex-col gap-4">
        <Toggle
          id="vpn-enable"
          checked={enabled}
          onChange={(v) => {
            if (v) {
              updateConfig({
                vpn_portal: {
                  client_cidr: '10.144.145.0/24',
                  wireguard_listen: '0.0.0.0:11011',
                },
              });
            } else {
              updateConfig({ vpn_portal: undefined });
            }
          }}
          label={t('enableVpnPortal')}
        />

        {enabled && config.vpn_portal && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label={t('clientCidr')} htmlFor="vpn-cidr">
              <input
                id="vpn-cidr"
                type="text"
                value={config.vpn_portal.client_cidr}
                onChange={(e) =>
                  updateConfig({
                    vpn_portal: {
                      ...config.vpn_portal!,
                      client_cidr: e.target.value,
                    },
                  })
                }
                placeholder="10.144.145.0/24"
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:focus:ring-[var(--color-accent-dark)] transition-shadow"
              />
            </FormField>

            <FormField label={t('listenAddress')} htmlFor="vpn-listen">
              <input
                id="vpn-listen"
                type="text"
                value={config.vpn_portal.wireguard_listen}
                onChange={(e) =>
                  updateConfig({
                    vpn_portal: {
                      ...config.vpn_portal!,
                      wireguard_listen: e.target.value,
                    },
                  })
                }
                placeholder="0.0.0.0:11011"
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-sm text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:focus:ring-[var(--color-accent-dark)] transition-shadow"
              />
            </FormField>
          </div>
        )}
      </div>
    </section>
  );
}
