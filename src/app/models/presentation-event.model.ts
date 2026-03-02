export interface PresentationEvent {
  id: number;
  title?: string;
  eventName?: string;
  description?: string;
  date: string;
  location?: string;
  videoUrl?: string;
  images?: string[];
  tags?: string[];
  highlight?: boolean;
  visibility?: 'public' | 'private';
}
