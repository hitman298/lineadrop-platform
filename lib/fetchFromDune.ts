const DUNE_API_KEY = process.env.DUNE_API_KEY!;
const DUNE_QUERY_ID = "5468442";

export async function fetchFromDune(wallet: string) {
  const url = `https://api.dune.com/api/v1/query/${DUNE_QUERY_ID}/results?limit=10000`;

  const res = await fetch(url, {
    headers: {
      'X-Dune-API-Key': DUNE_API_KEY,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    console.error('❌ Dune API Error:', await res.text());
    return null;
  }

  const json = await res.json();

  const rows = json.result?.rows || [];
  const match = rows.find(
    (row: any) => row.wallet.toLowerCase() === wallet.toLowerCase()
  );

  return match || null;
}
