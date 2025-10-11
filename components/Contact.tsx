'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf } from 'react-icons/fa'

const contactLinks = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/ramajan',
    color: 'primary',
    description: 'View my open source projects'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/ramajan',
    color: 'secondary',
    description: 'Connect with me professionally'
  },
  {
    name: 'Email',
    icon: FaEnvelope,
    url: 'mailto:ramajan@example.com',
    color: 'primary',
    description: 'Send me a message'
  },
  {
    name: 'Resume',
    icon: FaFilePdf,
    url: '/resume.pdf',
    color: 'success',
    description: 'Download my resume'
  },
]

export default function Contact() {
  return (
    <section className="min-h-screen py-20 px-4 flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Let's Connect
          </h2>
          <p className="text-subtext font-terminal mb-8">$ connect ramajan --channels=all</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {contactLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`neon-card rounded-lg p-8 block group hover:shadow-glass-hover transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-5xl text-${link.color} group-hover:scale-110 transition-transform`}>
                    <Icon />
                  </div>
                  <div className="flex-1">
            <h3 className={`text-2xl font-bold ${link.color === 'primary' ? 'gradient-text-primary' : link.color === 'secondary' ? 'gradient-text-secondary' : `text-${link.color}`} mb-1`}>
              {link.name}
            </h3>
                    <p className="text-subtext text-sm">{link.description}</p>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className={`text-${link.color} text-2xl`}
                  >
                    →
                  </motion.div>
                </div>
                
                <div className={`h-1 bg-gradient-to-r from-transparent via-${link.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              </motion.a>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
                className="neon-card-indigo rounded-lg p-8 text-center backdrop-blur-md"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text-secondary mb-2">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-text leading-relaxed">
              Whether it's architecting scalable systems, optimizing infrastructure, or automating deployments,
              I'm always excited to collaborate on challenging projects.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neon-button rounded-md px-8 py-4 text-lg font-terminal"
            onClick={() => window.open('mailto:ramajan@example.com', '_blank')}
          >
            <span className="relative z-10 font-sans">Send Message</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
            <div className="inline-flex items-center gap-2 text-subtext text-sm">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              Available for freelance opportunities and collaborations
            </div>
        </motion.div>
      </div>
    </section>
  )
}

