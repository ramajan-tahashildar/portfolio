'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Alert {
  id: string
  title: string
  severity: 'info' | 'warning' | 'critical'
  description: string
  timestamp: string
  status: 'active' | 'resolving' | 'resolved'
}

interface LogEntry {
  id: string
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS'
  message: string
  alertId?: string
}

const initialAlerts: Alert[] = [
  {
    id: '1',
    title: 'CPU Usage Spike',
    severity: 'warning',
    description: 'High CPU usage detected on web-server-01',
    timestamp: '14:23:15',
    status: 'active'
  },
  {
    id: '2',
    title: 'Container Down',
    severity: 'critical',
    description: 'api-container-03 has stopped responding',
    timestamp: '14:25:42',
    status: 'active'
  },
  {
    id: '3',
    title: 'API Error Rate',
    severity: 'info',
    description: 'Increased 5xx errors on payment service',
    timestamp: '14:26:18',
    status: 'active'
  }
]

export default function IncidentResponse() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [resolvingAlerts, setResolvingAlerts] = useState<Set<string>>(new Set())
  const [stats, setStats] = useState({ resolved: 0, pending: 3 })

  // Auto-generate logs
  useEffect(() => {
    const generateLogs = () => {
      const logLevels = ['INFO', 'WARN', 'ERROR'] as const
      const messages = [
        'Health check completed',
        'Memory usage: 78%',
        'Database connection established',
        'Cache hit ratio: 94%',
        'SSL certificate valid',
        'Load balancer status: OK',
        'Backup completed successfully',
        'Service discovery updated'
      ]

      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        level: logLevels[Math.floor(Math.random() * logLevels.length)],
        message: messages[Math.floor(Math.random() * messages.length)]
      }

      setLogs(prev => [...prev.slice(-19), newLog])
    }

    const interval = setInterval(generateLogs, 2000)
    return () => clearInterval(interval)
  }, [])

  // Auto-generate new alerts
  useEffect(() => {
    const generateAlert = () => {
      const alertTypes = [
        { title: 'Memory Leak Detected', severity: 'warning' as const, desc: 'Memory usage increasing steadily' },
        { title: 'Database Slow Query', severity: 'info' as const, desc: 'Query taking longer than expected' },
        { title: 'Service Unavailable', severity: 'critical' as const, desc: 'External API service down' },
        { title: 'Disk Space Low', severity: 'warning' as const, desc: 'Disk usage above 85%' }
      ]

      const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
      const newAlert: Alert = {
        id: Date.now().toString(),
        title: alertType.title,
        severity: alertType.severity,
        description: alertType.desc,
        timestamp: new Date().toLocaleTimeString(),
        status: 'active'
      }

      setAlerts(prev => [...prev, newAlert])
      setStats(prev => ({ ...prev, pending: prev.pending + 1 }))
    }

    const interval = setInterval(generateAlert, 8000)
    return () => clearInterval(interval)
  }, [])

  const resolveAlert = async (alertId: string) => {
    setResolvingAlerts(prev => new Set(prev).add(alertId))
    
    // Add resolving log
    const resolvingLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      level: 'INFO',
      message: `Attempting to resolve alert: ${alerts.find(a => a.id === alertId)?.title}`,
      alertId
    }
    setLogs(prev => [...prev, resolvingLog])

    // Simulate resolution process
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Add success log
    const successLog: LogEntry = {
      id: (Date.now() + 1).toString(),
      timestamp: new Date().toLocaleTimeString(),
      level: 'SUCCESS',
      message: `Alert resolved: ${alerts.find(a => a.id === alertId)?.title}`,
      alertId
    }
    setLogs(prev => [...prev, successLog])

    // Update alert status and remove from active alerts
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
    setResolvingAlerts(prev => {
      const newSet = new Set(prev)
      newSet.delete(alertId)
      return newSet
    })
    setStats(prev => ({ resolved: prev.resolved + 1, pending: prev.pending - 1 }))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-error'
      case 'warning': return 'text-[#FFB800]'
      case 'info': return 'text-primary'
      default: return 'text-subtext'
    }
  }

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-error/20 border-error/40'
      case 'warning': return 'bg-[#FFB800]/20 border-[#FFB800]/40'
      case 'info': return 'bg-primary/20 border-primary/40'
      default: return 'bg-subtext/20 border-subtext/40'
    }
  }

  const getLogColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-error'
      case 'WARN': return 'text-[#FFB800]'
      case 'SUCCESS': return 'text-success'
      case 'INFO': return 'text-primary'
      default: return 'text-text'
    }
  }

  return (
    <section id="incident-response" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Incident Response Simulation
          </h2>
          <p className="text-subtext font-terminal">$ incident-monitor --live</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Alerts Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="neon-card rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold gradient-text-primary">System Alerts</h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-success">Resolved: {stats.resolved}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
                  <span className="text-error">Pending: {stats.pending}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`neon-card rounded-lg p-4 ${getSeverityBg(alert.severity)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${alert.severity === 'critical' ? 'animate-pulse' : ''} ${
                          alert.severity === 'critical' ? 'bg-error' : 
                          alert.severity === 'warning' ? 'bg-[#FFB800]' : 'bg-primary'
                        }`}></div>
                        <h4 className={`font-bold ${getSeverityColor(alert.severity)}`}>{alert.title}</h4>
                      </div>
                      <span className="text-subtext text-xs font-terminal">{alert.timestamp}</span>
                    </div>
                    
                    <p className="text-text text-sm mb-4">{alert.description}</p>
                    
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      disabled={resolvingAlerts.has(alert.id)}
                      className="neon-button rounded-md px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resolvingAlerts.has(alert.id) ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          <span>Resolving...</span>
                        </div>
                      ) : (
                        'Resolve Alert'
                      )}
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Logs Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="neon-card-indigo rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Image src="/icons/software.gif" alt="Logs" width={32} height={32} />
              <h3 className="text-2xl font-bold gradient-text-secondary">System Logs</h3>
            </div>

            <div className="bg-background/50 rounded-lg p-4 h-96 overflow-y-auto font-terminal text-sm">
              <div className="space-y-1">
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-3 ${
                      log.level === 'ERROR' ? 'bg-error/10 border-l-2 border-error' :
                      log.level === 'WARN' ? 'bg-[#FFB800]/10 border-l-2 border-[#FFB800]' :
                      log.level === 'SUCCESS' ? 'bg-success/10 border-l-2 border-success' :
                      'border-l-2 border-primary'
                    } pl-2 py-1`}
                  >
                    <span className="text-subtext text-xs">{log.timestamp}</span>
                    <span className={`font-bold ${getLogColor(log.level)}`}>[{log.level}]</span>
                    <span className="text-text">{log.message}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          <div className="neon-card rounded-lg p-4 text-center">
            <h4 className="font-bold gradient-text-primary mb-2">Response Time</h4>
            <p className="text-2xl font-bold text-success">2.3s</p>
            <p className="text-subtext text-xs">Average resolution</p>
          </div>
          <div className="neon-card-indigo rounded-lg p-4 text-center">
            <h4 className="font-bold gradient-text-secondary mb-2">Uptime</h4>
            <p className="text-2xl font-bold text-success">99.97%</p>
            <p className="text-subtext text-xs">Last 30 days</p>
          </div>
          <div className="neon-card rounded-lg p-4 text-center">
            <h4 className="font-bold gradient-text-primary mb-2">Auto-Heal</h4>
            <p className="text-2xl font-bold text-success">87%</p>
            <p className="text-subtext text-xs">Self-recovery rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
