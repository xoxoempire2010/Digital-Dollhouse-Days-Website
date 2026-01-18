import { ArchiveItem, JournalEntry } from './types';

// Start empty to allow user uploads
export const ARCHIVE_ITEMS: ArchiveItem[] = [];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j1',
    date: 'October 2026',
    mood: 'Business',
    content: 'Transforming memories into a boutique. Every item tells a story.',
    stickers: ['🏷️', '✨']
  }
];

export const TAPE_COLORS = [
  'bg-pink-300',
  'bg-blue-200',
  'bg-yellow-200',
  'bg-purple-200',
  'bg-green-200'
];