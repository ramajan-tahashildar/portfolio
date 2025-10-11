'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Loader from '@/components/Loader'
import HeroTerminal from '@/components/HeroTerminal'
import Dashboard from '@/components/Dashboard'
import About from '@/components/About'
import TechStack from '@/components/TechStack'
import Projects from '@/components/Projects'
import CICDSimulation from '@/components/CICDSimulation'
import IncidentResponse from '@/components/IncidentResponse'
import AutoScalingDemo from '@/components/AutoScalingDemo'
import InfrastructureMap from '@/components/InfrastructureMap'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Dynamically import ParticleBackground to avoid SSR issues
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), {
  ssr: false,
})

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <main className="relative">
      <ParticleBackground />
      
      <div className="content-wrapper relative z-10">
        <HeroTerminal />
        <Dashboard />
        <About />
        <TechStack />
        <Projects />
        <CICDSimulation />
        <IncidentResponse />
        <AutoScalingDemo />
        <InfrastructureMap />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}

