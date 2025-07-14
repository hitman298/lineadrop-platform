// components/NotEligible.tsx
'use client'; // Ensure this is a client component if it uses hooks or client-specific features

type NotEligibleProps = {
  result: {
    eligible: boolean; // Just to be explicit, though handled by parent
    reason?: string; // The reason for ineligibility
  };
};

export default function NotEligible({ result }: NotEligibleProps) {
  // If result.reason is not provided or empty, provide a default
  const displayReason = result.reason || 'Unknown reason or LXP below 1,000';

  return (
    <div className="mt-10 w-full max-w-3xl mx-auto p-6 bg-red-900/20 border border-red-700 rounded-xl text-red-300 text-center">
      <h2 className="text-xl font-semibold mb-2">Not Eligible</h2>
      <p>
        Unfortunately, your wallet is not currently eligible. Reason:{' '}
        <strong className="text-white">{displayReason}</strong>
      </p>
    </div>
  );
}