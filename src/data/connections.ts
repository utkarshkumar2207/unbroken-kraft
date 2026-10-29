export interface SocialConnection {
  platform: 'discord' | 'whatsapp';
  title: string;
  description: string;
  url: string; // destination url
  configured: boolean; // whether real destination has been provided by user
  placeholderNote?: string;
}

export const COMMUNITY_CONNECTIONS: SocialConnection[] = [
  {
    platform: 'discord',
    title: 'Discord',
    description: 'Join the community and chat.',
    url: 'https://discord.gg/bAejsZPMuA',
    configured: true,
  },
  {
    platform: 'whatsapp',
    title: 'WhatsApp',
    description: 'Connect with me directly.',
    url: 'https://wa.me/918130671864?s=t',
    configured: true,
  },
];
