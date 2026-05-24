import { useTranslation } from 'react-i18next';

interface ExpertNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function ExpertNav({ activeSection, onNavigate }: ExpertNavProps) {
  const { t } = useTranslation();

  const sections = [
    { id: 'network', label: t('expertNav.networkIdentity') },
    { id: 'ip', label: t('expertNav.ipSettings') },
    { id: 'connections', label: t('expertNav.connections') },
    { id: 'proxy', label: t('expertNav.proxyRoutes') },
    { id: 'vpn', label: t('expertNav.vpnPortal') },
    { id: 'forward', label: t('expertNav.portForward') },
    { id: 'advanced', label: t('expertNav.advanced') },
    { id: 'logging', label: t('expertNav.logging') },
  ];

  return (
    <nav className="sticky top-14 h-[calc(100vh-3.5rem)] w-48 shrink-0 overflow-y-auto border-r border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] py-4">
      <ul className="space-y-0.5 px-2">
        {sections.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onNavigate(s.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeSection === s.id
                  ? 'bg-[var(--color-accent-bg)] dark:bg-[var(--color-accent-bg-dark)] text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] font-medium'
                  : 'text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-surface-dark)]'
              }`}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
