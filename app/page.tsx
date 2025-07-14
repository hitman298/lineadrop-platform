'use client'; // This directive marks the component for client-side rendering

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import HeroSection from "@/components/hero-section";
import PredictionResult from "@/components/prediction-result";
import BoostExplanation from "@/components/boost-explanation"; // Ensure this component is updated too if it uses these fields
import NotEligible from "@/components/not-eligible"; // Ensure this component is updated too if it uses these fields
import Leaderboard from "@/components/leaderboard";
import FAQ from "@/components/faq";
import Newsletter from "@/components/newsletter";

// Data shape expected by the prediction components
export interface PredictionResultData {
  wallet: string;
  eligible: boolean;
  score: number;
  tier: string | null;
  boostApplied: boolean;
  lxp: number;
  lxpl: number;
  // Removed: poh: string;
  lxpl_rank: number;
  lxpl_total: number;
  // Removed: balance_eth: number;
  // Removed: volume_eth: number;
  // Removed: native_txs: number;
  // Removed: token_txs: number;
  nftScore?: number;
  boostPercentage: number;
  reason?: string;
}

export default function Home() {
  const [predictionData, setPredictionData] = useState<PredictionResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // State to manage client-side hydration
  const [hydrated, setHydrated] = useState(false);

  // Effect to set hydrated to true once the component mounts on the client
  useEffect(() => {
    setHydrated(true);
  }, []); // Empty dependency array ensures this runs once after initial mount

  const handleWalletCheck = async (address: string) => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/predict?wallet=${address}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch wallet score');

      const fullResult: PredictionResultData = {
        wallet: data.wallet,
        eligible: data.eligible,
        score: data.score,
        tier: data.tier,
        boostApplied: data.boostApplied,
        lxp: data.lxp,
        lxpl: data.lxpl,
        // Removed: poh: data.poh,
        // Removed: volume_eth: data.volume_eth,
        // Removed: native_txs: data.native_txs,
        // Removed: token_txs: data.token_txs,
        // Removed: balance_eth: data.balance_eth,
        nftScore: data.nftScore,
        lxpl_rank: data.lxpl_rank || 0, // Ensure default if undefined
        lxpl_total: data.lxpl_total || 100000, // Ensure default if undefined
        boostPercentage: data.boostApplied ? 15 : 0, // Assuming 15% is the fixed boost value
        reason: data.reason,
      };

      setPredictionData(fullResult);
    } catch (err) {
      console.error("Prediction API error:", err);
      alert("❌ Failed to fetch prediction. Please try again or check the console.");
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent React hydration mismatch by returning null until hydrated on the client
  if (!hydrated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <HeroSection onWalletCheck={handleWalletCheck} isLoading={isLoading} />

        {predictionData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 space-y-8"
          >
            {predictionData.eligible ? (
              <>
                <PredictionResult result={predictionData} />
                {/* Ensure BoostExplanation correctly handles its props */}
                <BoostExplanation result={predictionData} />
              </>
            ) : (
              <NotEligible result={predictionData} />
            )}
          </motion.div>
        )}

        <div className="mt-16 space-y-16">
          <Leaderboard />
          <FAQ />
          <Newsletter />
        </div>
      </div>
    </div>
  );
}