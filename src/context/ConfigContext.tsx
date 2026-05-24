import { createContext, useContext, useState, type ReactNode } from 'react';
import type { EasyTierConfig } from '../types/config';
import { defaultConfig } from '../types/config';

interface ConfigContextType {
  config: EasyTierConfig;
  updateConfig: (partial: Partial<EasyTierConfig>) => void;
  updateFlags: (flags: Record<string, string | number | boolean | bigint>) => void;
  setConfig: (config: EasyTierConfig) => void;
  resetConfig: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<EasyTierConfig>(defaultConfig());

  const updateConfig = (partial: Partial<EasyTierConfig>) => {
    setConfigState((prev) => ({ ...prev, ...partial }));
  };

  const updateFlags = (flags: Record<string, string | number | boolean | bigint>) => {
    setConfigState((prev) => ({
      ...prev,
      flags: { ...prev.flags, ...flags },
    }));
  };

  const setConfig = (newConfig: EasyTierConfig) => {
    setConfigState(newConfig);
  };

  const resetConfig = () => {
    setConfigState((prev) => defaultConfig(prev.target_os));
  };

  return (
    <ConfigContext.Provider
      value={{ config, updateConfig, updateFlags, setConfig, resetConfig }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider');
  return ctx;
}
