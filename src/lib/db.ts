import { db } from './firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

export interface Note {
  id?: string;
  text: string;
  x: number;
  y: number;
  color: string;
  timestamp: string;
}

export const addNote = async (note: Omit<Note, 'id'>) => {
  const notesRef = collection(db, 'notes');
  return await addDoc(notesRef, note);
};

export const getNotes = async (): Promise<Note[]> => {
  const notesRef = collection(db, 'notes');
  const q = query(notesRef);
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Note[];
};
