export interface WalletProviderItem {
  id: string;
  name: string;
  installed: boolean;
  logo: { src: string | null; alt: string };
  installUrl: string;
}
