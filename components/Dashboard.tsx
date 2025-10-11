'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Metric {
  label: string
  value: string
  unit: string
  color: string
  icon: string
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: 'CPU Usage', value: '37', unit: '%', color: 'primary', icon: '/icons/cloud-computing.png' },
    { label: 'Memory Usage', value: '62', unit: '%', color: 'secondary', icon: '/icons/cloud.png' },
    { label: 'Active Jobs', value: '12', unit: '', color: 'success', icon: '/icons/software.gif' },
    { label: 'Containers', value: '3', unit: '', color: 'primary', icon: '/icons/launch.png' },
    { label: 'API Requests', value: '125', unit: '/sec', color: 'secondary', icon: '/icons/social.png' },
    { label: 'Uptime', value: '99.97', unit: '%', color: 'success', icon: '/icons/cloud-computing.png' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const baseValue = parseFloat(metric.value)
        const variation = (Math.random() - 0.5) * 10
        let newValue = baseValue + variation
        
        if (metric.label === 'Uptime') {
          newValue = Math.min(99.99, Math.max(99.90, newValue))
        } else if (metric.unit === '%') {
          newValue = Math.min(100, Math.max(0, newValue))
        } else if (metric.label === 'API Requests') {
          newValue = Math.min(200, Math.max(80, newValue))
        } else {
          newValue = Math.max(1, newValue)
        }
        
        return {
          ...metric,
          value: metric.unit === '%' || metric.label === 'Uptime' 
            ? newValue.toFixed(2) 
            : Math.floor(newValue).toString()
        }
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="dashboard" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-primary mb-4">
            Live Infrastructure Dashboard
          </h2>
          <p className="text-subtext">Real-time system metrics • Auto-updating every 2s</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              className="neon-card-indigo rounded-lg p-6 hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-subtext text-sm font-terminal mb-1">{metric.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold text-${metric.color}`}>
                      {metric.value}
                    </span>
                    <span className="text-subtext text-lg">{metric.unit}</span>
                  </div>
                </div>
                <Image 
                  src={metric.icon} 
                  alt={metric.label}
                  width={32}
                  height={32}
                  className="opacity-80 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                />
              </div>

              {metric.unit === '%' && (
                <div className="progress-bar">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="inline-block neon-card rounded-full px-6 py-3">
            <p className="text-success">
              <span className="inline-block w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></span>
              All pipelines green • Deployment Status: ✅ LIVE
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

