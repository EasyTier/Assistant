import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpertNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function ExpertNav({ activeSection, onNavigate }: ExpertNavProps) {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const activeLabel = sections.find((s) => s.id === activeSection)?.label ?? '';

  const handleClick = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile dropdown */}
      <div className="md:hidden shrink-0 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[var(--color-text-h)] dark:text-[var(--color-text-h-dark)]"
        >
          <span>{activeLabel}</span>
          {mobileOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {mobileOpen && (
          <ul className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] py-2 px-2 space-y-0.5">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => handleClick(s.id)}
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
        )}
      </div>

      {/* Desktop sidebar */}
      <nav className="hidden md:block sticky top-14 h-[calc(100vh-3.5rem)] w-48 shrink-0 overflow-y-auto border-r border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] py-4">
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
    </>
  );
}
