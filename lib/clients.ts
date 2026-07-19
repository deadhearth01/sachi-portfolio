export type ClientWork = {
  slug: string;
  name: string;
  sector: string;
  line: string;
  video: string;
  poster: string;
  duration: string;
};

export const clients: ClientWork[] = [
  {
    slug: "daspalla",
    name: "Daspalla",
    sector: "Luxury Hospitality",
    line: "A renowned hospitality brand known for luxury hotels, fine dining, weddings and events.",
    video: "/work/daspalla.mp4",
    poster: "/work/daspalla.jpg",
    duration: "00:47",
  },
  {
    slug: "heritage",
    name: "Heritage",
    sector: "Fine Dining",
    line: "Daspalla's signature pure-veg restaurant — authentic South Indian cuisine and classic dining.",
    video: "/work/heritage.mp4",
    poster: "/work/heritage.jpg",
    duration: "00:32",
  },
  {
    slug: "tycoon",
    name: "Tycoon",
    sector: "Premium Dining",
    line: "A premium hospitality and dining destination for elevated food and lifestyle experiences.",
    video: "/work/tycoon.mp4",
    poster: "/work/tycoon.jpg",
    duration: "00:29",
  },
  {
    slug: "foodex",
    name: "FoodEx",
    sector: "Iconic Bakery",
    line: "One of Visakhapatnam's oldest bakeries — handcrafted cakes, pastries and café favourites for decades.",
    video: "/work/foodex.mp4",
    poster: "/work/foodex.jpg",
    duration: "00:36",
  },
  {
    slug: "jackfrost",
    name: "Jackfrost",
    sector: "Dessert Café",
    line: "A dessert and café brand serving ice creams, beverages and sweet treats in a vibrant setting.",
    video: "/work/jackfrost.mp4",
    poster: "/work/jackfrost.jpg",
    duration: "00:35",
  },
  {
    slug: "missamma",
    name: "Missamma Emporio",
    sector: "Ethnic Fashion",
    line: "Premium artificial jewellery and ethnic fashion — traditional craftsmanship, timeless design.",
    video: "/work/missamma.mp4",
    poster: "/work/missamma.jpg",
    duration: "00:26",
  },
  {
    slug: "fastzo",
    name: "Fastzo",
    sector: "Creator Tech",
    line: "An instant reel-delivery app giving creators professionally edited reels with speed.",
    video: "/work/fastzo.mp4",
    poster: "/work/fastzo.jpg",
    duration: "00:36",
  },
];

export const processSteps = [
  { name: "Discovery", note: "We sit with you and learn the business before we touch a camera." },
  { name: "Strategy", note: "Positioning, audience and the story worth telling — agreed on paper." },
  { name: "Content Calendar", note: "A month mapped shot by shot, so nothing is left to chance." },
  { name: "Production", note: "Shoot days, edits and design — crafted, not churned." },
  { name: "Review", note: "You see everything before the world does." },
  { name: "Delivery", note: "Published on schedule, formatted for every platform." },
  { name: "Report", note: "Numbers on the table — what worked, what we sharpen next." },
];
