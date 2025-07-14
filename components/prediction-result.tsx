'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup'; // This might become unused if not used elsewhere
import { Badge } from './ui/badge';
import BoostExplanation from './boost-explanation';
import NotEligible from './not-eligible';
import { useIsClient } from '@/lib/hooks';

type ResultProps = {
  result: {
    wallet: string;
    eligible: boolean;
    score: number;
    tier: string | null;
    boostApplied: boolean;
    lxp: number;
    lxpl: number;
    lxpl_rank: number;
    lxpl_total: number;
    nftScore?: number;
    boostPercentage: number;
    reason?: string;
    // finalAllocationLinea: number; // This line has been removed
  };
};

export default function PredictionResult({ result }: ResultProps) {
  const [show, setShow] = useState(false);
  const isClient = useIsClient();

  useEffect(() => {
    setShow(!!result);
  }, [result]);

  if (!show || !isClient) return null;

  if (!result.eligible) return <NotEligible result={result} />;

  return (
    <div className="mt-10 w-full max-w-3xl mx-auto p-6 bg-[#111] border border-[#222] rounded-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">🎯 Prediction Result</h2>
        <Badge variant="default">{result.tier}</Badge>
      </div>

      <div className="text-gray-300">
        <p className="mb-1">
          Wallet: <span className="font-mono">{result.wallet}</span>
        </p>
        <h2 className="text-3xl font-bold mt-3">
          Score: <span className="text-white">{result.score} points</span>
        </h2>
        {/* The 'Predicted Airdrop' display block has been removed */}
      </div>

      <div>
        {result.boostApplied ? (
          <BoostExplanation result={result} />
        ) : (
          <p className="text-sm text-yellow-500">⚠️ No Boost Applied (LXP-L = 0)</p>
        )}
      </div>

      {typeof result.nftScore === 'number' && (
        <div className="text-sm text-gray-400">
          NFT Score:{' '}
          <strong className="text-white">
            {result.nftScore.toLocaleString()}
          </strong>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 pt-4 border-t border-[#333]">
        <div>LXP: <strong className="text-white">{result.lxp}</strong></div>
        <div>LXP-L: <strong className="text-white">{result.lxpl}</strong></div>
        <div>
          LXP-L Rank:{' '}
          <strong className="text-white">
            {result.lxpl_rank.toLocaleString()} / {result.lxpl_total.toLocaleString()}
          </strong>
        </div>
      </div>
    </div>
  );
}