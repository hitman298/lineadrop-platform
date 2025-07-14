"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Leaderboard() {
  // Mock leaderboard data
  const leaderboardData = Array.from({ length: 10 }, (_, i) => ({
    rank: i + 1,
    address: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
    score: Math.floor(Math.random() * 100000) + 50000,
    tier: Math.random() > 0.7 ? 1 : Math.random() > 0.4 ? 2 : 3,
  })).sort((a, b) => b.score - a.score)

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1:
        return "bg-[#22c55e] text-black"
      case 2:
        return "bg-[#3b82f6] text-white"
      case 3:
        return "bg-[#8b5cf6] text-white"
      default:
        return "bg-[#666666] text-white"
    }
  }

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-[#111111] border-[#333333]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">LEADERBOARD</CardTitle>
          <p className="text-[#aaaaaa]">Top predicted scores across all wallets</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboardData.map((entry, index) => (
              <motion.div
                key={entry.address}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-[#222222] hover:border-[#333333] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-8 h-8 flex items-center justify-center text-sm font-bold ${
                      entry.rank <= 3 ? "text-[#22c55e]" : "text-[#aaaaaa]"
                    }`}
                  >
                    #{entry.rank}
                  </span>
                  <span className="font-mono text-sm">{entry.address}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-medium">{entry.score.toLocaleString()}</span>
                  <Badge className={`${getTierColor(entry.tier)} text-xs`}>T{entry.tier}</Badge>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#0a0a0a] border border-[#333333] text-center">
            <p className="text-sm text-[#666666]">Your wallet rank will appear here after checking eligibility</p>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}
