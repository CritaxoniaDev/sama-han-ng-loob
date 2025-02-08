'use client'

import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export interface Note {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  timestamp: string;
  font: string;
}

export function Blackboard({ notes }: { notes: Note[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Define protected area for title and date (top 120px)
    if (y < 120) return

    notes.forEach(note => {
      if (
        x >= note.x &&
        x <= note.x + 200 &&
        y >= note.y &&
        y <= note.y + 200
      ) {
        setSelectedNote(note)
      }
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw deep green blackboard base
    ctx.fillStyle = '#1B3B1B'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add subtle gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.02)')
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.01)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add title and date
    ctx.save()
    ctx.font = '48px "Rock Salt"'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.textAlign = 'center'
    ctx.fillText('STICKY THOUGHTS', canvas.width / 2, 60)

    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    ctx.font = '24px "Indie Flower"'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.fillText(today, canvas.width / 2, 100)
    ctx.restore()

    // Add chalk dust texture
    for (let i = 0; i < canvas.width; i += 2) {
      for (let j = 0; j < canvas.height; j += 2) {
        if (Math.random() > 0.992) {
          const opacity = Math.random() * 0.1
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.fillRect(i, j, 2, 2)
        }
      }
    }

    // Add chalk smudges
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 30 + 10

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.fill()
    }

    // Add eraser marks
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const width = Math.random() * 100 + 50
      const height = Math.random() * 20 + 10

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(Math.random() * Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.01)'
      ctx.fillRect(-width / 2, -height / 2, width, height)
      ctx.restore()
    }

    // Draw sticky notes
    notes.forEach((note) => {
      ctx.save()
      ctx.translate(note.x, note.y)
      ctx.rotate((Math.random() * 6 - 3) * Math.PI / 180)

      // Enhanced shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      ctx.shadowBlur = 15
      ctx.shadowOffsetX = 8
      ctx.shadowOffsetY = 8

      // Note background with slight gradient
      const noteGradient = ctx.createLinearGradient(0, 0, 200, 200)
      noteGradient.addColorStop(0, note.color)
      noteGradient.addColorStop(1, adjustColor(note.color))
      ctx.fillStyle = noteGradient

      // Draw note with slightly rounded corners
      roundRect(ctx, 0, 0, 200, 200, 5)

      // Note content
      ctx.shadowColor = 'transparent'
      ctx.fillStyle = '#333'
      ctx.font = `18px "${note.font}"`

      // Word wrap text
      wrapText(ctx, note.text, 10, 30, 180, 22)

      // Timestamp with subtle style
      ctx.font = '12px Arial'
      ctx.fillStyle = '#666'
      ctx.fillText(note.timestamp, 10, 180)

      ctx.restore()
    })

  }, [notes])

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
    ctx.fill()
  }

  function adjustColor(color: string): string {
    return color;
  }

  function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(' ')
    let line = ''

    words.forEach(word => {
      const testLine = line + word + ' '
      const metrics = ctx.measureText(testLine)

      if (metrics.width > maxWidth) {
        ctx.fillText(line, x, y)
        line = word + ' '
        y += lineHeight
      } else {
        line = testLine
      }
    })
    ctx.fillText(line, x, y)
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-[800px] rounded-lg shadow-inner cursor-pointer"
        style={{
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)',
          border: '12px solid #5c3d2e',
        }}
      />

      <Dialog open={!!selectedNote} onOpenChange={() => setSelectedNote(null)}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-xl mb-4">Sticky Note</DialogTitle>
          </DialogHeader>
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: selectedNote?.color,
              fontFamily: selectedNote?.font
            }}
          >
            <p className="text-lg mb-4">{selectedNote?.text}</p>
            <p className="text-sm text-gray-600">{selectedNote?.timestamp}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
