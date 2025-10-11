'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface Tech {
  name: string
  category: string
  description: string
  icon: string
}

const techStack: Tech[] = [
  { name: 'Node.js', category: 'Backend', description: 'Built RESTful APIs and microservices', icon: '/icons/software.gif' },
  { name: 'Docker', category: 'DevOps', description: 'Containerized 50+ microservices', icon: '/icons/launch.png' },
  { name: 'AWS', category: 'Cloud', description: 'EC2, S3, Lambda, RDS, CloudWatch', icon: '/icons/cloud.png' },
  { name: 'Redis', category: 'Database', description: 'Caching and session management', icon: '/icons/cloud-computing.png' },
  { name: 'Nginx', category: 'Server', description: 'Load balancing and reverse proxy', icon: '/icons/launch.png' },
  { name: 'MongoDB', category: 'Database', description: 'NoSQL database for scalable data', icon: '/icons/cloud-computing.png' },
  { name: 'PostgreSQL', category: 'Database', description: 'Relational database management', icon: '/icons/cloud-computing.png' },
  { name: 'Kubernetes', category: 'DevOps', description: 'Container orchestration', icon: '/icons/launch.png' },
  { name: 'Jenkins', category: 'CI/CD', description: 'Automated deployment pipelines', icon: '/icons/software.gif' },
  { name: 'GitHub Actions', category: 'CI/CD', description: 'Workflow automation', icon: '/icons/launch.png' },
]

export default function TechStack() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

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
            Tech Stack
          </h2>
          <p className="text-subtext font-terminal">$ skills --list --verbose</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              onHoverStart={() => setHoveredTech(tech.name)}
              onHoverEnd={() => setHoveredTech(null)}
              className="relative group"
            >
              <div className="neon-card rounded-lg p-6 text-center cursor-pointer h-full flex flex-col items-center justify-center group">
                <div className="mb-3 group-hover:scale-125 group-hover:rotate-3 transition-all duration-300">
                  <Image 
                    src={tech.icon} 
                    alt={tech.name}
                    width={48}
                    height={48}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-primary font-bold text-sm mb-1">{tech.name}</h3>
                <p className="text-subtext text-xs">{tech.category}</p>

                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 z-10"
                  >
                    <div className="neon-card-indigo rounded-lg p-3 text-xs">
                      <p className="text-text leading-relaxed">{tech.description}</p>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-secondary border-r border-b border-secondary/30"></div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-4"
        >
          <div className="neon-card-indigo rounded-lg p-6 text-center">
            <Image src="/icons/cloud-computing.png" alt="Cloud" width={48} height={48} className="mx-auto mb-3" />
            <h4 className="font-bold gradient-text-secondary mb-2">Cloud Architecture</h4>
            <p className="text-subtext text-sm">Scalable infrastructure design</p>
          </div>
          <div className="neon-card rounded-lg p-6 text-center">
            <Image src="/icons/software.gif" alt="DevOps" width={48} height={48} className="mx-auto mb-3" />
            <h4 className="font-bold gradient-text-primary mb-2">DevOps Pipelines</h4>
            <p className="text-subtext text-sm">Automated deployment & monitoring</p>
          </div>
          <div className="neon-card-indigo rounded-lg p-6 text-center">
            <Image src="/icons/social.png" alt="APIs" width={48} height={48} className="mx-auto mb-3" />
            <h4 className="font-bold gradient-text-secondary mb-2">API Development</h4>
            <p className="text-subtext text-sm">RESTful & WebSocket services</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

