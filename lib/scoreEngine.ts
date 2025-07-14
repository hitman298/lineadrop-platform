// lib/scoreEngine.ts

// Define the expected shape of the wallet data and the prediction result
type WalletEntry = {
  wallet: string;
  lxp?: number;
  lxpl?: number; // Assumed to be precomputed (lxp + nftScore)
  poh?: string | boolean; // Can be string 'COMPLETED' or boolean true/false
  volume_eth?: number;
  native_txs?: number;
  token_txs?: number;
  balance_eth?: number;
  nftScore?: number; // Assumed to be precomputed
  lxpl_rank?: number;
  created_at?: string; // Optional field for wallet age calculation
};

type PredictionResult = {
  eligible: boolean;
  score: number;
  tier: string;
  nftScore: number;
  boostApplied: boolean;
  boostPercentage: number;
  reason?: string; // Optional reason for ineligibility or boost status
};

export function scoreWallet(wallet: WalletEntry): PredictionResult {
  const lxp = wallet.lxp ?? 0;
  const nftScore = wallet.nftScore ?? 0;
  // LXPL is now expected to be precomputed on the wallet object
  // If not explicitly provided, calculate it as LXP + NFT Score as a fallback
  const lxpl = wallet.lxpl ?? (lxp + nftScore);

  // Normalize POH status to a boolean
  const pohCompleted = wallet.poh === 'COMPLETED' || wallet.poh === true;

  // Calculate total transaction count
  const txCount = (wallet.native_txs ?? 0) + (wallet.token_txs ?? 0);

  // Hardcoded wallet age for now. If 'created_at' is available,
  // you can calculate it dynamically:
  // const walletAgeDays = wallet.created_at ? calculateDaysSince(wallet.created_at) : 0;
  const walletAgeDays = 503; // Using the hardcoded value from your target code

  // Base score starts with LXP and NFT Score
  let baseScore = lxp + nftScore;

  // 🟢 Bonus 1: POH (+200)
  const pohBonus = pohCompleted ? 200 : 0;
  baseScore += pohBonus;

  // 🟢 Bonus 2: Age > 90 days (+100)
  const ageBonus = walletAgeDays > 90 ? 100 : 0;
  baseScore += ageBonus;

  // 🟢 Bonus 3: Activity > 25 txs (+150)
  const txBonus = txCount >= 25 ? 150 : 0;
  baseScore += txBonus;

  // 🟣 Boost: If LXP-L > 0, apply a 15% boost
  const boostApplied = lxpl > 0;
  const boostFactor = boostApplied ? 0.15 : 0;

  // Calculate final score with boost
  const finalScore = Math.round(baseScore + (baseScore * boostFactor));

  // 🏅 Tier system based on final score
  let tier = 'N/A';
  if (finalScore >= 5000) tier = 'Tier 1';
  else if (finalScore >= 3000) tier = 'Tier 2';
  else if (finalScore >= 2000) tier = 'Tier 3';
  else if (finalScore >= 1000) tier = 'Tier 4';
  else tier = 'Tier 5';

  // Determine overall eligibility (based on the tiering cutoff)
  const eligible = finalScore >= 1000; // Eligibility cutoff based on Tier 4 criteria

  // Set a reason if boost is not applied for clarity
  const reason = boostApplied ? undefined : 'No Boost Applied (LXP-L = 0)';

  return {
    eligible,
    score: finalScore,
    tier,
    nftScore, // Return the nftScore that was passed in
    boostApplied,
    boostPercentage: boostApplied ? 15 : 0, // Return as a percentage value (15, not 0.15)
    reason,
  };
}

/**
 * Predicts the number of LINEA tokens based on the wallet's LXP-L rank.
 * @param rank The LXP-L rank of the wallet.
 * @returns The predicted number of LINEA tokens.
 */
export function predictLineaTokens(rank: number): number {
  if (rank <= 500) return Math.floor(5000 - rank * 2);
  if (rank <= 2000) return Math.floor(3000 - (rank - 500) * 1.2);
  if (rank <= 10000) return Math.floor(1500 - (rank - 2000) * 0.2);
  if (rank <= 50000) return Math.floor(500 - (rank - 10000) * 0.01);
  if (rank <= 100000) return Math.floor(100 - (rank - 50000) * 0.001);
  if (rank <= 200000) return Math.floor(50 - (rank - 100000) * 0.0005);
  return 0;
}

// Optional: Helper function to calculate days since a given date string
/*
function calculateDaysSince(dateString: string): number {
  try {
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (e) {
    console.error("Error calculating wallet age:", e);
    return 0;
  }
}
*/