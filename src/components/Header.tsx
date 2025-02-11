'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Header() {
    const pathname = usePathname()
    const isMainPage = pathname === '/'
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-sm shadow-lg">
            <div className="container flex h-14 items-center justify-between px-4">
                <div className="flex-1">
                    <Link href="/" className="flex items-center group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg">
                            <span className="text-xl font-permanent-marker text-white drop-shadow-md">
                                S
                            </span>
                        </div>
                    </Link>
                </div>

                {!isMainPage && (
                    <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                        <Link href="/create-message">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-purple-100 font-permanent-marker text-gray-700 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2"
                            >
                                <span className="animate-bounce">✉️</span> Create Message
                            </Button>
                        </Link>
                        <Link href="/freedom-wall">
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-permanent-marker hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl"
                            >
                                ✨ Share Thoughts
                            </Button>
                        </Link>
                    </nav>
                )}

                <div className="flex-1"></div>
            </div>
        </header>
    )
}
