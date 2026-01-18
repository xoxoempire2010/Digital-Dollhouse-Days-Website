export interface ArchiveItem {
  id: string;
  title: string;
  imageUrl: string;
  category: 'Fashion' | 'Decor' | 'Memories' | 'Art';
  description: string;
  price: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  content: string;
  stickers: string[];
}

export enum ViewState {
  HOME = 'HOME',
  ARCHIVE = 'ARCHIVE',
  SCRAPBOOK = 'SCRAPBOOK',
}