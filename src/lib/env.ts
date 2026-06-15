export const env = {
  dappAddress: (process.env.NEXT_PUBLIC_DAPP_ADDRESS ?? "") as `0x${string}`,
  tokenAddress: (process.env.NEXT_PUBLIC_TOKEN_ADDRESS ?? "") as `0x${string}`,
  usdtAddress: (process.env.NEXT_PUBLIC_USDT_ADDRESS ?? "") as `0x${string}`,
};

export function hasContractConfig(): boolean {
  return Boolean(env.dappAddress && env.tokenAddress && env.usdtAddress);
}
