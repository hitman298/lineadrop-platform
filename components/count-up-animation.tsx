"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CountUpAnimationProps {
  end: number
  duration?: number
  className?: string
}

export default function CountUpAnimation({ end, duration = 2000, className = "" }: CountUpAnimationProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <motion.span className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {count.toLocaleString()}
    </motion.span>
  )
}
