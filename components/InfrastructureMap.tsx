'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface Node {
  id: number
  name: string
  type: string
  description: string
  icon: string
  x: number
  y: number
}

const nodes: Node[] = [
  { id: 1, name: 'Client', type: 'entry', description: 'User Browser / Mobile App', icon: '/icons/broken-monitor.png', x: 15, y: 50 },
  { id: 2, name: 'Nginx', type: 'proxy', description: 'Load Balancer & Reverse Proxy', icon: '/icons/launch.png', x: 35, y: 50 },
  { id: 3, name: 'Node.js API', type: 'service', description: 'REST API Server', icon: '/icons/software.gif', x: 55, y: 50 },
  { id: 4, name: 'MongoDB', type: 'database', description: 'Primary Database', icon: '/icons/cloud-computing.png', x: 75, y: 25 },
  { id: 5, name: 'Redis', type: 'cache', description: 'Cache & Session Store', icon: '/icons/cloud.png', x: 75, y: 50 },
  { id: 6, name: 'AWS S3', type: 'storage', description: 'Static Assets Storage', icon: '/icons/cloud.png', x: 75, y: 75 },
]

const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 3, to: 5 },
  { from: 3, to: 6 },
]

export default function InfrastructureMap() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-secondary mb-4">
            Infrastructure Map
          </h2>
          <p className="text-subtext font-terminal">$ architecture --visualize --flow</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="neon-card rounded-lg p-12 relative overflow-hidden backdrop-blur-md"
          style={{ minHeight: '600px' }}
        >
          {/* Enhanced Connection Lines with Curves */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#6C63FF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00FF7F" stopOpacity="0.6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {connections.map((conn, index) => {
              const fromNode = nodes.find(n => n.id === conn.from)
              const toNode = nodes.find(n => n.id === conn.to)
              if (!fromNode || !toNode) return null

              const x1 = fromNode.x
              const y1 = fromNode.y
              const x2 = toNode.x
              const y2 = toNode.y

              // Create curved paths for better visual flow
              const isDataFlow = conn.to >= 4 // Database connections
              const controlPointX = (x1 + x2) / 2
              const controlPointY = isDataFlow ? Math.min(y1, y2) - 10 : (y1 + y2) / 2
              
              const pathData = `M ${x1} ${y1} Q ${controlPointX} ${controlPointY} ${x2} ${y2}`

              return (
                <g key={index}>
                  {/* Glow effect background */}
                  <motion.path
                    d={pathData}
                    stroke={isDataFlow ? "#6C63FF" : "#00FFFF"}
                    strokeWidth="8"
                    fill="none"
                    strokeOpacity="0.2"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                  />
                  {/* Main connection line */}
                  <motion.path
                    d={pathData}
                    stroke={isDataFlow ? "url(#dataGradient)" : "url(#flowGradient)"}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                  />
                  {/* Animated dots along the path */}
                  <motion.circle
                    cx={x1}
                    cy={y1}
                    r="3"
                    fill={isDataFlow ? "#6C63FF" : "#00FFFF"}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 0] }}
                    transition={{ 
                      duration: 2, 
                      delay: index * 0.3 + 1,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                </g>
              )
            })}
          </svg>

          {/* Data Flow Particles */}
          {connections.map((conn, index) => {
            const fromNode = nodes.find(n => n.id === conn.from)
            const toNode = nodes.find(n => n.id === conn.to)
            if (!fromNode || !toNode) return null

            const isDataFlow = conn.to >= 4
            const particleColor = isDataFlow ? "#6C63FF" : "#00FFFF"

            return (
              <motion.div
                key={`particle-${index}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: particleColor,
                  left: `${fromNode.x}%`,
                  top: `${fromNode.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 5,
                  boxShadow: `0 0 10px ${particleColor}`,
                }}
                animate={{
                  left: [`${fromNode.x}%`, `${toNode.x}%`],
                  top: [`${fromNode.y}%`, `${toNode.y}%`],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "linear"
                }}
              />
            )
          })}

          {/* Nodes */}
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
              className="absolute cursor-pointer"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: hoveredNode === node.id ? 10 : 2,
              }}
            >
              <div className={`relative ${hoveredNode === node.id ? 'z-20' : ''}`}>
                {/* Connection points */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-4 h-4 rounded-full bg-primary/30 animate-pulse"></div>
                </div>
                
                <div className={`neon-card-indigo rounded-full w-24 h-24 flex items-center justify-center hover:shadow-glass-indigo-hover hover:scale-110 transition-all duration-300 group ${
                  node.type === 'entry' ? 'ring-2 ring-primary/50' :
                  node.type === 'proxy' ? 'ring-2 ring-secondary/50' :
                  node.type === 'service' ? 'ring-2 ring-success/50' :
                  'ring-2 ring-[#FFB800]/50'
                }`}>
                  <Image 
                    src={node.icon} 
                    alt={node.name}
                    width={44}
                    height={44}
                    className="group-hover:rotate-12 transition-all duration-300"
                  />
                </div>
                <p className="text-center mt-3 text-sm text-primary font-bold whitespace-nowrap">
                  {node.name}
                </p>
                <p className="text-center mt-1 text-xs text-subtext">
                  {node.type.toUpperCase()}
                </p>

                {hoveredNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-64 z-30"
                  >
                    <div className="neon-card rounded-lg p-4">
                      <h4 className="font-bold text-primary mb-2">{node.name}</h4>
                      <p className="text-text text-sm mb-2">{node.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                        <span className="text-success text-xs">Active</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Enhanced Flow Labels */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-primary/30">
              <p className="text-primary font-terminal text-sm">
                ← Request Flow → Data Flow →
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid md:grid-cols-4 gap-4"
        >
          <div className="neon-card rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
            </div>
            <h4 className="font-bold gradient-text-primary mb-2">Entry Point</h4>
            <p className="text-subtext text-sm">Client Applications</p>
          </div>
          <div className="neon-card-indigo rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
            </div>
            <h4 className="font-bold gradient-text-secondary mb-2">Proxy Layer</h4>
            <p className="text-subtext text-sm">Load Balancing</p>
          </div>
          <div className="neon-card rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
            </div>
            <h4 className="font-bold gradient-text-primary mb-2">Application</h4>
            <p className="text-subtext text-sm">API Services</p>
          </div>
          <div className="neon-card-indigo rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-[#FFB800]/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-[#FFB800] rounded-full"></div>
            </div>
            <h4 className="font-bold gradient-text-secondary mb-2">Data & Storage</h4>
            <p className="text-subtext text-sm">Databases & Files</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

