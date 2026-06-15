export const erc20Abi = [
  { type: "function", name: "approve", stateMutability: "nonpayable", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ type: "bool" }] },
  { type: "function", name: "allowance", stateMutability: "view", inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "balanceOf", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "decimals", stateMutability: "view", inputs: [], outputs: [{ type: "uint8" }] },
] as const;

export const dappAbi = [
  { type: "function", name: "privateSale", stateMutability: "nonpayable", inputs: [{ name: "usdtAmount", type: "uint256" }, { name: "inviterInput", type: "address" }], outputs: [] },
  { type: "function", name: "totalPrivateSaleUsdt", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
  { type: "function", name: "privateSaleTotal", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "getEffectiveVipLevel", stateMutability: "view", inputs: [{ name: "user", type: "address" }], outputs: [{ type: "uint8" }] },
  { type: "function", name: "getAutoVipLevel", stateMutability: "view", inputs: [{ name: "user", type: "address" }], outputs: [{ type: "uint8" }] },
  { type: "function", name: "inviter", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ type: "address" }] },
  { type: "function", name: "directReferralCount", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "hasParticipated", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ type: "bool" }] },
  { type: "function", name: "teamPerformance", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "pendingVipUsdt", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "claimVipUsdt", stateMutability: "nonpayable", inputs: [], outputs: [] },
  { type: "function", name: "vipRoundId", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
] as const;

export const tokenAbi = [
  { type: "function", name: "pendingHolderUsdt", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "pendingLpCs", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "claimHolderUsdt", stateMutability: "nonpayable", inputs: [], outputs: [] },
  { type: "function", name: "claimLpCs", stateMutability: "nonpayable", inputs: [], outputs: [] },
  { type: "function", name: "registerForLpDividends", stateMutability: "nonpayable", inputs: [], outputs: [] },
] as const;
