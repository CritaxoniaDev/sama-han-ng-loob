'use client'

import { motion } from "framer-motion"
import { PinContainer } from "@/components/ui/3d-pin"
import { Header } from "@/components/Header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuroraBackground } from "@/components/ui/aurora-background"

export default function Home() {
  return (
    <>
      <Header />
      <AuroraBackground>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1 text-lg bg-white/50 backdrop-blur-sm">
              ✨ Welcome to
            </Badge>

            <h1
              className="text-6xl md:text-8xl font-bold text-center tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x"
              style={{
                textShadow: `
                  2px 2px 0 #4a5568,
                  -2px -2px 0 #4a5568,
                  2px -2px 0 #4a5568,
                  -2px 2px 0 #4a5568,
                  4px 4px 8px rgba(0,0,0,0.2)
                `
              }}
            >
              Sama-han ng Loob
            </h1>

            <p className="text-xl text-gray-600 italic">
              Where hearts connect and stories unfold ✨
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mt-20 relative">
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 pointer-events-none overflow-hidden">
              {/* Main Crack Line */}
              <div className="absolute inset-0 w-[4px] left-1/2 -translate-x-1/2 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-40"></div>

              {/* Zigzag Cracks */}
              <div className="absolute top-[20%] left-0 w-full h-[3px] bg-gradient-to-r from-pink-400 via-purple-300 to-transparent transform -rotate-45 animate-pulse opacity-30"></div>
              <div className="absolute top-[40%] right-0 w-full h-[3px] bg-gradient-to-l from-purple-400 via-pink-300 to-transparent transform rotate-45 animate-pulse opacity-30"></div>
              <div className="absolute top-[60%] left-0 w-full h-[3px] bg-gradient-to-r from-pink-400 via-purple-300 to-transparent transform -rotate-45 animate-pulse opacity-30"></div>
              <div className="absolute top-[80%] right-0 w-full h-[3px] bg-gradient-to-l from-purple-400 via-pink-300 to-transparent transform rotate-45 animate-pulse opacity-30"></div>

              {/* Glowing Nodes */}
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-400 rounded-full blur-[2px] animate-glow"></div>
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full blur-[2px] animate-glow delay-75"></div>
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-400 rounded-full blur-[2px] animate-glow delay-150"></div>
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full blur-[2px] animate-glow delay-300"></div>

              {/* Sparkle Effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-10 animate-sparkle"></div>
            </div>

            <PinContainer
              title="Freedom Wall"
              href="/freedom-wall"
              className="w-full h-[300px]"
            >
              <Card className="group relative overflow-hidden border-none h-full w-[300px] transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />

                <CardContent className="relative p-6 bg-white/80 backdrop-blur-sm h-full flex flex-col bg-gradient-to-br from-white/90 to-white/50">
                  <Badge className="absolute top-3 right-3 bg-purple-100 text-purple-600 hover:bg-purple-200 text-sm transform group-hover:scale-110 transition-transform duration-300">
                    <span className="animate-pulse">✨</span> New Features
                  </Badge>

                  <h2 className="text-3xl font-permanent-marker bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 transform group-hover:-translate-y-1 transition-transform duration-300">
                    ✨ Freedom Wall
                  </h2>

                  <p className="text-gray-600 text-base leading-relaxed mb-4 flex-grow group-hover:text-gray-800 transition-colors duration-300">
                    Express yourself freely and anonymously. Share your thoughts, feelings, and stories with the community.
                  </p>

                  <Button variant="ghost" className="mt-auto text-sm group-hover:bg-gradient-to-r from-purple-600 to-pink-600 group-hover:text-white transition-all duration-300">
                    Explore Wall
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Button>
                </CardContent>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-600/20 to-transparent rounded-br-full transform -translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-600/20 to-transparent rounded-tl-full transform translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
              </Card>
            </PinContainer>

            <PinContainer
              title="Create Message"
              href="/create-message"
              className="w-full h-[300px]"
            >
              <Card className="group relative overflow-hidden border-none h-full w-[300px]">
                <CardContent className="p-6 bg-white/80 backdrop-blur-sm h-full flex flex-col">
                  <Badge className="absolute top-3 right-3 bg-pink-100 text-pink-600 hover:bg-pink-200 text-sm">
                    Popular ⭐
                  </Badge>

                  <h2 className="text-3xl font-permanent-marker bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                    ✉️ Create Message
                  </h2>

                  <p className="text-gray-600 text-base leading-relaxed mb-4 flex-grow">
                    Craft beautiful, personalized messages for your loved ones with our magical message creator.
                  </p>

                  <Button variant="ghost" className="mt-auto text-sm">
                    Start Creating
                    <span className="ml-2">→</span>
                  </Button>
                </CardContent>
              </Card>
            </PinContainer>
          </div>
        </div>
      </AuroraBackground>
    </>
  )
}
