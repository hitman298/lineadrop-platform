"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-[#111111] border-[#333333]">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">STAY UPDATED</h2>
          <p className="text-[#aaaaaa] mb-6 max-w-md mx-auto">
            Get notified when the official Linea drop goes live and receive updates on eligibility changes.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-[#0f1f0f] border border-[#22c55e]"
            >
              <span className="text-2xl mb-2 block">✅</span>
              <p className="text-[#22c55e] font-medium">Successfully subscribed!</p>
              <p className="text-[#aaaaaa] text-sm mt-2">You'll receive updates about the Linea airdrop.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0a0a0a] border-[#333333] text-white placeholder:text-[#666666] focus:border-[#3b82f6]"
                required
              />
              <Button
                type="submit"
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium uppercase tracking-wide px-6"
              >
                SUBSCRIBE
              </Button>
            </form>
          )}

          <p className="text-xs text-[#666666] mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </CardContent>
      </Card>
    </motion.section>
  )
}
