'use client';

type BoostExplanationProps = {
  result: {
    boostPercentage: number;
    // Add other properties from the result that might be relevant for display here,
    // e.g., lxpL for the first condition, poh for the second, if you want to make them dynamic too.
  };
};

export default function BoostExplanation({ result }: BoostExplanationProps) {
  return (
    <div className="p-4 rounded-lg border border-green-700 bg-green-950 text-green-300 text-sm">
      🎉 Boost Applied!
      <br />
      Your score received a{' '}
      <strong className="text-white">{result.boostPercentage}%</strong> bonus multiplier because you have:
      <ul className="list-disc pl-6 pt-1">
        <li>✅ LXP-L balance greater than zero</li>
        <li>✅ POH (Proof of Humanity) Completed</li>
      </ul>
    </div>
  );
}