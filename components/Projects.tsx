'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import Image from 'next/image'

interface Project {
  id: number
  name: string
  description: string
  stack: string[]
  architecture: string
  features: string[]
  repo: string
  live: string | null
}

const projects: Project[] = [
  {
    id: 1,
    name: "Distributed Job Queue System",
    description: "Built a scalable job processing system handling 10M+ jobs per day with Redis and Bull",
    stack: ["Node.js", "Redis", "Bull", "Docker", "AWS"],
    architecture: "Microservices with message queue pattern",
    features: [
      "Priority-based job scheduling",
      "Auto-scaling workers",
      "Real-time monitoring dashboard",
      "Failure retry mechanism"
    ],
    repo: "https://github.com/ramajan",
    live: null
  },
  {
    id: 2,
    name: "Real-time Analytics API",
    description: "High-performance API serving 1000+ req/sec with WebSocket support for live data streaming",
    stack: ["Node.js", "WebSocket", "PostgreSQL", "Redis", "Nginx"],
    architecture: "Load-balanced API with caching layer",
    features: [
      "Real-time data streaming",
      "Response caching",
      "Rate limiting",
      "Load balancing"
    ],
    repo: "https://github.com/ramajan",
    live: "https://api.example.com"
  },
  {
    id: 3,
    name: "Automated CI/CD Pipeline",
    description: "Complete CI/CD infrastructure with automated testing, building, and deployment",
    stack: ["Jenkins", "Docker", "Kubernetes", "GitHub Actions", "AWS"],
    architecture: "GitOps workflow with automated deployments",
    features: [
      "Automated testing",
      "Zero-downtime deployment",
      "Rollback mechanism",
      "Multi-environment support"
    ],
    repo: "https://github.com/ramajan",
    live: null
  }
]

export default function Projects() {
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
            Featured Projects
          </h2>
          <p className="text-subtext font-terminal">$ ls -la ~/projects/featured/</p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                rotateX: 2,
              }}
              className="neon-card rounded-lg p-8 hover:shadow-glass-hover transition-all duration-300 group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Image src="/icons/software.gif" alt="Project" width={24} height={24} className="group-hover:animate-spin transition-all duration-300" />
                        <h3 className="text-2xl font-bold gradient-text-primary">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-text leading-relaxed mb-4">{project.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-subtext text-sm mb-2">Architecture:</p>
                    <p className="text-secondary font-medium">{project.architecture}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-subtext text-sm mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map(tech => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-xs text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-subtext text-sm mb-2">Key Features:</p>
                    <ul className="space-y-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-text">
                          <span className="text-success mt-1">▸</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 neon-button rounded-md px-4 py-2 text-sm"
                    >
                      <FaGithub />
                      <span className="relative z-10 font-sans">View Repo</span>
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-secondary/20 border-2 border-secondary text-secondary px-4 py-2 rounded-md text-sm hover:bg-secondary/30 transition-all font-sans"
                      >
                        <FaExternalLinkAlt />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-64 neon-card-indigo rounded-lg p-4">
                  <p className="text-subtext text-xs mb-2">Project Stats</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-subtext">Status:</span>
                      <span className="text-success">✓ Production</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-subtext">Scale:</span>
                      <span className="text-primary">High</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-subtext">Type:</span>
                      <span className="text-text">{project.architecture.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

