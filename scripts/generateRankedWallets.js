const fs = require('fs');
const path = require('path');

// Load raw wallet data and NFT data
const fullWalletsData = require('../lib/fullWallets.json');
const nftWallets = require('../lib/nftWallets.json');

// Flatten wallet array
const fullWallets = Array.isArray(fullWalletsData)
  ? fullWalletsData
  : fullWalletsData.result?.rows ?? [];

// NFT Score calculator
function getNFTScore(wallet) {
  const row = nftWallets.result?.rows?.find(
    (entry) => entry.Holder?.toLowerCase() === wallet.toLowerCase()
  );

  if (!row) return 0;

  const alpha = Number(row.Alpha ?? 0);
  const beta = Number(row.Beta ?? 0);
  const gamma = Number(row.Gamma ?? 0);
  const delta = Number(row.Delta ?? 0);
  const omega = Number(row.Omega ?? 0);

  return alpha * 8 + beta * 4 + gamma * 2 + delta * 1 + omega * 0.5;
}

// Step 1: Calculate nftScore and lxpl
const enrichedWallets = fullWallets.map((wallet) => {
  const nftScore = getNFTScore(wallet.wallet);
  const lxpl = (wallet.lxp ?? 0) + nftScore;

  return {
    ...wallet,       // Preserve all fields like txs, balance, poh, etc.
    nftScore,
    lxpl,
  };
});

// Step 2: Sort by lxpl (descending)
enrichedWallets.sort((a, b) => (b.lxpl ?? 0) - (a.lxpl ?? 0));

// Step 3: Assign lxpl_rank
const rankedWallets = enrichedWallets.map((wallet, index) => ({
  ...wallet,
  lxpl_rank: index + 1,
}));

// Step 4: Save to file
const outputPath = path.join(__dirname, '../lib/fullWalletsRanked.json');
fs.writeFileSync(outputPath, JSON.stringify(rankedWallets, null, 2), 'utf8');

console.log(`✅ Saved ${rankedWallets.length} ranked wallets to fullWalletsRanked.json`);
