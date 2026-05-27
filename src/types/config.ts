import { randomNetworkName, randomSecret, randomInstanceName } from '../utils/random';

export interface PeerConfig {
  uri: string;
  peer_public_key?: string;
}

export interface ProxyNetworkConfig {
  cidr: string;
  mapped_cidr?: string;
  allow?: string[];
}

export interface PortForwardConfig {
  bind_addr: string;
  dst_addr: string;
  proto: 'tcp' | 'udp';
}

export interface VpnPortalConfig {
  client_cidr: string;
  wireguard_listen: string;
}

export interface LogConfig {
  level?: string;
  file?: string;
  dir?: string;
  size_mb?: number;
  count?: number;
}

export type TargetOS = 'linux' | 'windows' | 'macos';

export function getDefaultLogDir(os: TargetOS): string | undefined {
  switch (os) {
    case 'linux':
      return '/var/log/easytier';
    case 'windows':
      return 'C:\\ProgramData\\EasyTier\\logs';
    case 'macos':
      return '~/Library/Logs/EasyTier';
    default:
      return undefined;
  }
}

export interface EasyTierConfig {
  // Meta (not serialized to TOML)
  target_os: TargetOS;

  // Basic
  instance_name?: string;
  hostname?: string;
  ipv4?: string;
  ipv6?: string;
  dhcp?: boolean;
  ipv6_public_addr_provider?: boolean;
  ipv6_public_addr_auto?: boolean;
  ipv6_public_addr_prefix?: string;

  // Network Identity
  network_identity?: {
    network_name: string;
    network_secret?: string;
  };

  // Connections (UI concept, not in TOML)
  networking_method: 'manual' | 'standalone';

  peers?: PeerConfig[];
  listeners?: string[];
  mapped_listeners?: string[];

  // Proxy & Routes
  proxy_networks?: ProxyNetworkConfig[];
  routes?: string[];
  exit_nodes?: string[];

  // VPN Portal
  vpn_portal?: VpnPortalConfig;

  // Port Forward
  port_forwards?: PortForwardConfig[];

  // Advanced Flags
  flags?: Record<string, string | number | boolean | bigint>;

  // Logging
  file_logger?: LogConfig;
  console_logger?: LogConfig;
}

/** EasyTier's actual runtime defaults.
 *  These are the values EasyTier uses when a field is absent from TOML.
 *  Used for filtering defaults in TOML output. */
export const easytierDefaults = {
  instance_name: 'default',
  hostname: undefined as string | undefined,
  ipv4: undefined as string | undefined,
  ipv6: undefined as string | undefined,
  dhcp: false,
  ipv6_public_addr_provider: false,
  ipv6_public_addr_auto: false,
  ipv6_public_addr_prefix: undefined as string | undefined,
  network_identity: { network_name: 'default', network_secret: '' },
  listeners: [] as string[],
  mapped_listeners: [] as string[],
  peers: [] as PeerConfig[],
  exit_nodes: [] as string[],
  routes: [] as string[],
  proxy_networks: [] as ProxyNetworkConfig[],
  vpn_portal: undefined as VpnPortalConfig | undefined,
  port_forwards: [] as PortForwardConfig[],
  file_logger: undefined as LogConfig | undefined,
  console_logger: undefined as LogConfig | undefined,
  flags: {
    default_protocol: 'tcp',
    dev_name: '',
    enable_encryption: true,
    enable_ipv6: true,
    mtu: 1380,
    latency_first: false,
    enable_exit_node: false,
    proxy_forward_by_system: false,
    no_tun: false,
    use_smoltcp: false,
    relay_network_whitelist: '*',
    disable_p2p: false,
    p2p_only: false,
    lazy_p2p: false,
    need_p2p: false,
    relay_all_peer_rpc: false,
    disable_tcp_hole_punching: false,
    disable_udp_hole_punching: false,
    disable_sym_hole_punching: false,
    disable_upnp: false,
    multi_thread: true,
    multi_thread_count: 2,
    data_compress_algo: 'none',
    bind_device: true,
    enable_kcp_proxy: false,
    disable_kcp_input: false,
    enable_quic_proxy: false,
    disable_quic_input: false,
    disable_relay_kcp: false,
    disable_relay_quic: false,
    enable_relay_foreign_network_kcp: false,
    enable_relay_foreign_network_quic: false,
    accept_dns: false,
    private_mode: false,
    foreign_relay_bps_limit: 18446744073709551615n,
    instance_recv_bps_limit: 18446744073709551615n,
    enable_udp_broadcast_relay: false,
    tld_dns_zone: 'et.net.',
    encryption_algorithm: 'aes-gcm',
    disable_relay_data: false,
  } as Record<string, string | number | boolean | bigint>,
};

/** UI convenience defaults — pre-filled in forms but omitted from TOML if unchanged. */
export const defaultConfig = (target_os: TargetOS = 'linux'): EasyTierConfig => ({
  target_os,
  networking_method: 'manual',
  instance_name: randomInstanceName(),
  network_identity: {
    network_name: randomNetworkName(),
    network_secret: randomSecret(),
  },
  dhcp: true,
  flags: { ...easytierDefaults.flags },
});
