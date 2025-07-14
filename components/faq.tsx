"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "Is this official?",
      answer:
        "No, this is an unofficial prediction tool based on publicly available data and community analysis. The actual Linea airdrop criteria may differ from our predictions.",
    },
    {
      question: "Where is this data from?",
      answer:
        "We aggregate data from Linea's public blockchain, including LXP balances, transaction history, and POH verification status. All data is publicly verifiable on-chain.",
    },
    {
      question: "How is my score calculated?",
      answer:
        "The score is calculated based on multiple factors including LXP balance, LXP-L balance, transaction volume, POH status, and network activity. Higher engagement typically results in better scores.",
    },
    {
      question: "Why is LXP different from LXP-L?",
      answer:
        "LXP (Linea Experience Points) are earned through general network activity, while LXP-L are earned through specific campaigns and have higher weighting in our prediction model.",
    },
    {
      question: "What does POH mean?",
      answer:
        "POH stands for Proof of Humanity, a verification system that confirms you're a real person. Having POH verification can significantly boost your predicted airdrop allocation.",
    },
    {
      question: "When will the actual airdrop happen?",
      answer:
        "The official Linea airdrop timing hasn't been announced. This tool helps you prepare by understanding your current eligibility status based on historical patterns.",
    },
  ]

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-[#111111] border-[#333333]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">FREQUENTLY ASKED QUESTIONS</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-[#0a0a0a] border border-[#222222] px-4">
                <AccordionTrigger className="text-left font-medium hover:text-[#3b82f6] transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#aaaaaa] leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </motion.section>
  )
}
