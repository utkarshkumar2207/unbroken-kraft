export interface UpdateSection {
  heading?: string;
  image?: {
    src: string;
    alt?: string;
    caption?: string;
  };
  paragraphs: string[];
}

export interface UpdateItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  featuredImage: string;
  imageAlt: string;
  sections?: UpdateSection[];
  content: string[];
  additionalImages?: {
    src: string;
    caption?: string;
  }[];
}

export const UPDATES_CATALOG: UpdateItem[] = [
  {
    id: "welcome-to-the-next-phase",
    slug: "welcome-to-the-next-phase",
    title: "Welcome to The Next Phase",
    category: "Manifesto",
    date: "OCTOBER 26, 2026",
    excerpt: "I have been feeling a wave of new inspiration and movement within me. I feel like the snake who sheds their old skin to embrace the new one.",
    featuredImage: "/images/welcome-to-the-next-phase.webp",
    imageAlt: "Vintage studio microphone with atmospheric warm bokeh lighting",
    sections: [
      {
        heading: "",
        paragraphs: [
          "I have been feeling a wave of new inspiration and movement within me. I feel like the snake who sheds their old skin to embrace the new one.",
          "Everyone is going crazy on Instagram these days, and while I respect that, I don’t think I am the kind of artist who can keep up with all the fast paced content requirements of the platform. Although I have been able to grow a significant following and listener base, this next phase is about taking a different direction.",
          "First of all, welcome to my official website.",
          "I literally created this space so I can finally have the opportunity to do whatever the hell I want, and also to escape whatever the hell I don’t want. 🙂"
        ]
      },
      {
        heading: "All my songs are free now",
        paragraphs: [
          "In this age where the streaming services have a rapidly growing number of AI music and artist cheating formats through legal loopholes, I don’t feel comfortable releasing my work on these platforms any longer.",
          "There are better alternatives like Bandcamp for example, but I don't like their user interface, among other things.",
          "I also don’t want anyone to be paying any money to listen to my recorded music anymore. I want to do things differently and I feel that if anyone wants to blast my songs to get through their day, they should be able to do so without paying any bucks.",
          "You might be wondering what I’m really trying to achieve here. It’s simple, maybe rare, but simple - I am aiming for genuine human connection through my music. Can you imagine, you make a song, and then someone likes it. In that moment at least, they don’t just like that song, they resonate with that part of you.",
          "That is my goal."
        ]
      },
      {
        heading: "Lasting human connections…",
        image: {
          src: "/images/lasting-human-connections.webp",
          alt: "Unbroken Kraft - Lasting human connections",
          caption: "Building genuine human connection away from social media algorithms."
        },
        paragraphs: [
          "Instead of social media, I am moving towards direct connection channels. Anyone can reach out to me on my personal WhatsApp, or they can join my Discord Server.",
          "Weird would be an understatement for what Instagram has become. I want to talk to people in a more direct, more traditional, human to human manner, I hate it when I get distracted by social media algorithms. Let’s just stay normal, shall we?"
        ]
      },
      {
        heading: "Performing live is going to my north star",
        paragraphs: [
          "Live performances are going to be way more important to me now, this is the future that I’ll be rushing towards in this next phase of my journey. I have near zero (not completely zero) performance experience so I am certainly looking forward to it.",
          "I am currently in the plans to organize both online shows and offline shows. Perhaps, online shows are going to be more my thing in the beginning and then we’ll just let it unfold from there.",
          "I’ll be sure to announce the show dates as I plan one. It’ll be through my personal WhatsApp and my Discord Server."
        ]
      },
      {
        heading: "Thank you for being a part of this journey",
        paragraphs: [
          "I took some time off from everything to fix a lot of things in my life. Then when I came back to music, I spent a significant portion of my time trying to forget all the commercial aspects of the creation and relearn the joy in pursuing artistry.",
          "I questioned a lot of things, from a lot of different angles, and everything you’re reading is a result of that.",
          "I am genuinely grateful for everyone I have met or have e-met on this beautiful, difficult, and worthwhile journey."
        ]
      }
    ],
    content: [
      "I have been feeling a wave of new inspiration and movement within me. I feel like the snake who sheds their old skin to embrace the new one.",
      "Everyone is going crazy on Instagram these days, and while I respect that, I don’t think I am the kind of artist who can keep up with all the fast paced content requirements of the platform. Although I have been able to grow a significant following and listener base, this next phase is about taking a different direction.",
      "First of all, welcome to my official website.",
      "I literally created this space so I can finally have the opportunity to do whatever the hell I want, and also to escape whatever the hell I don’t want 🙂.",
      "In this age where the streaming services have a rapidly growing number of AI music and artist cheating formats through legal loopholes, I don’t feel comfortable releasing my work on these platforms any longer. There are better alternatives like Bandcamp for example, but I don't like their user interface, among other things.",
      "I also don’t want anyone to be paying any money to listen to my recorded music anymore. I want to do things differently and I feel that if anyone wants to blast my songs to get through their day, they should be able to do so without paying any bucks.",
      "You might be wondering what I’m really trying to achieve here. It’s simple, maybe rare, but simple - I am aiming for genuine human connection through my music. Can you imagine, you make a song, and then someone likes it. In that moment at least, they don’t just like that song, they resonate with that part of you. That is my goal.",
      "Instead of social media, I am moving towards direct connection channels. Anyone can reach out to me on my personal WhatsApp, or they can join my Discord Server. Weird would be an understatement for what Instagram has become. I want to talk to people in a more direct, more traditional, human to human manner, I hate it when I get distracted by social media algorithms. Let’s just stay normal, shall we?",
      "Live performances are going to be way more important to me now, this is the future that I’ll be rushing towards in this next phase of my journey. I have near zero (not completely zero) performance experience so I am certainly looking forward to it. I am currently in the plans to organize both online shows and offline shows. Perhaps, online shows are going to be more my thing in the beginning and then we’ll just let it unfold from there. I’ll be sure to announce the show dates as I plan one. It’ll be through my personal WhatsApp and my Discord Server.",
      "I took some time off from everything to fix a lot of things in my life. Then when I came back to music, I spent a significant portion of my time trying to forget all the commercial aspects of the creation and relearn the joy in pursuing artistry. I questioned a lot of things, from a lot of different angles, and everything you’re reading is a result of that. I am genuinely grateful for everyone I have met or have e-met on this beautiful, difficult, and worthwhile journey."
    ]
  }
];
