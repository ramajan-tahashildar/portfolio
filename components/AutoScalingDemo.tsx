'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Container {
  id: string
  name: string
  cpu: number
  memory: number
  status: 'active' | 'scaling' | 'terminating'
  requests: number
}

interface Metrics {
  totalContainers: number
  avgCpu: number
  avgMemory: number
  requestsPerSec: number
}

export default function AutoScalingDemo() {
  const [containers, setContainers] = useState<Container[]>([
    {
      id: '1',
      name: 'web-server-01',
      cpu: 45,
      memory: 62,
      status: 'active',
      requests: 125
    }
  ])
  const [metrics, setMetrics] = useState<Metrics>({
    totalContainers: 1,
    avgCpu: 45,
    avgMemory: 62,
    requestsPerSec: 125
  })
  const [isScaling, setIsScaling] = useState(false)
  const [isReducing, setIsReducing] = useState(false)

  // Simulate live metrics updates
  useEffect(() => {
    const updateMetrics = () => {
      setContainers(prev => prev.map(container => ({
        ...container,
        cpu: Math.max(10, Math.min(100, container.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(95, container.memory + (Math.random() - 0.5) * 5)),
        requests: Math.max(50, container.requests + (Math.random() - 0.5) * 20)
      })))
    }

    const interval = setInterval(updateMetrics, 2000)
    return () => clearInterval(interval)
  }, [])

  // Update aggregate metrics
  useEffect(() => {
    const avgCpu = containers.reduce((sum, c) => sum + c.cpu, 0) / containers.length
    const avgMemory = containers.reduce((sum, c) => sum + c.memory, 0) / containers.length
    const totalRequests = containers.reduce((sum, c) => sum + c.requests, 0)

    setMetrics({
      totalContainers: containers.length,
      avgCpu: Math.round(avgCpu),
      avgMemory: Math.round(avgMemory),
      requestsPerSec: totalRequests
    })
  }, [containers])

  const simulateLoad = async () => {
    setIsScaling(true)
    
    // Scale up containers gradually
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newContainer: Container = {
        id: Date.now().toString() + i,
        name: `web-server-${String(containers.length + i + 1).padStart(2, '0')}`,
        cpu: Math.floor(Math.random() * 40) + 60, // High load
        memory: Math.floor(Math.random() * 30) + 50,
        status: 'scaling',
        requests: Math.floor(Math.random() * 100) + 150
      }
      
      setContainers(prev => [...prev, newContainer])
      
      // Mark as active after scaling
      setTimeout(() => {
        setContainers(prev => prev.map(c => 
          c.id === newContainer.id ? { ...c, status: 'active' } : c
        ))
      }, 1000)
    }
    
    setIsScaling(false)
  }

  const reduceLoad = async () => {
    setIsReducing(true)
    
    // Remove containers gradually
    for (let i = 0; i < Math.min(2, containers.length - 1); i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setContainers(prev => {
        const containersToRemove = prev.slice(-1)
        return prev.filter(c => !containersToRemove.some(remove => remove.id === c.id))
      })
    }
    
    setIsReducing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success'
      case 'scaling': return 'text-[#FFB800]'
      case 'terminating': return 'text-error'
      default: return 'text-subtext'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 border-success/40'
      case 'scaling': return 'bg-[#FFB800]/20 border-[#FFB800]/40'
      case 'terminating': return 'bg-error/20 border-error/40'
      default: return 'bg-subtext/20 border-subtext/40'
    }
  }

  return (
    <section id="auto-scaling" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-secondary mb-4">
            Auto-Scaling Demo
          </h2>
          <p className="text-subtext font-terminal">$ kubectl get pods --watch</p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neon-card rounded-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/icons/cloud-computing.png" alt="Scaling" width={32} height={32} />
              <h3 className="text-xl font-bold gradient-text-primary">Load Simulation</h3>
            </div>
            <div className="flex gap-4">
              <button
                onClick={simulateLoad}
                disabled={isScaling || containers.length >= 5}
                className="neon-button rounded-md px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScaling ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>Scaling...</span>
                  </div>
                ) : (
                  'Simulate Load'
                )}
              </button>
              <button
                onClick={reduceLoad}
                disabled={isReducing || containers.length <= 1}
                className="border-2 border-secondary text-secondary px-6 py-2 rounded-md hover:bg-secondary/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isReducing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>Reducing...</span>
                  </div>
                ) : (
                  'Reduce Load'
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Containers Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="neon-card-indigo rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Image src="/icons/launch.png" alt="Containers" width={32} height={32} />
                <h3 className="text-2xl font-bold gradient-text-secondary">Running Containers</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {containers.map((container) => (
                    <motion.div
                      key={container.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`neon-card rounded-lg p-4 ${getStatusBg(container.status)} group`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Image src="/icons/cloud.png" alt="Container" width={20} height={20} />
                          <h4 className="font-bold text-primary">{container.name}</h4>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${container.status === 'active' ? 'bg-success animate-pulse' : container.status === 'scaling' ? 'bg-[#FFB800] animate-spin' : 'bg-error'}`}></div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-subtext">CPU Usage</span>
                            <span className="text-primary font-bold">{container.cpu}%</span>
                          </div>
                          <div className="progress-bar">
                            <motion.div
                              className="progress-bar-fill"
                              style={{ width: `${container.cpu}%` }}
                              animate={{ width: `${container.cpu}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-subtext">Memory Usage</span>
                            <span className="text-secondary font-bold">{container.memory}%</span>
                          </div>
                          <div className="progress-bar">
                            <motion.div
                              className="progress-bar-fill bg-secondary"
                              style={{ width: `${container.memory}%` }}
                              animate={{ width: `${container.memory}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-subtext text-sm">Requests/sec</span>
                          <span className="text-success font-bold">{container.requests}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Metrics Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="neon-card rounded-lg p-6">
              <h3 className="text-xl font-bold gradient-text-primary mb-4">Live Metrics</h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-1">{metrics.totalContainers}</div>
                  <div className="text-subtext text-sm">Total Containers</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-subtext">Avg CPU</span>
                    <span className="text-primary font-bold">{metrics.avgCpu}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-bar-fill"
                      style={{ width: `${metrics.avgCpu}%` }}
                      animate={{ width: `${metrics.avgCpu}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-subtext">Avg Memory</span>
                    <span className="text-secondary font-bold">{metrics.avgMemory}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-bar-fill bg-secondary"
                      style={{ width: `${metrics.avgMemory}%` }}
                      animate={{ width: `${metrics.avgMemory}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-primary/20">
                  <div className="text-2xl font-bold text-success mb-1">{metrics.requestsPerSec}</div>
                  <div className="text-subtext text-sm">Requests/sec</div>
                </div>
              </div>
            </div>

            {/* Scaling Status */}
            <div className="neon-card-indigo rounded-lg p-6">
              <h3 className="text-lg font-bold gradient-text-secondary mb-4">Scaling Status</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-subtext text-sm">Auto-scaling</span>
                  <span className="text-success font-bold">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-subtext text-sm">Min replicas</span>
                  <span className="text-primary font-bold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-subtext text-sm">Max replicas</span>
                  <span className="text-primary font-bold">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-subtext text-sm">CPU threshold</span>
                  <span className="text-primary font-bold">70%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-subtext text-sm">Scale-up delay</span>
                  <span className="text-primary font-bold">30s</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
