export type Owner = {
  address: string;
  name: string;
};

export interface SignatoriesAccount {
  address: string;
  name: string;
  networkId: number;
  owners: Owner[];
  threshold: number;
}
