'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import confetti from 'canvas-confetti'
import { createMessage } from '@/lib/db'
import Image from 'next/image'
import { Header } from '@/components/Header'

export default function CreateMessage() {
    const [message, setMessage] = useState('')
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [generatedLink, setGeneratedLink] = useState('')
    const [selectedTheme, setSelectedTheme] = useState('romantic')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const themes = [
        { id: 'romantic', emoji: '💝', name: 'Romantic' },
        { id: 'cute', emoji: '🌸', name: 'Cute' },
        { id: 'funny', emoji: '😊', name: 'Funny' },
        { id: 'friendship', emoji: '🤝', name: 'Friendship' }
    ]

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                setSelectedImage(base64String) // This will store the image as base64
            }
            reader.readAsDataURL(file)
        }
    }
    
    const handleGenerateLink = async () => {
        const messageData = {
            message,
            image: selectedImage || '', // This will be the base64 string
            theme: selectedTheme
        };
    
        try {
            const messageId = await createMessage(messageData);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            setGeneratedLink(`https://shnl.vercel.app/message/${messageId}`);
        } catch (error) {
            console.error('Error creating message:', error);
        }
    };    

    const formatText = (text: string) => {
        return text
            .split('\n')
            .map(line => {
                // Bold
                line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                // Italic
                line = line.replace(/\*(.*?)\*/g, '<em>$1</em>')
                // Underline
                line = line.replace(/\_\_(.*?)\_\_/g, '<u>$1</u>')
                // Headers
                line = line.replace(/^# (.*$)/gm, '<h1>$1</h1>')
                line = line.replace(/^## (.*$)/gm, '<h2>$1</h2>')
                // Lists
                line = line.replace(/^\- (.*$)/gm, '<li>$1</li>')
                return line
            })
            .join('<br/>')
    }

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 gap-8">
                    {/* Left Side - Message Creation Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600" />

                            <motion.h1
                                className="text-4xl font-permanent-marker text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.05 }}
                            >
                                ✨ Create Your Message ✨
                            </motion.h1>

                            <div className="space-y-6">
                                <div className="flex justify-center gap-4 py-4">
                                    {themes.map((theme) => (
                                        <motion.button
                                            key={theme.id}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`px-4 py-2 rounded-full flex items-center gap-2 ${selectedTheme === theme.id
                                                ? 'bg-purple-100 text-purple-600 border-2 border-purple-400'
                                                : 'bg-gray-50 hover:bg-purple-50'
                                                }`}
                                            onClick={() => setSelectedTheme(theme.id)}
                                        >
                                            <span>{theme.emoji}</span>
                                            <span>{theme.name}</span>
                                        </motion.button>
                                    ))}
                                </div>

                                <Textarea
                                    placeholder="Pour your heart out here... ✨
                                            Use **bold** for bold text
                                            Use *italic* for italic text
                                            Use __underline__ for underlined text
                                            Use # for headers
                                            Use - for lists"
                                    className="min-h-[200px] p-6 border-2 border-purple-200 focus:border-purple-500 rounded-xl text-lg font-medium leading-relaxed transition-all duration-300 focus:shadow-lg font-mono"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />

                                <div className="flex justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl w-full max-w-md"
                                    >
                                        <label className="block text-lg font-medium mb-3 text-purple-700 text-center">
                                            🖼️ Upload Your Image
                                        </label>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <Button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full mb-4 bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                                        >
                                            Choose Image
                                        </Button>

                                        <div className="mt-4 h-48 bg-white rounded-lg border-2 border-dashed border-purple-300 flex items-center justify-center overflow-hidden">
                                            {selectedImage ? (
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={selectedImage}
                                                        alt="Uploaded preview"
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-purple-400">Image Preview</span>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="flex justify-center pt-6"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Button
                                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-permanent-marker transition-all duration-300 shadow-xl hover:shadow-2xl px-10 py-6 rounded-xl text-lg"
                                        onClick={handleGenerateLink}
                                    >
                                        ✨ Create Message ✨
                                    </Button>
                                </motion.div>

                                {generatedLink && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200"
                                    >
                                        <h3 className="text-xl font-permanent-marker text-center text-purple-700 mb-4">
                                            🎉 Your Message is Ready! 🎉
                                        </h3>
                                        <p className="text-center font-medium text-gray-700 mb-3">
                                            Share this magical link with someone special:
                                        </p>
                                        <div className="bg-white p-4 rounded-lg flex items-center justify-between gap-4">
                                            <p className="text-purple-600 font-medium">{generatedLink}</p>
                                            <Button
                                                variant="ghost"
                                                className="hover:bg-purple-100"
                                                onClick={() => navigator.clipboard.writeText(generatedLink)}
                                            >
                                                📋 Copy
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Live Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="sticky top-24"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                            <h2 className="text-2xl font-permanent-marker text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                ✨ Live Preview ✨
                            </h2>

                            <div className="space-y-6">
                                <div className={`p-6 rounded-xl ${selectedTheme === 'romantic' ? 'bg-pink-50' :
                                    selectedTheme === 'cute' ? 'bg-purple-50' :
                                        selectedTheme === 'funny' ? 'bg-yellow-50' :
                                            'bg-blue-50'
                                    }`}>
                                    {selectedImage && (
                                        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
                                            <Image
                                                src={selectedImage}
                                                alt="Preview"
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                className="shadow-lg"
                                            />
                                        </div>
                                    )}

                                    <div className="prose max-w-none">
                                        <div
                                            className="text-lg font-medium leading-relaxed text-gray-700"
                                            dangerouslySetInnerHTML={{
                                                __html: formatText(message) || "Write your message here.."
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                    <span>Theme:</span>
                                    <span className="font-medium">
                                        {themes.find(t => t.id === selectedTheme)?.emoji}
                                        {themes.find(t => t.id === selectedTheme)?.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
