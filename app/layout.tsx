import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ramajan Control Center | Backend & DevOps Engineer',
  description: 'Backend & DevOps Engineer Portfolio - Building systems, not just code',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


