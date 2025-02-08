import {
  Inter
} from 'next/font/google';
import './globals.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sama ng Loob',
  description: 'A virtual whiteboard for your thoughts',
  icons: {
    icon: '/logow.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
