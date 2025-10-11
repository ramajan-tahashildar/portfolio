'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [uptime, setUptime] = useState('99.99')
  const [days, setDays] = useState(0)

  useEffect(() => {
    // Calculate days since portfolio launch (example: Jan 1, 2024)
    const launchDate = new Date('2024-01-01')
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - launchDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setDays(diffDays)

    // Simulate uptime variations
    const interval = setInterval(() => {
      const variation = (Math.random() - 0.5) * 0.01
      const newUptime = Math.min(99.99, Math.max(99.90, parseFloat(uptime) + variation))
      setUptime(newUptime.toFixed(2))
    }, 5000)

    return () => clearInterval(interval)
  }, [uptime])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-4 border-t border-primary/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Ramajan Control Center
            </h3>
            <p className="text-subtext text-sm">
              Backend & DevOps Engineer
            </p>
            <p className="text-subtext text-sm mt-2">
              Building systems that scale, automate, and perform.
            </p>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="neon-card-indigo rounded-lg p-4 backdrop-blur-md">
              <p className="text-subtext text-xs mb-2">PORTFOLIO UPTIME</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-3 h-3 bg-success rounded-full animate-pulse"></span>
                <span className="text-3xl font-bold text-success">{uptime}%</span>
              </div>
              <p className="text-subtext text-xs">
                {days} days online • All systems operational
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-right"
          >
            <h4 className="font-bold gradient-text-primary mb-3">Quick Navigation</h4>
            <div className="space-y-2 text-sm">
              <a href="#dashboard" className="block text-subtext hover:text-primary transition-colors">
                → Dashboard
              </a>
              <a href="#about" className="block text-subtext hover:text-primary transition-colors">
                → About
              </a>
              <a href="#projects" className="block text-subtext hover:text-primary transition-colors">
                → Projects
              </a>
              <a href="#incident-response" className="block text-subtext hover:text-primary transition-colors">
                → Incident Response
              </a>
              <a href="#auto-scaling" className="block text-subtext hover:text-primary transition-colors">
                → Auto-Scaling
              </a>
              <a href="#contact" className="block text-subtext hover:text-primary transition-colors">
                → Contact
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-primary/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-subtext text-sm">
              © {currentYear} Ramajan Tahashildar. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-2 text-subtext text-sm">
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-error"
            >
              ❤️
            </motion.span>
            <span>using Next.js, TailwindCSS & Framer Motion</span>
          </div>

          <div className="text-subtext text-sm font-terminal">
            <span className="text-primary">$</span> system.status
            <span className="text-success ml-2">✓ OPERATIONAL</span>
          </div>
        </motion.div>

        {/* Terminal Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <pre className="text-primary text-xs font-terminal opacity-50">
{`
  ____                        _             
 |  _ \\ __ _ _ __ ___   __ _ (_) __ _ _ __  
 | |_) / _\` | '_ \` _ \\ / _\` || |/ _\` | '_ \\ 
 |  _ < (_| | | | | | | (_| || | (_| | | | |
 |_| \\_\\__,_|_| |_| |_|\\__,_|/ |\\__,_|_| |_|
                           |__/              
`}
          </pre>
        </motion.div>
      </div>
    </footer>
  )
}

