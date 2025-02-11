'use client'

import { useEffect, useState } from 'react'
import { getMessage } from '@/lib/db'
import { Message } from '@/lib/db'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

export default function ViewMessage() {
    const params = useParams()
    const [message, setMessage] = useState<Message | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMessage = async () => {
            const data = await getMessage(params.id as string)
            setMessage(data)
            setLoading(false)
        }
        fetchMessage()
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-pink-50">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl font-permanent-marker text-purple-600 flex items-center gap-3"
                >
                    <span className="animate-spin">✨</span> 
                    Loading your special message...
                </motion.div>
            </div>
        )
    }

    if (!message) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-pink-50">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-permanent-marker text-red-600 flex flex-col items-center gap-3"
                >
                    <span>💔</span>
                    <p>Message not found</p>
                </motion.div>
            </div>
        )
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen flex items-center justify-center p-4 ${
                message.theme === 'romantic' ? 'bg-gradient-to-r from-pink-50 to-purple-50' :
                message.theme === 'cute' ? 'bg-gradient-to-r from-purple-50 to-pink-50' :
                message.theme === 'funny' ? 'bg-gradient-to-r from-yellow-50 to-orange-50' :
                'bg-gradient-to-r from-blue-50 to-purple-50'
            }`}
        >
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8 space-y-6"
            >
                {message.image && (
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative w-full h-64 rounded-lg overflow-hidden"
                    >
                        <Image
                            src={message.image}
                            alt="Message image"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="shadow-lg"
                        />
                    </motion.div>
                )}
                
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="prose max-w-none"
                >
                    <div 
                        className="text-lg font-medium leading-relaxed text-gray-700"
                        dangerouslySetInnerHTML={{ __html: message.message }}
                    />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-sm text-gray-500 mt-6"
                >
                    <p>✨ A special message created just for you ✨</p>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
