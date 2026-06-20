export type Locale = "en" | "zh";

export const strings = {
  en: {
    brand: "Sails",
    tagline: "Digital Asset Management Company (Singapore)",
    nav: { home: "Home", sale: "Investment" },
    announcement: {
      title: "Announcement",
      confirm: "Got it",
      body: `Official Announcement

To: Dear 579WAi Investors and Community Members

Hello!

Since the launch of the 579WAi project, we thank every investor for their trust and support. To continuously advance ecosystem development and optimize the asset trading experience, Sails Company hereby officially announces the following regarding its recent core work deployment and development plan:

---
I. Liquidity Injection

We will inject 10% of our funds specifically into 579WAi's liquidity and permanently lock the liquidity while ensuring safety. Once the liquidity target is reached, we will open 579WAi trading.

II. DApp Ecosystem Development

Building upon the solid foundation of liquidity, we will fully launch the construction of a multi-dimensional ecosystem for DApps, covering on-chain applications, asset management, community incentives, and other areas. This will be implemented in stages to gradually enrich the application scenarios and value support of 579WAi.

III. Digital Exchange Launch Announcement

As the first section to launch this year, the 579WAi Digital Exchange is now in the final development phase. Following team evaluation, this platform is expected to be officially launched to all users by the end of July 2026, bringing a more efficient, transparent, and secure decentralized trading service to the community.

IV. Security and Fund Commitment

Sails always prioritizes the security of investor assets. Therefore, we do not have any fund holding pools; all funds are automatically transferred through the blockchain. We solemnly promise to the entire society: we will never touch a single penny of our clients' money. All fund flows adhere to the principles of openness, transparency, and traceability, resolutely preventing any misappropriation or embezzlement, and accepting joint supervision from all investors and regulatory agencies.

Every step of 579WAi's growth is inseparable from your trust and support. We will continue to uphold the principles of compliance, stability, and innovation, advance various construction projects according to plan, and promptly report progress to the community.

Thank you again for your support!

Sails Company June 18, 2026`,
    },
    hero: {
      title: "Exclusive BSC Investment",
      subtitle: "Secure USDT contribution with transparent on-chain stats and VIP rewards.",
      cta: "Join Investment",
    },
    contact: {
      button: "Contact Us",
      title: "Contact Us",
      subtitle: "Scan the QR code or open DeBox to reach the 579WAi team.",
      qrAlt: "579WAi DeBox contact QR code",
      openDebox: "Open DeBox Card",
      backHome: "Back",
    },
    wallet: {
      connect: "Connect MetaMask",
      connecting: "Connecting…",
      disconnect: "Disconnect",
      verify: "Verify Wallet",
      verifying: "Verifying…",
      verified: "Verified",
      verifyHint: "Sign a message to verify you control this wallet. Personal data is hidden until verified.",
      watchOnlyHint: "Watch-only wallets cannot sign and cannot view VIP level or personal data.",
    },
    stats: {
      title: "Live Statistics",
      totalSale: "Team performance (5 gen)",
      myContribution: "My Contribution (USDT)",
      vipLevel: "VIP Level",
      teamPerformance: "Team Performance",
      connectHint: "Connect wallet to view personal stats",
    },
    sale: {
      title: "Investment",
      amount: "Amount (USDT)",
      amountHint: "Min 100 — Max 5,000 USDT",
      inviter: "Inviter address (optional)",
      approve: "Approve USDT",
      contribute: "Contribute",
      approving: "Approving…",
      contributing: "Submitting…",
      successApprove: "USDT approved",
      successContribute: "Contribution submitted",
      invalidAmount: "Enter an amount between 100 and 5000 USDT",
      cumulativeCap: "Cumulative Investment cap is 5000 USDT per wallet",
      invalidInviter: "Invalid inviter address",
      configMissing: "Contract addresses not configured. Set env variables.",
      quotaFull: "Investment quota is temporarily full. Please check back later.",
      txFailed: "Transaction failed. Please check wallet balance, allowance, and network.",
      userRejected: "Transaction cancelled in wallet.",
      approveFailed: "USDT approval failed. Please try again.",
      inviterFromLink: "Inviter filled from invite link",
      inviterLocked: "Inviter is locked after your first contribution",
      inviterDefaultGod: "Default (god address)",
    },
    dividends: {
      title: "Daily Dividends",
      subtitle: "Accrued at 12:00 Beijing time. Claim anytime; unclaimed amounts accumulate.",
      vipUsdt: "Claimable VIP USDT",
      holderUsdt: "Claimable holder USDT",
      lpCs: "Claimable LP CS",
      claimVip: "Claim VIP USDT",
      claimHolder: "Claim holder USDT",
      claimLp: "Claim LP CS",
      claiming: "Claiming…",
      claimSuccess: "Claim submitted successfully",
      claimFailed: "Claim failed. Please try again.",
      nothingToClaim: "Nothing to claim yet",
    },
    network: {
      title: "Wrong Network",
      body: "Please switch to BNB Smart Chain (BSC) mainnet to continue.",
      switch: "Switch to BSC",
      switching: "Switching…",
    },
    lang: { en: "EN", zh: "中文" },
    tabs: { join: "Join", assets: "Assets", team: "Team" },
    team: {
      vipRoute: "VIP level",
      copyInviteLink: "Copy invite link",
      linkCopied: "Invite link copied",
      linkCopyFailed: "Could not copy link",
      myInviter: "My inviter",
      inviterUnbound: "Not bound yet",
      personalSale: "My Investment (USDT)",
      teamPerformance: "Team performance (5 gen)",
      directReferrals: "Direct referrals",
      vipProgress: "VIP progress",
      currentVip: "Current",
      nextVip: "Next",
      tierShare: "20% daily VIP pool per tier",
      teamPerformanceReq: "Team performance (USDT)",
      directReferralsReq: "Direct referrals (min 10)",
      maxVip: "You reached the highest VIP tier.",
      vipRulesNote:
        "Auto VIP requires 10+ direct referrals and team performance thresholds (5-generation downline USDT, excluding self). VIP USDT dividends accrue daily at 12:00 Beijing time; claim anytime on the Assets tab.",
    },
  },
  zh: {
    brand: "Sails",
    tagline: "数字资产管理公司（新加坡）",
    nav: { home: "首页", sale: "投资" },
    announcement: {
      title: "公告",
      confirm: "我知道了",
      body: `
官方公告
致：尊敬的各位579WAi投资者及社区成员

您好！

自579WAi项目启动以来，感谢每一位投资者的信任与支持。为持续推进生态建设、优化资产交易体验，Sails公司现就近期核心工作部署及发展规划，正式公告如下：

---

一、流动性资金注入
我们将会把百分之10的专项资金注入579WAi流动性并在确保安全的下永久锁定流动性  达到流动性的资金目标后我们将会开放579WAi交易

二、Dapp生态板块建设

在夯实流动性的基础上，我们将全面启动Dapp端多维度生态板块的建设工作，涵盖链上应用、资产管理、社区激励等方向，后续将分阶段推进，逐步丰富579WAi的应用场景与价值支撑。


三、数字交易所板块上线预告

作为本年度上线的第一个板块，579WAi数字交易所现已进入开发攻坚阶段。经团队评估，该板块预计将于 2026年7月底 正式面向全体用户推出，届时将为社区带来更高效、透明、安全的去中心化交易服务。


四、安全与资金承诺

Sails公司始终将投资者资产安全置于首位。所以我们不会存在资金沉淀池所有资金通过区块链自主到账 我们郑重向全社会承诺：永远不碰客户一分钱。所有资金流动均遵循公开、透明、可追溯的原则，坚决杜绝任何挪用、侵占行为，接受全体投资者与监管机构的共同监督。

579WAi的每一步成长，都离不开您的信赖与陪伴。我们将继续秉持合规、稳健、创新的理念，按计划推进各项建设，并及时向社区通报进展。

再次由衷感谢您的支持！

Sails公司
2026年6月18日
`,
    },
    hero: {
      title: "BSC 专属投资",
      subtitle: "USDT 安全参与，链上统计透明，VIP 奖励。",
      cta: "参与投资",
    },
    contact: {
      button: "联系我们",
      title: "联系我们",
      subtitle: "扫描二维码或打开 DeBox，联系 579WAi 团队。",
      qrAlt: "579WAi DeBox 联系二维码",
      openDebox: "打开 DeBox 名片",
      backHome: "返回",
    },
    wallet: {
      connect: "连接 MetaMask",
      connecting: "连接中…",
      disconnect: "断开连接",
      verify: "验证钱包",
      verifying: "验证中…",
      verified: "已验证",
      verifyHint: "请签名验证钱包所有权，验证通过后才可查看个人数据。",
      watchOnlyHint: "观察钱包无法签名，不能查看 VIP 等级和个人数据。",
    },
    stats: {
      title: "实时数据",
      totalSale: "团队业绩（5代）",
      myContribution: "我的贡献 (USDT)",
      vipLevel: "VIP 等级",
      teamPerformance: "团队业绩",
      connectHint: "连接钱包查看个人数据",
    },
    sale: {
      title: "投资认购",
      amount: "金额 (USDT)",
      amountHint: "最低 100 — 最高 5,000 USDT",
      inviter: "邀请人地址（可选）",
      approve: "授权 USDT",
      contribute: "认购",
      approving: "授权中…",
      contributing: "提交中…",
      successApprove: "USDT 已授权",
      successContribute: "认购已提交",
      invalidAmount: "请输入 100 至 5000 USDT",
      cumulativeCap: "单钱包投资累计上限 5000 USDT",
      invalidInviter: "邀请人地址无效",
      configMissing: "合约地址未配置，请设置环境变量。",
      quotaFull: "投资名额暂满，待开放",
      txFailed: "交易失败，请检查余额、授权与网络。",
      userRejected: "已在钱包中取消交易。",
      approveFailed: "USDT 授权失败，请重试。",
      inviterFromLink: "已从邀请链接填入邀请人地址",
      inviterLocked: "首次认购后邀请人已锁定，不可修改",
      inviterDefaultGod: "默认（上帝地址）",
    },
    dividends: {
      title: "每日分红领取",
      subtitle: "北京时间 12:00 日结累加，随时 Claim；未领持续累积，领取后清零。",
      vipUsdt: "可领取 VIP USDT",
      holderUsdt: "可领取持币 USDT",
      lpCs: "可领取 LP CS",
      claimVip: "领取 VIP USDT",
      claimHolder: "领取持币 USDT",
      claimLp: "领取 LP CS",
      claiming: "领取中…",
      claimSuccess: "领取已提交",
      claimFailed: "领取失败，请重试",
      nothingToClaim: "暂无可领取分红",
    },
    network: {
      title: "网络错误",
      body: "请切换到 BNB 智能链 (BSC) 主网。",
      switch: "切换到 BSC",
      switching: "切换中…",
    },
    lang: { en: "EN", zh: "中文" },
    tabs: { join: "参加", assets: "资产", team: "团队" },
    team: {
      vipRoute: "VIP 等级路线",
      copyInviteLink: "复制邀请链接",
      linkCopied: "邀请链接已复制",
      linkCopyFailed: "复制失败，请手动复制",
      myInviter: "我的邀请人",
      inviterUnbound: "暂未绑定",
      personalSale: "本人投资 (USDT)",
      teamPerformance: "团队业绩 (5代)",
      directReferrals: "直推人数",
      vipProgress: "VIP 升级进度",
      currentVip: "当前",
      nextVip: "下一级",
      tierShare: "每日 VIP 池 20%/档",
      teamPerformanceReq: "团队业绩 (USDT)",
      directReferralsReq: "直推人数 (至少 10)",
      maxVip: "已达最高 VIP 等级",
      vipRulesNote:
        "自动 VIP 需直推 ≥10 人且团队业绩达标（5 代下级投资 USDT 累加，不含本人）。VIP USDT 分红北京时间 12:00 日结累加，可在「资产」页随时领取。",
    },
  },
} as const;

export type StringKey = keyof typeof strings.en;
