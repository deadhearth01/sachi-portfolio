export type Chapter = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Founder = {
  slug: string;
  name: string;
  roles: string[];
  hook: string;
  intro: string[];
  chapters: Chapter[];
  stats: { value: string; label: string }[];
  skills: string[];
  closing: string;
  closingNote?: string;
  still: { src: string; alt: string; caption: string };
};

export const girish: Founder = {
  slug: "girish",
  name: "Girish Kumar",
  roles: ["Entrepreneur", "Brand Strategist", "Storyteller"],
  hook: "I help businesses build brands people remember — not just content people scroll past.",
  intro: [
    "I'm a 20-year-old entrepreneur and the founder of Chitti, a GITAM-based startup built to simplify exam preparation. Building and scaling my own venture taught me that great marketing isn't about getting attention — it's about earning trust and communicating value.",
  ],
  chapters: [
    {
      title: "Building Chitti",
      paragraphs: [
        "Chitti started with a simple observation: students didn't lack the ability to learn — they lacked clarity on what to study and how to study it.",
        "As the founder, I wasn't just building the product — I was building the brand. Through content-led marketing, storytelling and community building, Chitti grew into one of GITAM's recognized student startups: 4,000+ students onboarded, a community of 1,300+, a consistent reach of 100,000+ people every month, and ₹3L+ in revenue.",
      ],
    },
    {
      title: "Beyond Chitti",
      paragraphs: [
        "Alongside building Chitti, I've worked on branding and marketing initiatives for GITAM E-Club, creating campaigns and promotional content for entrepreneurship-focused events.",
        "I currently serve as the Marketing Head of the GITAM IUCEE Student Chapter, leading branding, communication and content strategy to build a stronger student community.",
      ],
    },
  ],
  stats: [
    { value: "₹3L+", label: "Revenue generated" },
    { value: "4,000+", label: "Students onboarded" },
    { value: "100K+", label: "Monthly reach" },
    { value: "1,300+", label: "Community built" },
  ],
  skills: [
    "Brand Strategy",
    "Storytelling",
    "Content Marketing",
    "Founder Branding",
    "Creative Direction",
    "Campaign Strategy",
    "Social Media Marketing",
    "Video Marketing",
  ],
  closing:
    "The best marketing doesn't feel like marketing. It tells the right story, builds trust, and helps businesses grow.",
  closingNote: "That's the mindset I bring to every brand I work with.",
  still: {
    src: "/images/generated/girish-still.jpg",
    alt: "A brass desk lamp glowing over an open notebook of brand diagrams",
    caption: "Where the strategies get drawn — late",
  },
};

export const sahith: Founder = {
  slug: "sahith",
  name: "Sahith Agraharapu",
  roles: ["Entrepreneur", "Growth Strategist", "Brand Storyteller", "Travel Enthusiast"],
  hook: "I help brands grow through content people remember and stories they connect with.",
  intro: [
    "I'm a 20-year-old entrepreneur and content growth strategist with a background that blends technology, marketing and global cultural experiences. While studying Computer Science, I built my career outside the classroom — working directly with founders, startups and brands to understand how people think, what captures attention, and what truly drives growth.",
    "Marketing has never been about creating content for the sake of posting. It's about understanding people, earning their trust, and telling the right story to the right audience at the right moment.",
  ],
  chapters: [
    {
      title: "Where it all began",
      paragraphs: [
        "My journey started in 2024 when I travelled to Egypt for a 45-day cultural exchange program. I worked with Egylust, a travel company, creating social media content while immersing myself in an entirely different culture. Those 45 days became much more than an exchange — they changed the way I saw people, communication and storytelling.",
        "Living in another country taught me that every brand has a story, but only a few know how to tell it well. Instead of waiting for opportunities, they came naturally: one project led to another, one recommendation became the next client, and marketing slowly became the career that chose me.",
      ],
    },
    {
      title: "Building through experience",
      paragraphs: [
        "Since then I've worked across startups, student organizations, agencies and growing businesses — each teaching me a different side of marketing.",
      ],
      bullets: [
        "Offline campaign planning for GUSAC at GITAM University",
        "Social media marketing for Egylust in Egypt",
        "Head of Marketing at the Entrepreneurs Club (E-Club), GITAM",
        "Marketing & Communications Associate, Alumni Relations — GITAM",
        "Head of Marketing at XENTRO, GITAM Venture Development Center",
        "Branding and content strategy for Infludot Technologies",
        "Content strategist at Madtown Media House",
        "Independent consultant for brands building digital presence",
      ],
    },
    {
      title: "Building my own brand",
      paragraphs: [
        "Alongside client work, I founded Red Culture, a streetwear clothing brand. With just two product drops, the brand completely sold out — over 250 pieces sold and ₹1.8 lakh+ in profit.",
        "Building Red Culture taught me what every founder eventually learns: marketing is easy to talk about, but completely different when your own business depends on it. That experience fundamentally changed how I work with clients.",
      ],
    },
    {
      title: "Brands I've worked with",
      paragraphs: [
        "Over the past few years I've worked with startups, restaurants, cafés, lifestyle brands, technology companies, universities and corporate events.",
      ],
      bullets: [
        "Beanboard",
        "Bot 9",
        "Veux",
        "Monthly Organics",
        "Infosys Visakhapatnam (event campaigns)",
        "OYB — Own Your Body",
        "Egylust",
        "XENTRO",
        "Infludot Technologies",
        "GITAM Directorate of External Relations",
        "Entrepreneurs Club (E-Club), GITAM",
      ],
    },
    {
      title: "Looking ahead",
      paragraphs: [
        "Over the next decade, my vision is to work with founders and startups across the world, helping them build brands that stand out through storytelling rather than shortcuts — combining my passion for travel with marketing, learning from different cultures, and building a global portfolio of brands people genuinely remember.",
        "I didn't learn marketing from textbooks. I learned it by building businesses, experimenting, making mistakes, launching campaigns, and understanding people firsthand. Every strategy I create comes from experience, not theory.",
      ],
    },
  ],
  stats: [
    { value: "₹1.8L+", label: "Profit through Red Culture" },
    { value: "250+", label: "Products sold in two drops" },
    { value: "10+", label: "Brands & organizations served" },
    { value: "6", label: "Industries worked across" },
  ],
  skills: [
    "Brand Strategy",
    "Content Growth Strategy",
    "Storytelling",
    "Social Media Marketing",
    "Founder Branding",
    "Brand Positioning",
    "Event Marketing",
    "Creative Campaign Strategy",
  ],
  closing:
    "The best marketers don't just study markets — they study people.",
  closingNote:
    "When the right message reaches the right audience at the right time, marketing stops feeling like advertising. It becomes a conversation that builds trust, creates communities, and drives meaningful growth.",
  still: {
    src: "/images/generated/sahith-still.jpg",
    alt: "An open travel journal with a boarding pass and compass on a map of the Egyptian coast",
    caption: "Egypt, 2024 — where it all began",
  },
};
