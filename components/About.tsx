'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  const highlights = [
    "Built distributed job queuing systems handling 10M+ jobs/day",
    "Architected microservices infrastructure with 99.9% uptime",
    "Automated CI/CD pipelines reducing deployment time by 80%",
    "Optimized API performance from 2s to 200ms response time"
  ]

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
            About Me
          </h2>
          <p className="text-subtext font-terminal">$ cat about.txt</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="neon-card rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="/icons/software.gif" 
                alt="DevOps" 
                width={48} 
                height={48}
                className="rounded-lg"
              />
              <h3 className="text-2xl font-bold gradient-text-primary">Engineering Philosophy</h3>
            </div>
            
            <p className="text-text leading-relaxed mb-6">
              Passionate Backend & DevOps Engineer with expertise in building scalable distributed 
              systems and automating infrastructure. I thrive on optimizing performance, ensuring 
              reliability, and creating seamless deployment pipelines.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-success text-xl">▸</span>
                <p className="text-subtext text-sm">
                  "Code is temporary, systems are forever. Build for scale, optimize for reliability."
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">▸</span>
                <p className="text-subtext text-sm">
                  "Automation isn't lazy, it's strategic. Eliminate toil, amplify impact."
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-secondary text-xl">▸</span>
                <p className="text-subtext text-sm">
                  "Monitor everything, assume nothing. Observability is non-negotiable."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="neon-card-indigo rounded-lg p-6">
              <h4 className="text-xl font-header font-bold text-secondary mb-4 flex items-center gap-2">
                <span>🏆</span> Key Achievements
              </h4>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 group"
                  >
                    <span className="text-success mt-1 group-hover:scale-125 transition-transform">✓</span>
                    <p className="text-text text-sm leading-relaxed">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="neon-card rounded-lg p-6 bg-gradient-to-br from-background to-secondary/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-subtext text-sm mb-1">Current Focus</p>
                  <p className="text-primary font-terminal font-bold">Kubernetes • Terraform • Microservices</p>
                </div>
                <Image 
                  src="/icons/cloud-computing.png" 
                  alt="Cloud" 
                  width={40} 
                  height={40}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

