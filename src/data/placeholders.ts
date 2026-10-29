// Unbroken Kraft — Placeholder Media Registry
// Organize all visual assets, aspect ratios, and labels in one clean location
// Easily replaceable with creator's authentic photography and artwork

export interface PlaceholderImage {
  id: string;
  label: string;
  altText: string;
  src: string;
  aspectRatio: string;
  caption?: string;
  isTemporary: boolean;
}

export const PLACEHOLDER_MEDIA = {
  hero: {
    id: "hero-cinematic",
    label: "HERO CINEMATIC",
    altText: "Unbroken Kraft studio workspace and creative setup",
    src: "/images/homepage-hero.webp",
    aspectRatio: "16 / 10",
    caption: "Unbroken Kraft studio visual",
    isTemporary: false
  },
  blackSection: {
    cardLeft: {
      id: "card-atmospheric-left",
      label: "ATMOSPHERIC SCENE PLACEHOLDER",
      altText: "Studio lighting and sound texture placeholder",
      src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      aspectRatio: "4 / 5",
      isTemporary: true
    },
    cardRight: {
      id: "card-artistic-right",
      label: "ARTISTIC VISUAL PLACEHOLDER",
      altText: "Cinematic portrait sculpture / silhouette placeholder",
      src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      aspectRatio: "4 / 5",
      isTemporary: true
    }
  },
  whiteSection: {
    cardImage1: {
      id: "white-sec-img-1",
      label: "PRODUCT & CRAFT DETAIL",
      altText: "Audio waveform and hardware synthesizer craft detail",
      src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
      aspectRatio: "4 / 5",
      isTemporary: true
    },
    cardImage2: {
      id: "white-sec-img-2",
      label: "EDITORIAL TEXTURE",
      altText: "Cinematic water and light reflection placeholder",
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      aspectRatio: "4 / 5",
      isTemporary: true
    }
  },
  about: {
    studioPortrait: {
      id: "about-studio-portrait",
      label: "STUDIO WORKSPACE",
      altText: "Unbroken Kraft studio setup and creative space",
      src: "/images/about-hero.webp",
      aspectRatio: "16 / 9",
      isTemporary: false
    }
  }
};
