import { useState, useRef, useEffect } from 'react';
import { ExpertNav } from './ExpertNav';
import { SectionNetwork } from './SectionNetwork';
import { SectionIP } from './SectionIP';
import { SectionConnections } from './SectionConnections';
import { SectionProxyRoutes } from './SectionProxyRoutes';
import { SectionVPN } from './SectionVPN';
import { SectionPortForward } from './SectionPortForward';
import { SectionAdvanced } from './SectionAdvanced';
import { SectionLogging } from './SectionLogging';

const sections = [
  'network',
  'ip',
  'connections',
  'proxy',
  'vpn',
  'forward',
  'advanced',
  'logging',
];

export function ExpertPanel() {
  const [activeSection, setActiveSection] = useState('network');
  const mainRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { root: mainRef.current, rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el && mainRef.current) {
      const top = el.offsetTop - mainRef.current.offsetTop - 16;
      mainRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)]">
      <ExpertNav activeSection={activeSection} onNavigate={handleNavigate} />
      <div
        ref={mainRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-10"
      >
        <SectionNetwork />
        <SectionIP />
        <SectionConnections />
        <SectionProxyRoutes />
        <SectionVPN />
        <SectionPortForward />
        <SectionAdvanced />
        <SectionLogging />
        <div className="h-20" />
      </div>
    </div>
  );
}
