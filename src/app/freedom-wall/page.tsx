'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getRandomFont } from '@/utils/fonts';
import { Blackboard, Note as BlackboardNote } from '@/components/Blackboard';
import { addNote, getNotes } from '@/lib/db';
import { Header } from '@/components/Header'

interface Note {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  timestamp: string;
  font: string;
}

const generatePastelColor = () => {
  // Generate soft pastel colors with high lightness
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 30) + 60; // 60-90%
  const lightness = Math.floor(Math.random() * 15) + 80; // 80-95%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default function Home() {
  const [noteText, setNoteText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [notes, setNotes] = useState<BlackboardNote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const fetchedNotes = await getNotes();
    setNotes(fetchedNotes as Note[]);
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    setIsLoading(true);

    // Find a suitable position for the new note
    const findSuitablePosition = () => {
      const padding = 20; // Minimum space between notes
      const maxAttempts = 50;
      let attempts = 0;

      while (attempts < maxAttempts) {
        // Generate random position
        const x = Math.random() * (window.innerWidth - 300) + padding;
        const y = Math.random() * (600) + 120;

        // Check overlap with existing notes
        const hasSignificantOverlap = notes.some(note => {
          const xOverlap = Math.abs(note.x - x) < 150; // Allow partial overlap
          const yOverlap = Math.abs(note.y - y) < 150;
          return xOverlap && yOverlap;
        });

        if (!hasSignificantOverlap) {
          return { x, y };
        }
        attempts++;
      }

      // If no ideal position found, return a position with minimal overlap
      return {
        x: Math.random() * 300 + 20,
        y: Math.random() * (600) + 120
      };
    };

    const today = new Date()
    const selectedDate = new Date(date)

    if (
      selectedDate.getDate() !== today.getDate() ||
      selectedDate.getMonth() !== today.getMonth() ||
      selectedDate.getFullYear() !== today.getFullYear()
    ) {
      setShowAlert(true)
      return;
    }

    setIsLoading(true);

    const position = findSuitablePosition();
    const newNote = {
      text: authorName ? `${noteText}\n- ${authorName}` : noteText,
      x: position.x,
      y: position.y,
      color: generatePastelColor(),
      timestamp: new Date().toLocaleString(),
      font: getRandomFont()
    };

    try {
      await addNote(newNote);
      await fetchNotes();
      setNoteText('');
      setAuthorName('');
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAddNote();
    }
  };

  const isToday = (selectedDate: Date) => {
    const today = new Date()
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    )
  }

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-white p-8"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
            linear-gradient(45deg, #f3e7ff 0%, #ffffff 100%)
        `,
          backgroundSize: '20px 20px, 20px 20px, 400% 400%',
          animation: 'gradient 15s ease infinite'
        }}
      >
        <main className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4 py-12">
            <h1
              className="mb-10 text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x hover:scale-105 hover:rotate-1 transition-all duration-300"
              style={{
                textShadow: `
                2px 2px 0 #4a5568,
                -2px -2px 0 #4a5568,
                2px -2px 0 #4a5568,
                -2px 2px 0 #4a5568,
                4px 4px 8px rgba(0,0,0,0.2),
                0 8px 16px rgba(0,0,0,0.3),
                0 16px 32px rgba(0,0,0,0.15)
              `,
                transform: 'perspective(1000px) rotateX(10deg)',
                WebkitBackgroundClip: 'text',
                WebkitTextStroke: '2px rgba(255,255,255,0.1)'
              }}>
              Freedom Wall
            </h1>
            <p className="text-gray-600 italic">
              Paint your thoughts on our canvas ✨
            </p>
          </div>

          {isToday(date) && (
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-2xl">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text font-permanent-marker">
                  Ipahayag ang Iyong Damdamin
                </CardTitle>
                <p className="text-gray-500 italic text-sm">Share whats in your heart...</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="relative">
                  <Input
                    placeholder="Pangalan mo (opsyonal)"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="bg-white/70 border-gray-200 rounded-lg pl-10 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">✍️</span>
                </div>

                <div className="relative">
                  <Textarea
                    placeholder="Ibuhos mo ang iyong saloobin... (Ctrl + Enter para i-submit)"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="min-h-[150px] bg-white/70 border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    style={{ fontFamily: 'var(--font-indie-flower)' }}
                  />
                  <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                    Press Ctrl + Enter to submit
                  </div>
                </div>

                <Button
                  onClick={handleAddNote}
                  disabled={isLoading || !noteText.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">🎨</span> Isinasama...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      ✨ Idagdag sa Canvas
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
          <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
            <AlertDialogContent className="bg-white/95 backdrop-blur-sm border-none">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-permanent-marker bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                  Cannot Add Note
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  Notes can only be added to todays board. Please select todays date to add your thoughts.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  onClick={() => {
                    setDate(new Date())
                    setShowAlert(false)
                  }}
                >
                  Go to Today
                </AlertDialogAction>
                <AlertDialogCancel className="bg-gray-100 text-gray-600">
                  Close
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="w-full bg-gray-800 p-4 rounded-xl shadow-2xl">
            <Blackboard notes={notes} />
          </div>
        </main>

        <Link href="/instructions" className="fixed bottom-4 right-4">
          <Button
            variant="outline"
            className="rounded-full w-12 h-12 bg-white/80 hover:bg-white shadow-lg backdrop-blur-sm"
          >
            <span className="text-xl">❔</span>
          </Button>
        </Link>

        <footer className="text-center py-8 text-sm text-gray-500">
          Every stroke creates our masterpiece 🎨
        </footer>
      </div>
    </>
  );
}
