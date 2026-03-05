import { motion } from "motion/react"

type ScrollInTextProps = {
  text: string
  className?: string
}

export function ScrollInText({ text, className }: ScrollInTextProps) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, color: "#22c55e", y: 16 }}
      whileInView={{ opacity: 1, color: "#000000", y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {text}
    </motion.p>
  )
}
