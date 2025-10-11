'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface PipelineStep {
  name: string
  status: 'pending' | 'running' | 'success' | 'error'
  logs: string[]
}

export default function CICDSimulation() {
  const [isRunning, setIsRunning] = useState(false)
  const [steps, setSteps] = useState<PipelineStep[]>([
    { name: 'Lint', status: 'pending', logs: [] },
    { name: 'Test', status: 'pending', logs: [] },
    { name: 'Build', status: 'pending', logs: [] },
    { name: 'Deploy', status: 'pending', logs: [] },
  ])
  const [terminalLogs, setTerminalLogs] = useState<string[]>([])

  const runPipeline = async () => {
    if (isRunning) return
    
    setIsRunning(true)
    setTerminalLogs(['> Starting deployment pipeline...', '> Initializing CI/CD process...'])
    
    const stepLogs = {
      Lint: [
        '✓ Running ESLint...',
        '✓ Checking code style...',
        '✓ No linting errors found',
        '✓ Lint stage passed'
      ],
      Test: [
        '✓ Running unit tests...',
        '✓ Running integration tests...',
        '✓ 127 tests passed',
        '✓ Test coverage: 94%',
        '✓ Test stage passed'
      ],
      Build: [
        '✓ Installing dependencies...',
        '✓ Compiling TypeScript...',
        '✓ Building production bundle...',
        '✓ Optimizing assets...',
        '✓ Build stage passed'
      ],
      Deploy: [
        '✓ Connecting to server...',
        '✓ Uploading artifacts...',
        '✓ Running database migrations...',
        '✓ Restarting services...',
        '✓ Deployment successful!',
        '✓ Application is now live at https://portfolio.ramajan.dev'
      ]
    }

    for (let i = 0; i < steps.length; i++) {
      // Mark as running
      setSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: 'running' } : step
      ))

      const currentStep = steps[i]
      const logs = stepLogs[currentStep.name as keyof typeof stepLogs]

      // Add logs one by one
      for (const log of logs) {
        await new Promise(resolve => setTimeout(resolve, 400))
        setTerminalLogs(prev => [...prev, log])
      }

      // Mark as success
      await new Promise(resolve => setTimeout(resolve, 500))
      setSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: 'success', logs } : step
      ))
    }

    setTerminalLogs(prev => [...prev, '', '🎉 Pipeline completed successfully!', '> All stages passed in 24.3s'])
    setIsRunning(false)
  }

  const resetPipeline = () => {
    setSteps([
      { name: 'Lint', status: 'pending', logs: [] },
      { name: 'Test', status: 'pending', logs: [] },
      { name: 'Build', status: 'pending', logs: [] },
      { name: 'Deploy', status: 'pending', logs: [] },
    ])
    setTerminalLogs([])
    setIsRunning(false)
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'pending': return '○'
      case 'running': return '◐'
      case 'success': return '✓'
      case 'error': return '✗'
      default: return '○'
    }
  }

  const getStepColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-subtext'
      case 'running': return 'text-primary animate-pulse'
      case 'success': return 'text-success'
      case 'error': return 'text-error'
      default: return 'text-subtext'
    }
  }

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
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            CI/CD Pipeline Demo
          </h2>
          <p className="text-subtext font-terminal">$ ./deploy.sh --interactive</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pipeline Steps */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="neon-card rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Image src="/icons/launch.png" alt="Pipeline" width={32} height={32} />
              <h3 className="text-2xl font-bold gradient-text-primary">Pipeline Stages</h3>
            </div>
            
            <div className="space-y-6 mb-8">
              {steps.map((step, index) => (
                <div key={step.name} className="flex items-start gap-4">
                  <div className={`text-3xl ${getStepColor(step.status)}`}>
                    {getStepIcon(step.status)}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-lg font-bold mb-1 ${getStepColor(step.status)}`}>
                      {index + 1}. {step.name}
                    </h4>
                    {step.status === 'running' && (
                      <div className="progress-bar mt-2">
                        <motion.div
                          className="progress-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    )}
                    {step.status === 'success' && (
                      <p className="text-success text-sm">Stage completed</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={runPipeline}
                disabled={isRunning}
                className={`neon-button rounded-md flex-1 relative ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="relative z-10">
                  {isRunning ? '⏳ Running...' : '🚀 Deploy Portfolio'}
                </span>
              </button>
              <button
                onClick={resetPipeline}
                disabled={isRunning}
                className="border-2 border-error text-error px-6 py-3 rounded-md hover:bg-error/10 transition-all disabled:opacity-50"
              >
                Reset
              </button>
            </div>
          </motion.div>

          {/* Terminal Logs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="neon-card-indigo rounded-lg p-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-header font-bold text-secondary">Terminal Output</h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFB800]"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 h-96 overflow-y-auto text-sm">
              {terminalLogs.length === 0 ? (
                <p className="text-subtext">Waiting for deployment to start...<span className="terminal-cursor"></span></p>
              ) : (
                <div className="space-y-1">
                  {terminalLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`${
                        log.startsWith('✓') ? 'text-success' :
                        log.startsWith('✗') ? 'text-error' :
                        log.startsWith('>') ? 'text-primary' :
                        log.startsWith('🎉') ? 'text-success font-bold' :
                        'text-text'
                      }`}
                    >
                      {log}
                    </motion.div>
                  ))}
                  {isRunning && (
                    <span className="terminal-cursor"></span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

