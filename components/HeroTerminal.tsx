'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const terminalLines = [
  { command: '$ whoami', output: 'Ramajan Tahashildar | Backend & DevOps Engineer', delay: 0 },
  { command: "$ echo 'I build systems, not just code.'", output: '✅ Distributed Jobs | Scalable APIs | Automated Pipelines', delay: 1000 },
  { command: '$ portfolio status', output: 'Live | Monitored | Optimized', delay: 2000 },
  { command: '$ skills list', output: 'Node.js | Docker | Redis | AWS | CI/CD | WebSockets', delay: 3000 },
  { command: '$ run deploy portfolio', output: 'Initiating… [██████▓       ] 65%', delay: 4000 },
]

export default function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [currentTyping, setCurrentTyping] = useState<{ index: number; text: string; isCommand: boolean } | null>(null)

  useEffect(() => {
    terminalLines.forEach((line, index) => {
      setTimeout(() => {
        // Type command
        const commandChars = line.command.split('')
        let commandText = ''
        
        commandChars.forEach((char, charIndex) => {
          setTimeout(() => {
            commandText += char
            setCurrentTyping({ index, text: commandText, isCommand: true })
            
            if (charIndex === commandChars.length - 1) {
              setTimeout(() => {
                setCurrentTyping({ index, text: line.output, isCommand: false })
                setVisibleLines(prev => [...prev, index])
              }, 300)
            }
          }, charIndex * 50)
        })
      }, line.delay)
    })
  }, [])

  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="neon-card rounded-lg p-8 md:p-12"
        >
          <div className="terminal-header mb-6 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFB800]"></div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
            </div>
            <span className="text-sm text-subtext ml-4">ramajan@control-center:~</span>
          </div>

          <div className="terminal-body space-y-4">
            {terminalLines.map((line, index) => (
              <div key={index} className="terminal-line">
                {(visibleLines.includes(index) || currentTyping?.index === index) && (
                  <>
                    <div className="text-primary font-terminal">
                      {currentTyping?.index === index && currentTyping.isCommand
                        ? currentTyping.text
                        : line.command}
                      {currentTyping?.index === index && currentTyping.isCommand && (
                        <span className="terminal-cursor"></span>
                      )}
                    </div>
                    {visibleLines.includes(index) && (
                      <div className="text-text ml-4 mt-1 font-terminal">{line.output}</div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 0.6 }}
            className="mt-8 flex justify-center"
          >
            <button onClick={scrollToDashboard} className="neon-button rounded-md relative z-10">
              <span className="relative z-10 font-sans">⚡ Enter Dashboard</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.5, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-subtext text-sm">Press Enter or scroll to continue</p>
        </motion.div>
      </div>
    </section>
  )
}

