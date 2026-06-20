const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'src');
const checks = [
  ['i18n/strings.ts', ['en:', 'zh:', 'totalSale', 'myContribution', 'vipLevel', 'teamPerformance', 'approve', '5000']],
  ['components/Header.tsx', ['setLocale', 'ConnectWallet', 'locale === "en"', 'locale === "zh"']],
  ['components/PrivateSaleModal.tsx', ['MIN = 100', 'MAX = 5000', 'maxUint256', 'privateSale', 'inviter', 'privateSaleTotal', 'cumulativeCap']],
  ['components/JoinStats.tsx', ['teamPerformance', 'privateSaleTotal']],
  ['components/TeamTab.tsx', ['getEffectiveVipLevel', 'teamPerformance', 'directReferralCount', 'copyInviteLink']],
  ['components/BottomNav.tsx', ['join', 'assets', 'team']],
  ['components/DappShell.tsx', ['PrivateSaleModal', 'BottomNav']],
  ['components/NetworkGuard.tsx', ['switchChain', 'SUPPORTED_CHAIN_ID']],
  ['components/Hero.tsx', ['hero']],
  ['lib/wagmi.ts', ['injected', 'bsc']], ['lib/chains.ts', ['SUPPORTED_CHAIN_ID', 'viem/chains']],
  ['lib/abis.ts', ['privateSale', 'totalPrivateSaleUsdt', 'getEffectiveVipLevel']],
  ['app/globals.css', ['navy', 'gold']],
];
let fail = 0;
for (const [f, needles] of checks) {
  const text = fs.readFileSync(path.join(root, f), 'utf8');
  for (const n of needles) {
    if (!text.includes(n)) { console.error('MISSING', f, n); fail++; }
  }
}
if (fail) { console.error(fail, 'checks failed'); process.exit(1); }
console.log('Frontend md requirements:', checks.length, 'files verified');
