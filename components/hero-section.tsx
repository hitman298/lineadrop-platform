"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TypewriterText from "@/components/typewriter-text"

interface HeroSectionProps {
  onWalletCheck: (address: string) => void
  isLoading: boolean
}

export default function HeroSection({ onWalletCheck, isLoading }: HeroSectionProps) {
  const [walletAddress, setWalletAddress] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (walletAddress.trim()) {
      onWalletCheck(walletAddress.trim())
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-16"
    >
      <div className="mb-8">
        <TypewriterText
          text="ARE YOU ELIGIBLE FOR THE LINEA AIRDROP?"
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-xl text-[#aaaaaa] max-w-2xl mx-auto leading-tight"
        >
          Check your predicted score, tier, and bonus eligibility
        </motion.p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4"
      >
        <Input
          type="text"
          placeholder="Enter Ethereum address (0x...)"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="h-12 bg-[#111111] border-[#333333] text-white placeholder:text-[#666666] focus:border-[#3b82f6] transition-colors"
          disabled={isLoading}
        />

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={!walletAddress.trim() || isLoading}
            className="w-full h-12 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium uppercase tracking-wide transition-colors disabled:opacity-50"
          >
            {isLoading ? "CHECKING..." : "CHECK PREDICTION"}
          </Button>
        </motion.div>
      </motion.form>
    </motion.section>
  )
}
