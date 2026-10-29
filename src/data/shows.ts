export interface ShowEvent {
  id: string;
  month: string;
  day: string;
  year: string;
  title: string;
  isOnline: boolean;
  location: string; // "Online" or venue + city e.g. "The Habitat, New Delhi, India"
  time: string; // e.g. "8:00 PM IST"
  description?: string;
  thumbnail?: string;
  imageAlt?: string;
  actionType: 'calendar' | 'stream' | 'tickets' | 'none';
  actionLabel: string; // "ADD TO CALENDAR", "WATCH LIVE", "GET TICKETS"
  actionUrl?: string;
  isSampleEvent?: boolean; // Flagged so that visitors understand it is placeholder representation until creator publishes real dates
}

export const SHOWS_CATALOG: ShowEvent[] = [
  {
    id: "show-1",
    month: "OCT",
    day: "28",
    year: "2026",
    title: "Unplugged Session (Live Stream)",
    isOnline: true,
    location: "Online",
    time: "8:00 PM IST",
    description: "An intimate online set with new songs, old favourites, and a live Q&A.",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Intimate studio livestream setup",
    actionType: "calendar",
    actionLabel: "ADD TO CALENDAR",
    actionUrl: "https://calendar.google.com",
    isSampleEvent: true,
  },
  {
    id: "show-2",
    month: "NOV",
    day: "12",
    year: "2026",
    title: "The Underground Gig",
    isOnline: false,
    location: "The Habitat, New Delhi, India",
    time: "7:30 PM IST",
    description: "Full band set. New material. See you at the front.",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Live underground concert crowd",
    actionType: "calendar",
    actionLabel: "ADD TO CALENDAR",
    actionUrl: "https://calendar.google.com",
    isSampleEvent: true,
  },
  {
    id: "show-3",
    month: "NOV",
    day: "26",
    year: "2026",
    title: "Work in Progress (Live)",
    isOnline: true,
    location: "Online",
    time: "3:00 PM IST",
    description: "A raw, stripped-down session. Trying new ideas and sharing the process.",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Studio session screen and microphone",
    actionType: "stream",
    actionLabel: "JOIN STREAM",
    actionUrl: "https://youtube.com/@unbrokenkraft",
    isSampleEvent: true,
  },
  {
    id: "show-4",
    month: "DEC",
    day: "10",
    year: "2026",
    title: "Winter Show",
    isOnline: false,
    location: "antiSOCIAL, Mumbai, India",
    time: "8:00 PM IST",
    description: "A night of loud guitars, heavy feels and familiar faces.",
    thumbnail: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Live microphone in smoke and stage lights",
    actionType: "calendar",
    actionLabel: "ADD TO CALENDAR",
    actionUrl: "https://calendar.google.com",
    isSampleEvent: true,
  }
];
