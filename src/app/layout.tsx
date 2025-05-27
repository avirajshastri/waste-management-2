// "use client"
import type { Metadata } from 'next'

import Header from './header'

import './globals.css'


export const metadata: Metadata = {
  title: 'Waste Management',
  description: 'Efficient waste tracking and reporting platform'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}