'use client'

import { useEffect, useState } from 'react'
import { getMessage } from '@/lib/db'
import { Message } from '@/lib/db'
import Image from 'next/image'

interface PageProps {
    params: {
        id: string
    }
}

export default function ViewMessage({ params }: PageProps) {
    const [message, setMessage] = useState<Message | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMessage = async () => {
            const data = await getMessage(params.id)
            setMessage(data)
            setLoading(false)
        }
        fetchMessage()
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-purple-600">Loading your special message ✨</div>
            </div>
        )
    }

    if (!message) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-red-600">Message not found 💔</div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${
            message.theme === 'romantic' ? 'bg-pink-50' :
            message.theme === 'cute' ? 'bg-purple-50' :
            message.theme === 'funny' ? 'bg-yellow-50' :
            'bg-blue-50'
        }`}>
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8">
                {message.image && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
                        <Image
                            src={message.image}
                            alt="Message image"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="shadow-lg"
                        />
                    </div>
                )}
                
                <div className="prose max-w-none">
                    <div 
                        className="text-lg font-medium leading-relaxed text-gray-700"
                        dangerouslySetInnerHTML={{ __html: message.message }}
                    />
                </div>
            </div>
        </div>
    )
}
