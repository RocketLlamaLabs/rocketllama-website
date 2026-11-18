// Copy for the service pages (/services/websites, /services/crm, ...). One entry
// per service: title tag, banner, summary, sections and FAQ. The page template is
// src/components/v7/service-page.tsx and the structured data is built from the
// same entries in page-seo.tsx, so what search engines and AI assistants read is
// what the visitor sees. Facts here must match the rest of the site; anything we
// cannot stand behind is left out. docs/seo-playbook.md is the standard.

export type ServiceDetail = {
  slug: string;
  /** Short name, as on cards and in breadcrumbs ("Review management"). */
  name: string;
  /** Title tag, without the brand suffix. */
  title: string;
  description: string;
  h1: string;
  lede: string;
  summary: string;
  facts: string[];
  problemsHeading: string;
  problems: [string, string][];
  includedHeading: string;
  /** label, heading, copy */
  included: [string, string, string][];
  stepsHeading: string;
  /** step, what happens */
  steps: [string, string][];
  /** closing heading and line */
  cta: [string, string];
  faqHeading: string;
  faq: [string, string][];
  related: string[];
};

/** Author and dates shown in the byline and repeated in the structured data. */
export const SERVICE_PUBLISHED = "2026-11-18";
export const SERVICE_UPDATED = "2026-11-18";
export const SERVICE_UPDATED_LABEL = "November 18, 2026";

// The pricing question every service page answers: no price list, priced after a review.
const cost = (what: string, extra = ""): [string, string] => [
  `What does ${what} cost?`,
  `There is no price list. Rocket Llama Labs prices each company after a review.${extra} Schedule a call: we review your company and how it shows up online, then write a marketing plan with a number on it. You see the plan before you pay for anything, and you keep it either way.`,
];

export const SERVICE_PAGES: ServiceDetail[] = [
  {
    slug: "websites",
    name: "Websites",
    title: "Websites for Home Service Companies",
    description: "Websites for home service companies: you own the site, hosting is free, every service and city gets a page, and every visit is one tap from booking.",
    h1: "A website for your home service company that you own.",
    lede: "Most contractor websites are rented from a site builder and stop at a contact form. We build yours as the hub of the whole system: a page for every service and city, your reviews on every page, and a booking path that lands in your CRM.",
    summary: "Rocket Llama Labs builds and hosts websites for home service companies. The site is in your company’s name, hosting is free, and every service and city you serve gets its own page with your reviews on it. Pages load fast on a phone, carry the structured data Google and AI assistants read, and send every call and form into a CRM you own.",
    facts: [
      "In your company’s name, with free hosting for the life of the site",
      "A page for every service and every city you serve",
      "Reviews and stars on every page",
      "Built to load fast on a phone in a driveway",
      "Preview every change before it goes live",
    ],
    problemsHeading: "Why most contractor websites don’t book jobs",
    problems: [
      ["You rent it, you don’t own it", "Site builders and some agencies keep the code, the hosting or the domain. When you leave, you start over and lose the pages you ranked with."],
      ["One page for everything", "A single services page cannot rank for AC repair, water heaters and panel upgrades in five cities. Homeowners search for the job and the town, and a page has to match both."],
      ["A form nobody answers", "A contact form that emails an inbox waits until someone checks it. By then the homeowner has called the next company."],
    ],
    includedHeading: "What your website includes",
    included: [
      ["Ownership", "Your domain, your code, free hosting", "The site is in your company’s name. Hosting is free for the life of the site, and if you leave you take the code with you."],
      ["Service and city pages", "A page for every job and every town", "Each service you want more of gets its own page for each city you serve, written to answer what homeowners ask before they call."],
      ["Reviews", "Stars on every page", "Your reviews show on the pages where people decide, next to the service they are reading about."],
      ["Speed", "Fast on a phone", "Pages are built to load quickly on a phone with a weak signal, because that is where most home service searches happen."],
      ["Structured data", "Readable by Google and AI", "Every page carries schema for your business, services, FAQs and authorship, so search engines and AI assistants can read and cite it."],
      ["Booking", "One tap from a booking", "Calls, funnels and booking buttons on every page send the lead straight into your CRM, where it is answered in under a minute."],
    ],
    stepsHeading: "How we build your website",
    steps: [
      ["Review", "We look at your current site, the services you want more of, the cities you serve and how you show up in search today."],
      ["Plan the pages", "Services are crossed with cities, and the pages that matter most to your business are built first."],
      ["Build and preview", "You preview every page before it goes live and approve the wording, photos and offers."],
      ["Launch and grow", "The site goes live on your domain, connected to your phones and CRM. New service and city pages are added as you grow."],
    ],
    cta: ["Own the website that brings in your jobs.", "On the first call we look at your current site and how you show up online, and write a plan with a number on it. You keep the plan either way."],
    faqHeading: "Website questions",
    faq: [
      ["Do I own the website?", "Yes. The website, the domain and the code are in your company’s name. Rocket Llama Labs hosts the site free for the life of the site. If you leave, you take the code and the content with you, and we help the next provider get set up."],
      ["Can you replace my Wix or GoDaddy site?", "Yes. We rebuild your site on your own domain with a page for every service and city you serve, and move over the content worth keeping. You stop paying the site builder, and the new site is connected to your phones, funnels and CRM from day one."],
      ["How many pages will my website have?", "It depends on how many services you offer and how many cities you serve. Each service you want more of gets its own page, and each city worth targeting gets one too. We start with the services and cities that matter most to your business and add pages as you grow."],
      ["Will the website help me show up in AI search?", "Yes. Every page says plainly what you do and where, answers the questions homeowners ask, and carries structured data for your business, services and FAQs. That is what ChatGPT, Gemini and Google’s AI answers read when they decide which company to name."],
      cost("a website"),
    ],
    related: ["local-seo-and-ai-search", "lead-funnels", "google-business-profile"],
  },
  {
    slug: "local-seo-and-ai-search",
    name: "Local SEO and AI search",
    title: "Local SEO and AI Search Optimization",
    description: "Local SEO and AI search for home service companies: service and city pages, structured data, and a monthly check of what ChatGPT and Gemini say about you.",
    h1: "Local SEO and AI search that get your company named.",
    lede: "Homeowners still search Google, and more of them now ask ChatGPT, Gemini or Google’s AI answers who to call. We make your company the one both of them find, read and recommend.",
    summary: "Rocket Llama Labs provides local SEO and AI search optimization for home service companies. We publish a page for each service and city, add structured data and FAQs to every page, keep your name, address and phone identical across listings, and grow your reviews. Each month we check where you rank and ask the AI assistants the same questions to see whether they name your company.",
    facts: [
      "A page for every service and city you serve",
      "Structured data and FAQs on every page",
      "Name, address and phone kept identical across listings",
      "Monthly rank and AI mention report",
      "Built for Google, ChatGPT, Gemini and Perplexity",
    ],
    problemsHeading: "Why good companies don’t show up",
    problems: [
      ["Search moved and the site didn’t", "Homeowners now ask an AI assistant who to call. If your site never says plainly what you do and where, the assistant names a company whose site does."],
      ["One page trying to rank for everything", "Google ranks pages, not companies. Without a page for the job and the town, you mostly show up for your own name."],
      ["Listings that don’t match", "An old phone number on one directory and a different business name on another make search engines unsure the listings are the same company."],
    ],
    includedHeading: "What local SEO and AI search include",
    included: [
      ["Service and city pages", "Pages that match the search", "A page for each service in each city worth targeting, each answering the questions homeowners ask before they call."],
      ["Structured data", "Schema on every page", "Your business, services, FAQs, reviews and authorship marked up so Google and AI assistants can read them without guessing."],
      ["Answer-first writing", "Passages an AI can quote", "Every page opens with a plain summary of what you do, for whom and where: the passage assistants lift into their answers."],
      ["Listings", "The same details everywhere", "Your name, address and phone kept identical across Google, Bing, Apple and the directories that matter, so search engines trust them."],
      ["Reviews", "Recent reviews, every one answered", "A review request after every job and a reply to every review, because review count and recency weigh on maps and on AI answers."],
      ["Monthly check", "Rank and mention report", "Each month we record where you rank and ask the AI assistants a fixed set of questions about your trade and city, then fix what they get wrong."],
    ],
    stepsHeading: "How we get you found",
    steps: [
      ["Audit", "We check how you show up today in Google results, in the map pack and in AI answers, and where the gaps are."],
      ["Build the pages", "Service and city pages go live first for the jobs you want most, each with structured data and FAQs."],
      ["Fix the listings", "Your name, address and phone are made identical everywhere they appear, and your Google Business Profile is completed."],
      ["Check and adjust", "Every month we report rankings and AI mentions, and adjust pages and listings based on what we find."],
    ],
    cta: ["Be the company the search and the assistant both name.", "On the first call we check how you show up in Google and in AI answers, and write a plan with a number on it. You keep the plan either way."],
    faqHeading: "Local SEO and AI search questions",
    faq: [
      ["What is AI search optimization?", "AI search optimization means making your company easy for ChatGPT, Gemini, Perplexity and Google’s AI answers to find, understand and recommend. It relies on clear service and city pages, plain answer-first writing, structured data, consistent listings and reviews, because those are what AI assistants read and trust when they name a company."],
      ["How is local SEO different from AI search?", "Local SEO earns your place in Google’s results and map pack. AI search earns a mention when someone asks an assistant who to call. The two overlap: the same pages, structured data, listings and reviews feed both. We run them as one effort and report on both every month."],
      ["How do you know if ChatGPT recommends my company?", "Each month we ask ChatGPT, Gemini, Perplexity and Google the questions a homeowner would, such as who the best company for your trade is in your city, and record whether your company is named, what is said and which sources are cited. Then we fix what is wrong at the source."],
      ["How long does local SEO take to work?", "Rankings build over months as pages, listings and reviews add up, and how fast depends on your market and where you start. We report rankings and AI mentions every month, so you can see what is moving and what is not."],
      cost("local SEO and AI search"),
    ],
    related: ["websites", "google-business-profile", "review-management"],
  },
  {
    slug: "google-business-profile",
    name: "Google Business Profile",
    title: "Google Business Profile Management",
    description: "Google Business Profile management for home service companies: verification, categories, services, photos, weekly posts and every review answered.",
    h1: "Google Business Profile management that gets you into the map pack.",
    lede: "For most local searches the map pack is the first thing a homeowner sees, and your Google Business Profile decides whether you are in it. We verify it, complete it and keep it working every week.",
    summary: "Rocket Llama Labs manages Google Business Profiles for home service companies. We handle verification, set the right categories, list every service and service area, add photos of real jobs, post every week and answer every review. A complete, active profile is what puts a company in the map pack, and it is the first thing AI assistants read about a local business.",
    facts: [
      "Verification handled, including Google’s video check",
      "Categories, services, hours and service areas set correctly",
      "Photos of real jobs and a post every week",
      "Every review answered in your voice",
      "Calls from the profile tracked",
    ],
    problemsHeading: "Why profiles don’t show up",
    problems: [
      ["Stuck in verification", "Google verifies most service businesses with a video. A failed or half-finished verification leaves the profile invisible."],
      ["Half-complete", "Missing categories, services and service areas mean Google cannot match the profile to the searches you want."],
      ["Set up and forgotten", "Profiles that never post, never add photos and leave reviews unanswered look inactive to homeowners and to Google."],
    ],
    includedHeading: "What Google Business Profile management includes",
    included: [
      ["Verification", "Done right the first time", "We plan the verification video with you, showing your service area, your tools and branded vehicles and proof you run the business, then submit it."],
      ["Setup", "Categories, services and areas", "The right categories, every service you offer, your hours including emergency hours, and the areas you serve."],
      ["Service-area setup", "Your home address stays private", "A business that works at customers’ homes can hide its address and list the cities it serves instead."],
      ["Photos and posts", "Active every week", "Photos of finished jobs and a weekly post keep the profile current and give homeowners a reason to call."],
      ["Reviews", "Requested and answered", "A review request after every job, with a direct link, and a reply to every review in your voice."],
      ["Tracking", "Calls you can count", "A tracked number and link on the profile show how many calls and visits it sends each month."],
    ],
    stepsHeading: "How we manage your profile",
    steps: [
      ["Claim and verify", "We claim or create the profile and plan the verification with you."],
      ["Complete", "Categories, services, hours, service areas, photos and description are filled in fully."],
      ["Keep it active", "New posts and photos of real jobs every week, and every review answered."],
      ["Report", "Each month you see the calls and website visits the profile sent."],
    ],
    cta: ["Get into the map pack and stay there.", "On the first call we check your profile, your reviews and where you show up on the map, and write a plan with a number on it. You keep the plan either way."],
    faqHeading: "Google Business Profile questions",
    faq: [
      ["How do I verify my Google Business Profile?", "Google verifies most home service businesses with a short video. It usually shows your service area or location, your tools or branded vehicle, and proof that you run the business, such as a license or business document. We plan the recording with you, submit it and handle any follow-up from Google."],
      ["Can my profile hide my home address?", "Yes. A business that serves customers at their homes can be set up as a service-area business. The address stays hidden, and the profile lists the cities or areas you serve instead. We set that up for you during verification."],
      ["Why isn’t my company in the map pack?", "The map pack weighs how close the searcher is, how complete and verified your profile is, and your review count and rating. Distance is out of your hands; the rest is not. We complete the profile, keep it active every week and grow your reviews."],
      ["How often should a Google Business Profile be updated?", "Every week. We add a post and new photos of real jobs weekly, keep hours and services current, and answer every review. An active profile looks trustworthy to homeowners and tells Google the business is open and working."],
      cost("Google Business Profile management"),
    ],
    related: ["review-management", "local-seo-and-ai-search", "google-and-meta-ads"],
  },
  {
    slug: "lead-funnels",
    name: "Lead funnels",
    title: "Lead Funnels for Home Service Companies",
    description: "Lead funnels for home service companies: qualifying questions, address autofill, your offer and reviews, then a booking calendar or a call-back button.",
    h1: "Lead funnels that book the job, not just collect a name.",
    lede: "A contact form asks for a name and hopes. A funnel asks the right questions, shows your offer and your reviews, and ends with a time on your calendar.",
    summary: "Rocket Llama Labs builds lead funnels for home service companies. Each funnel asks a few qualifying questions, autofills the address, shows your offer and your reviews, and ends with a booking calendar or a call-back button. Every submission lands in your CRM and is answered in under a minute. Funnels like these convert 20% to 30% of visitors, against a typical 5% for a contact form.",
    facts: [
      "Qualifying questions, one tap each",
      "Address autofill",
      "Your offer and your reviews before the ask",
      "Ends with a booking calendar or a call-back",
      "One funnel per service and per ad",
    ],
    problemsHeading: "Why contact forms lose jobs",
    problems: [
      ["Too little, too late", "A form asks for a name and a message, then waits. The homeowner moves on before anyone replies."],
      ["Every lead looks the same", "Without questions, a small service call and a full replacement arrive looking identical, and your team calls both back the same way."],
      ["No reason to choose you", "A form on its own gives no offer, no reviews and no next step, so the visitor keeps shopping."],
    ],
    includedHeading: "What a lead funnel includes",
    included: [
      ["Questions", "Qualify before you call", "A few one-tap questions sort the job, the urgency and the details your team needs."],
      ["Autofill", "The address in one tap", "Address autofill confirms the homeowner is in your area and saves typing on a phone."],
      ["Offer and reviews", "A reason to book now", "Your offer and your best reviews sit right before the booking step."],
      ["Booking", "A time on the calendar", "The funnel ends with a booking calendar or a call-back button, not a message into an inbox."],
      ["CRM", "Answered in under a minute", "Every submission lands in your CRM, gets a text and email reply in under a minute and is tracked to the job."],
      ["One per ad", "Built for each service and ad", "Each service and each ad gets its own funnel, so the questions and the offer match what the homeowner clicked."],
    ],
    stepsHeading: "How we build your funnels",
    steps: [
      ["Pick the jobs", "We start with the services and ads that bring the most valuable work."],
      ["Write the questions and offer", "Questions that qualify the job, and an offer that gives the homeowner a reason to book now."],
      ["Connect", "Each funnel connects to your calendar, your CRM and your ad tracking."],
      ["Improve", "We watch where people drop off and adjust the questions, the offer and the layout."],
    ],
    cta: ["Turn more of your visitors into booked jobs.", "On the first call we look at how your site and ads capture leads today, and write a plan with a number on it. You keep the plan either way."],
    faqHeading: "Lead funnel questions",
    faq: [
      ["What is a lead funnel?", "A lead funnel is a short, step-by-step page that turns a visitor into a booked appointment. Instead of one contact form, it asks a few qualifying questions, autofills the address, shows your offer and reviews, and ends with a booking calendar or a call-back button."],
      ["Why use a funnel instead of a contact form?", "A form collects a name and waits. A funnel qualifies the job, gives the homeowner a reason to book now and ends with a time on the calendar. Funnels like ours convert 20% to 30% of visitors, against a typical 5% for a contact form."],
      ["Where do funnel leads go?", "Every submission lands in your CRM with the answer to each question. The homeowner gets a text and an email in under a minute, your team is notified, and the lead is tracked through to the paid job."],
      ["Can I have different funnels for different services?", "Yes. Each service and each ad gets its own funnel, so a water heater ad leads to water heater questions and a water heater offer. That keeps the page matched to what the homeowner clicked."],
      cost("a lead funnel"),
    ],
    related: ["websites", "crm", "google-and-meta-ads"],
  },
  {
    slug: "ai-receptionist",
    name: "AI receptionist and call tracking",
    title: "AI Receptionist and Call Tracking",
    description: "An AI receptionist and call tracking for home service companies: every call answered, your team rung first, and a callback booked if nobody can pick up.",
    h1: "An AI receptionist so no call goes to voicemail.",
    lede: "Your techs are on a roof or under a sink when the phone rings. The homeowner will not leave a message; they call the next company. Our phone system makes sure every call is answered.",
    summary: "Rocket Llama Labs provides a phone system with call tracking and an AI receptionist for home service companies. Calls run on a Tier 1 carrier. The AI takes the caller’s details and rings your team, and if nobody can pick up it books a callback or takes a message instead of sending the homeowner to voicemail. Each ad source gets its own tracked number, and every call is recorded and transcribed.",
    facts: [
      "Every call answered, day or night",
      "Your team rung first",
      "Callback booked or message taken if nobody answers",
      "One tracked number per ad source",
      "Call recording and transcripts",
    ],
    problemsHeading: "Where calls are lost",
    problems: [
      ["Voicemail", "A homeowner with a problem does not leave a message. They hang up and call the next number on the list."],
      ["After hours", "Leaks, outages and breakdowns happen at night and on weekends. If nobody answers, the job goes to whoever does."],
      ["No idea what made it ring", "Without tracked numbers you cannot tell which ad, listing or page produced a call, so budget goes to the wrong places."],
    ],
    includedHeading: "What the phone system includes",
    included: [
      ["AI receptionist", "Every call answered", "Takes the caller’s name, address and problem in a natural conversation, at any hour."],
      ["Your team first", "A person when one is free", "The system rings your team so a person can take the call. If nobody can pick up, the AI books a callback or takes a message."],
      ["After hours", "Booking, not voicemail", "Nights and weekends, calls are still answered and the callback or appointment is set."],
      ["Call tracking", "A number per source", "Each ad, listing and page gets its own tracked number, so every call is tied to where it came from."],
      ["Recording", "Recordings and transcripts", "Every call is recorded and transcribed, so you can check what was said and coach your team."],
      ["Carrier", "Clear audio on a Tier 1 carrier", "Calls run on a Tier 1 carrier for clear audio and reliable connections."],
    ],
    stepsHeading: "How we set up your phones",
    steps: [
      ["Set up numbers", "Your main number stays the one customers know, and a tracked number is added for each ad source."],
      ["Train the receptionist", "We set its greeting, your services, your service area and what to collect on each call."],
      ["Set the rules", "Who it rings, in what order and during which hours, and when it books a callback."],
      ["Review", "Recordings, transcripts and call sources show up in your CRM and your monthly report."],
    ],
    cta: ["Answer every call, even from the job site.", "On the first call we look at how your calls are answered today, and write a plan with a number on it. You keep the plan either way."],
    faqHeading: "AI receptionist questions",
    faq: [
      ["What does an AI receptionist do?", "It answers your business calls, has a natural conversation with the caller and collects their name, address and problem. The system rings your team so a person can take the call, and if nobody can pick up the AI books a callback or takes a message, so the homeowner is never sent to voicemail."],
      ["Will the AI answer instead of my team?", "No. The system rings your team first. The AI steps in when nobody can pick up, such as when your techs are on a job or after hours. You decide who it rings, in what order and during which hours."],
      ["What is call tracking?", "Call tracking gives each ad, listing and page its own phone number. When a homeowner calls, the system records which number they dialed, so you know which source produced the call and, through the CRM, which source produced the paid job."],
      ["Can I keep my current phone number?", "Yes. Your main number stays the one your customers already know, and tracked numbers are added for each ad source. The numbers are in your company’s name; if you ever leave Rocket Llama Labs, you can port them."],
      cost("the AI receptionist and call tracking"),
    ],
    related: ["crm", "lead-funnels", "google-and-meta-ads"],
  },
  {
    slug: "crm",
    name: "CRM with AI follow-up",
    title: "CRM With AI Follow-Up for Home Services",
    description: "A CRM for home service companies with AI follow-up: every lead answered in under a minute, a pipeline from lead to paid job, and a return-on-spend dashboard.",
    h1: "A CRM that answers every lead and tracks it to the paid job.",
    lede: "Leads come in by phone, form, funnel and ad. The CRM catches all of them, answers in under a minute and follows each one until it is a paid job or a clear no.",
    summary: "Rocket Llama Labs sets up and runs a CRM with AI follow-up for home service companies. Every lead gets a text and an email reply in under a minute, in your voice. A pipeline follows each lead from first contact to booked and paid job, records what the job was worth, and feeds a return-on-spend dashboard that shows which marketing pays. The CRM and its data are yours.",
    facts: [
      "A text and email reply to every lead in under 60 seconds",
      "A pipeline from lead to paid job",
      "Bookings and job values in one place",
      "Return-on-spend dashboard by source",
      "Your data, exportable at any time",
    ],
    problemsHeading: "Where leads slip away",
    problems: [
      ["Leads in five places", "Calls, voicemails, form emails and ad leads sit in different inboxes, and some are never answered."],
      ["Slow replies", "The first company to respond usually wins the job. A reply hours later goes to someone who already booked."],
      ["No link to revenue", "Without job values in the same system as lead sources, nobody can say which marketing actually paid."],
    ],
    includedHeading: "What the CRM includes",
    included: [
      ["Instant reply", "Under a minute, in your voice", "Every new lead gets a text and an email within 60 seconds, written the way your company talks."],
      ["Pipeline", "From lead to paid job", "Each lead moves through clear stages, so your team knows who to call, who to quote and who to follow up with."],
      ["Booking", "Appointments in the same place", "Booked visits and callbacks sit with the lead, so nothing lives in a notebook."],
      ["Job value", "What every lead was worth", "When a job is paid, its value is recorded against the source that produced it."],
      ["Dashboard", "Return on spend by source", "See what each ad, listing and page cost and what it brought in: the number that sets next month’s budget."],
      ["Follow-up", "Past customers re-contacted", "Maintenance reminders, seasonal offers and review requests go out on schedule to the customers you already have."],
    ],
    stepsHeading: "How we set up your CRM",
    steps: [
      ["Connect the sources", "Phones, website, funnels, Google Business Profile and ads all feed one CRM."],
      ["Set the replies", "We write the first text and email in your voice and set the follow-up schedule."],
      ["Build the pipeline", "Stages that match how your company quotes, books and closes jobs."],
      ["Report", "The dashboard shows booked jobs, job value and return on spend by source every month."],
    ],
    cta: ["Answer every lead first and know what it was worth.", "On the first call we look at how leads are handled today, and write a plan with a number on it. You keep the plan either way."],
    faqHeading: "CRM questions",
    faq: [
      ["What is a CRM for a home service company?", "A CRM (customer relationship management system) keeps every lead and customer in one place: who they are, how they found you, every call and message, the appointment, the quote and what the job was worth. Ours adds AI follow-up, so every lead is answered in under a minute."],
      ["How fast does the CRM reply to a new lead?", "In under 60 seconds. As soon as a call, form, funnel or ad lead comes in, the homeowner gets a text and an email in your company’s voice, and your team is notified. The fastest reply usually wins the job."],
      ["Can I see which marketing actually pays?", "Yes. Every lead carries its source, and when a job is paid its value is recorded. The return-on-spend dashboard puts cost and revenue side by side for each ad, listing and page, so you can move budget to what works."],
      ["Who owns the customer data?", "You do. The CRM and everything in it belong to your company. You can export your data at any time, and if you leave Rocket Llama Labs we help the next provider get set up."],
      cost("the CRM"),
    ],
    related: ["ai-receptionist", "lead-funnels", "review-management"],
  },
  {
    slug: "google-and-meta-ads",
    name: "Google, Local Services and Meta ads",
    title: "Google, Local Services and Meta Ads",
    description: "Google Ads, Local Services Ads and Meta ads for home service companies, run in your name and on your card, with budgets set by season and every lead tracked.",
    h1: "Ads in your name that you can trace to paid jobs.",
    lede: "Ads should buy calls for the jobs you want, in accounts you own. We run Google, Local Services and Meta ads that way, and track every lead they produce to the job.",
    summary: "Rocket Llama Labs runs Google Ads, Local Services Ads and Facebook and Instagram ads for home service companies. The accounts are in your name and on your card, with our management. We take you through Google’s screening for Local Services Ads, target the jobs you want, raise budgets in busy months and lower them in slow ones, and track every call and form to the paid job. There is no contract.",
    facts: [
      "Your accounts, your card, our management",
      "Local Services Ads screening handled",
      "Search ads for the jobs you want most",
      "Meta ads for the offers that fill the calendar",
      "Budgets up in busy months, down in slow ones",
    ],
    problemsHeading: "Where ad money is wasted",
    problems: [
      ["Accounts you don’t own", "Some agencies run ads in their own accounts. When you leave, the history and everything it learned stay with them."],
      ["Paying for the wrong clicks", "Broad targeting buys clicks from people outside your area or looking for work you don’t do."],
      ["No line to revenue", "Ad dashboards report clicks and impressions. They don’t show which ad produced a paid job."],
    ],
    includedHeading: "What ad management includes",
    included: [
      ["Local Services Ads", "The screened listing at the top", "We take your company through Google’s screening, including license and insurance checks, manage job types, service area and budget, and dispute leads that are spam or outside your area."],
      ["Google Ads", "Search for the jobs you want", "Search campaigns for the services you want more of, in the areas you serve, sending clicks to matching pages and funnels."],
      ["Meta ads", "Facebook and Instagram offers", "Offers that fill the calendar, shown to homeowners in your area and landing on a funnel built for the offer."],
      ["Ownership", "Your accounts and your card", "Every account is in your company’s name and billed to your card. We manage it; you own it and its history."],
      ["Budget", "Up when busy, down when slow", "Budgets follow your season and your capacity. Nothing is locked in by a contract."],
      ["Tracking", "Every lead traced to the job", "Tracked numbers and the CRM tie each call and form to the ad that produced it and the job it became."],
    ],
    stepsHeading: "How we run your ads",
    steps: [
      ["Review", "We look at your current accounts, spend and results, and the jobs you want more of."],
      ["Set up in your name", "Accounts are created or moved into your company’s name, on your card, with tracking in place."],
      ["Launch", "Local Services, search and Meta campaigns go live for the services and areas in the plan."],
      ["Adjust monthly", "Budgets and targeting move with your season, based on booked jobs and their value, not clicks."],
    ],
    cta: ["Spend on the ads that bring in paid jobs.", "On the first call we look at your current ads and results, and write a plan with a number on it. You keep the plan either way."],
    faqHeading: "Advertising questions",
    faq: [
      ["What are Google Local Services Ads?", "Local Services Ads are the screened listings at the top of Google for searches like “plumber near me.” Google checks a business’s license, insurance and registration before it can appear, and the business pays per lead rather than per click. We handle the screening and manage the account in your name."],
      ["Do I own the ad accounts?", "Yes. Your Google Ads, Local Services Ads and Meta accounts are in your company’s name and billed to your card. We manage them for you. If you leave, the accounts and their history stay with you."],
      ["Is there a contract or a minimum ad spend?", "There is no contract. Rocket Llama Labs works month to month, and ad budgets go up in busy months and down in slow ones. The right budget depends on your trade, your area and how much work you can take on, and it is part of the plan we write after a review."],
      ["How do you know which ads are working?", "Every ad source gets its own tracked number, and every form lands in the CRM with its source. When a job is paid its value is recorded, so each month you see booked jobs, job value and cost for every campaign."],
      cost("ad management", " Your ad spend is billed to your own card, separately."),
    ],
    related: ["lead-funnels", "ai-receptionist", "local-seo-and-ai-search"],
  },
  {
    slug: "review-management",
    name: "Review management",
    title: "Review Management for Home Services",
    description: "Review management for home service companies: a review request after every job, every review answered in your voice, and steady recent reviews for maps and AI.",
    h1: "Review management that keeps new reviews coming.",
    lede: "Homeowners read reviews before they call, and Google and AI assistants weigh them before they recommend. We ask after every job and answer every review.",
    summary: "Rocket Llama Labs runs review management for home service companies. A text goes out after every job with a direct link to leave a review, every review is answered in your voice, and reviews are matched to your jobs. A steady flow of recent reviews moves a company up in maps and Local Services Ads and gives AI assistants a reason to recommend it.",
    facts: [
      "A review request after every job, by text",
      "A direct link to your review page",
      "Every review answered in your voice",
      "Reviews matched to your jobs",
      "Reviews shown on your website",
    ],
    problemsHeading: "Why reviews stall",
    problems: [
      ["Nobody asks", "Many happy customers will leave a review if asked at the right moment. Most companies never ask."],
      ["Reviews go unanswered", "An unanswered complaint sits at the top of your profile. An unanswered compliment is a missed chance to look responsive."],
      ["Old reviews", "A stack of reviews from years ago tells homeowners and Google less than a steady stream of recent ones."],
    ],
    includedHeading: "What review management includes",
    included: [
      ["Requests", "A text after every job", "When a job closes, the customer gets a text with a direct link, timed while the visit is fresh."],
      ["Replies", "Every review answered", "Every review gets a reply in your voice, the good ones and the hard ones."],
      ["Matching", "Reviews tied to jobs", "Reviews are cross-referenced with your jobs, so you can see which services and techs earn them."],
      ["On your site", "Stars where people decide", "Your reviews and stars show on your website, next to the services they mention."],
      ["Google first", "Where reviews count most", "Requests point to your Google Business Profile first, where reviews weigh most on maps and Local Services Ads."],
      ["Reporting", "Reviews in your monthly report", "Each month you see your new reviews, your rating and every reply, next to the jobs they came from."],
    ],
    stepsHeading: "How we run your reviews",
    steps: [
      ["Connect", "The CRM knows when a job closes, so requests go out on their own."],
      ["Write the request", "A short text in your voice with a direct link to your review page."],
      ["Answer", "Every new review gets a reply in your voice."],
      ["Report", "Each month you see new reviews, your rating and the replies."],
    ],
    cta: ["Turn finished jobs into fresh reviews.", "On the first call we look at your reviews and how you ask for them today, and write a plan with a number on it. You keep the plan either way."],
    faqHeading: "Review management questions",
    faq: [
      ["How do you get more Google reviews?", "By asking every customer at the right time. When a job closes, the customer gets a text with a direct link to your Google review page. Asking every time, while the visit is fresh, is what turns satisfied customers into a steady stream of recent reviews."],
      ["Do you answer negative reviews?", "Yes. Every review gets a reply in your voice, including the hard ones. A calm, specific reply to a complaint shows future customers how you handle problems, and it often matters more to them than the complaint itself."],
      ["Do you write or buy reviews?", "No. Every review comes from a real customer after a real job. Fake or paid reviews break Google’s rules and can get a profile suspended. We only make it easy for your real customers to leave one."],
      ["Why do reviews matter for AI search?", "AI assistants and Google’s AI answers weigh review count, rating and recency when they decide which local company to name. A steady stream of recent, answered reviews is one of the strongest signals a home service company controls."],
      cost("review management"),
    ],
    related: ["google-business-profile", "crm", "local-seo-and-ai-search"],
  },
];

export const SERVICE_BY_SLUG: Record<string, ServiceDetail> = Object.fromEntries(SERVICE_PAGES.map((s) => [s.slug, s]));
