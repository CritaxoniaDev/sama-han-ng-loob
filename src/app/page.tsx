'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getRandomFont } from '@/utils/fonts';
import { Blackboard, Note as BlackboardNote } from '@/components/Blackboard';
import { addNote, getNotes } from '@/lib/db';

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

    const newNote = {
      text: authorName ? `${noteText}\n- ${authorName}` : noteText,
      x: Math.random() * 300 + 20,
      y: Math.random() * (600) + 120, // Fixed height calculation
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

  return (
    <div className="min-h-screen bg-white p-8" style={{
      backgroundImage: `
        linear-gradient(to right, #f0f0f0 1px, transparent 1px),
        linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px'
    }}>
      <main className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 py-12">
          <h1
            className="mb-10 text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x hover:scale-105 transition-transform duration-300"
            style={{
              textShadow: '4px 4px 8px rgba(0,0,0,0.2)',
            }}>
            Sama-han ng Loob
          </h1>
          <p className="text-gray-600 italic">
            Paint your thoughts on our canvas ✨
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-700">Ipahayag ang Iyong Damdamin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Pangalan mo (opsyonal)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="bg-white/50 border-gray-200"
            />
            <Textarea
              placeholder="Ibuhos mo ang iyong saloobin... (Ctrl + Enter para i-submit)"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="min-h-[120px] bg-white/50 border-gray-200"
            />
            <Button
              onClick={handleAddNote}
              disabled={isLoading || !noteText.trim()}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white"
            >
              {isLoading ? 'Isinasama...' : 'Idagdag sa Canvas'}
            </Button>
          </CardContent>
        </Card>

        <div className="w-full bg-gray-800 p-4 rounded-xl shadow-2xl">
          <Blackboard notes={notes} />
        </div>
      </main>

      <footer className="text-center py-8 text-sm text-gray-500">
        Every stroke creates our masterpiece 🎨
      </footer>
    </div>
  );
}
