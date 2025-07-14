import { NextRequest, NextResponse } from 'next/server';
import rankedWallets from '@/lib/fullWalletsRanked.json';
import { scoreWallet, predictLineaTokens } from '@/lib/scoreEngine';

type WalletEntry = {
  wallet: string;
  lxp?: number;
  lxpl?: number;
  poh?: string;
  volume_eth?: number;
  native_txs?: number;
  token_txs?: number;
  balance_eth?: number;
  nftScore?: number;
  lxpl_rank?: number;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const walletParam = searchParams.get('wallet');

  if (!walletParam) {
    return NextResponse.json({ error: 'Missing wallet address' }, { status: 400 });
  }

  const wallet = walletParam.toLowerCase();

  try {
    const walletEntry = rankedWallets.find(
      (entry) => entry.wallet?.toLowerCase() === wallet
    );

    if (!walletEntry) {
      return NextResponse.json({
        error: 'Wallet not found in dataset',
        eligible: false,
        score: 0,
        tier: 'N/A',
      }, { status: 404 });
    }

    const result = scoreWallet(walletEntry);

    const precomputedLxpl = walletEntry.lxpl ?? 0;
    const precomputedNftScore = walletEntry.nftScore ?? 0;
    const precomputedLxplRank = walletEntry.lxpl_rank ?? 0;
    const totalRankedWallets = rankedWallets.length;

    // The logic for predictedLineaTokens is kept but not returned in the response
    let predictedLineaTokens = 0;
    if (result.eligible && precomputedLxplRank > 0) {
      predictedLineaTokens = predictLineaTokens(precomputedLxplRank);
    }

    if (predictedLineaTokens <= 0 && result.boostApplied) {
      predictedLineaTokens = 25;
    }

    // Debugging logs were previously included, keeping them commented if you need them later
    // console.log("Wallet:", wallet);
    // console.log("Rank:", precomputedLxplRank);
    // console.log("Eligible:", result.eligible);
    // console.log("Boost Applied:", result.boostApplied);
    // console.log("Predicted Tokens (final):", predictedLineaTokens);

    return NextResponse.json({
      wallet,
      eligible: result.eligible,
      score: result.score,
      tier: result.tier,
      boostApplied: result.boostApplied,
      lxp: walletEntry.lxp ?? 0,
      lxpl: precomputedLxpl,
      poh: walletEntry.poh ?? '',
      volume_eth: walletEntry.volume_eth ?? 0,
      native_txs: walletEntry.native_txs ?? 0,
      token_txs: walletEntry.token_txs ?? 0,
      balance_eth: walletEntry.balance_eth ?? 0,
      nftScore: precomputedNftScore,
      lxpl_rank: precomputedLxplRank,
      lxpl_total: totalRankedWallets,
      boostPercentage: result.boostPercentage,
      reason: result.reason ?? null,
      // predictedLineaTokens: predictedLineaTokens, // This line has been removed
    });
  } catch (err) {
    console.error('[API ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}