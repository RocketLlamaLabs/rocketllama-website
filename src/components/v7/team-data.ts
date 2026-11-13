// The team: one record per person, used by the About page cards and the
// individual pages under /about/<slug>. Bio copy is HTML (it carries emphasis and links).

export type Gallery = { kicker: string; title: string; text: string; photos: { src: string; alt: string; tall?: boolean }[] };
export type Book = { cover: string; alt: string; kicker: string; title: string; text: string[]; links: { href: string; label: string }[] };
export type Person = { slug: string; name: string; role: string; shortRole?: string; photo: string; alt: string; summary: string; bio: string[]; book?: Book; gallery?: Gallery };

export const TEAM: Person[] = [
  {
    slug: "branson-cobb",
    name: "Branson Cobb",
    role: "Chief Executive Officer",
    shortRole: "CEO",
    photo: "/v7/branson-cobb.jpg",
    alt: "Branson Cobb, CEO of Rocket Llama Labs",
    summary: "Branson runs the business and every client relationship. He spent more than 23 years leading sales teams, business development, and client strategy for some of the country\u2019s largest healthcare organizations. He brings that growth discipline to home service companies that want more qualified leads and measurable results.",
    bio: [
      "Before launching Rocket Llama Labs, Branson served as Market President for CBIZ\u2019s Arizona and California offices, where he led market growth, business operations and client retention initiatives. Prior to CBIZ, he spent more than five years with Aetna, leading business development for Arizona\u2019s Public and Labor segment and helping organizations develop strategic growth initiatives.",
      "Branson began his career at Cigna, where he spent 13 years advancing from Medical and Dental Underwriter to Senior Account Executive. His background in underwriting, analytics, account management and sales gave him a unique ability to connect financial insights with business strategy, an approach he continues to bring to every client relationship today.",
      "At Rocket Llama Labs, Branson believes great marketing is not about chasing trends. It is about building systems that consistently generate leads, drive revenue and help business owners focus on what they do best. His forward-looking approach combines data-driven decision-making with innovative marketing strategies designed specifically for home service businesses.",
      "Outside of work, Branson enjoys traveling, scuba diving, skiing and fishing with his dad. He earned his Bachelor of Science in Finance from the University of Arizona.",
    ],
    gallery: {
      kicker: "Off the clock",
      title: "Branson loves to travel. He found our mascot\u2019s cousins in Peru.",
      text: "When Branson is not with clients he is on the road. Travel, scuba diving, skiing and fishing with his dad are where he recharges. In Peru he visited Machu Picchu and met the llamas and alpacas of the Andes. These are his photos.",
      photos: [
        { src: "/v7/branson/dance-pose", alt: "Branson Cobb in a suit striking a dance pose with a young girl in a pink dress outside a house" },
        { src: "/v7/branson/scuba", alt: "Branson Cobb scuba diving over a rocky reef, hands spread toward the camera" },
        { src: "/v7/branson/llama-and-alpaca", alt: "A white and brown llama with a young brown alpaca beside it" },
        { src: "/v7/branson/machu-picchu-2", alt: "A llama grazing in front of the stone walls at Machu Picchu" },
        { src: "/v7/branson/skiing", alt: "Branson Cobb in a ski helmet and goggles, snow in his beard" },
      ],
    },
  },
  {
    slug: "brian-greenberg",
    name: "Brian Greenberg",
    role: "Chief Strategy Officer",
    shortRole: "CSO",
    photo: "/v7/brian-greenberg.jpg",
    alt: "Brian Greenberg, Chief Strategy Officer of Rocket Llama Labs",
    summary: "Brian sets the strategy and the marketing playbook for every client. He has spent more than twenty years building businesses that get found online, including a fully digital insurance agency that generated $50M+ through inbound marketing, and he wrote <em>The Salesman Who Doesn\u2019t Sell</em>. He has run that same playbook for Phoenix home service companies.",
    bio: [
      "Entrepreneurship is the family trade. Brian learned it from his father, and it was everywhere around him: his grandfather ran his own business, and so did every one of his uncles. Growing up in Highland Park, Illinois, he never seriously considered working for anyone else. The University of Arizona\u2019s Eller College of Management gave him the formal version, entrepreneurship and marketing, sharpened by the McGuire Entrepreneurship Program. Then he settled in Scottsdale, Arizona, and got to work.",
      "In 2003 Brian started two companies at once: True Blue Life Insurance and Wholesale Warehouse Supply, an e-commerce business. At True Blue he pioneered selling life insurance fully online, in all 50 states. No cold calls. No kitchen-table pitches. Content, search, funnels and automation did the selling, and the results followed: more than $1 million in annual premium for ten consecutive years, over $50 million in total revenue, and membership in the Million Dollar Round Table, the top 1% of financial professionals worldwide.",
      "The inbound system that sold policies also powered Wholesale Warehouse Supply\u2019s online stores, and Brian has been delivering it to other businesses ever since. He built SEO Services Internet Marketing LLC, a digital marketing and SEO company, and later BJG Digital, a local services marketing agency that helped Phoenix pool service companies win their local market through local SEO, reviews and inbound funnels. He also leads Quoteplicity, quoting software for insurance agents whose funnels have generated more than 200,000 leads.",
      "Rocket Llama Labs brings that playbook to local home services companies, run with modern AI tools so a small team delivers what used to take an agency floor. Brian\u2019s job as Chief Strategy Officer is to keep the company pointed at the only thing that matters to a client: being the business people find first, and the one they call.",
      "Outside of work, Brian is a husband and a dad of three, and most of his time off belongs to his family, from backyard weekends to days at the beach.",
    ],
    book: {
      cover: "/v2/img/book-salesman.jpg",
      alt: "The Salesman Who Doesn\u2019t Sell, by Brian J. Greenberg",
      kicker: "The book",
      title: "The Salesman Who Doesn\u2019t Sell",
      text: [
        "Brian wrote the playbook down. <em>The Salesman Who Doesn\u2019t Sell: A Marketing Guide to Making Money While You Sleep</em> lays out the inbound system behind True Blue Life Insurance, with a foreword by Marques Colston, Super Bowl champion wide receiver.",
        "Featured in Forbes, Entrepreneur, Fast Company, HuffPost, Bloomberg, USA Today, Yahoo Finance, Fox, NBC and CBS.",
      ],
      links: [
        { href: "https://www.amazon.com/Salesman-Who-Doesnt-Sell-Marketing-ebook/dp/B078HMS1CQ", label: "Buy on Amazon" },
        { href: "https://www.audible.com/pd/The-Salesman-Who-Doesnt-Sell-A-Marketing-Guide-for-Making-Money-While-You-Sleep-Audiobook/B0794Q3418", label: "Listen on Audible" },
      ],
    },
    gallery: {
      kicker: "Off the clock",
      title: "Brian\u2019s best work is at home: a wife and three kids.",
      text: "Brian built his businesses to run without him in the room, and this is what that time goes to. Backyard afternoons, family photo days and trips to the beach with his wife and their three kids.",
      photos: [
        { src: "/v7/brian/family-1", alt: "Brian Greenberg with his wife and three children on a blanket in their backyard", tall: true },
        { src: "/v7/brian/family-2", alt: "Black and white photo of Brian Greenberg and his family in front of a vine-covered wall" },
        { src: "/v7/brian/family-3", alt: "Brian Greenberg and his family walking hand in hand on the beach" },
        { src: "/v7/brian/family-4", alt: "Brian Greenberg and his family dressed up outside a stone building", tall: true },
      ],
    },
  },
  {
    slug: "madison-schantz",
    name: "Madison Schantz",
    role: "Chief Marketing Officer",
    shortRole: "CMO",
    photo: "/v7/madison.jpg",
    alt: "Madison Schantz, Chief Marketing Officer at Rocket Llama Labs",
    summary: "Madison designs the brand, the website and the AI-powered tools each client runs on. Her background spans branding, web design, AI content and digital strategy, and she builds every piece so a home service company looks strong online and turns visitors into booked jobs.",
    bio: [
      "Madison is a creative digital designer, branding specialist, AI content creator and digital architecture expert with a passion for transforming innovative ideas into meaningful digital experiences. With experience in website design, brand development, artificial intelligence and digital strategy, she specializes in creating visually compelling, functional and user-friendly solutions that help businesses establish a strong and memorable online presence.",
      "Her expertise combines creative design with emerging technology, allowing her to develop cohesive brand identities, modern websites and AI-powered digital solutions tailored to each client\u2019s unique vision. As a digital architect, Madison focuses on the balance between aesthetics, functionality and strategy, ensuring every project is thoughtfully designed to enhance user experience, strengthen brand recognition and support long-term growth.",
      "Driven by curiosity and a passion for innovation, Madison enjoys exploring new technologies, creative trends and opportunities to push the boundaries of traditional digital design. She values attention to detail, strategic thinking and bringing fresh perspectives to every project.",
      "Outside of her professional work, Madison enjoys working out, reading and traveling. She has a strong appreciation for personal growth, wellness and discovering new places and cultures. These interests inspire her creativity, broaden her perspective and encourage her to continuously learn, evolve and approach both life and work with an open mind.",
    ],
    gallery: {
      kicker: "Off the clock",
      title: "Madison is always headed somewhere new.",
      text: "When she is not designing, Madison is reading, working out or traveling. The ski slopes, a music festival or a good bookstore: new places keep her creative, and they show up in her work.",
      photos: [
        { src: "/v7/madison/beignet", alt: "Madison Schantz smiling with a Mickey-shaped beignet at an outdoor caf\u00e9" },
        { src: "/v7/madison/skiing", alt: "Madison Schantz in ski gear and goggles in a snowy mountain parking lot" },
        { src: "/v7/madison/festival", alt: "Two people with backpacks walking into a music festival under palm trees" },
        { src: "/v7/madison/bookstore", alt: "Inside a bookstore with tall wooden shelves, hanging bulb lights and racks of greeting cards" },
      ],
    },
  },
];
