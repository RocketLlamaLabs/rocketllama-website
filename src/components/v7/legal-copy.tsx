// The three legal pages for version 7: privacy policy, website policy and AI
// policy. Plain, specific and in step with what the site actually does: the
// 60-second check and instant audit, the booking funnel and its SMS consent
// box, tracked phone numbers and call recording, the AI receptionist, the CRM
// and the AI tools we use in client work. Written as a starting point for the
// owners' lawyer to review; the effective date is the day it went live.

export const EFFECTIVE = "November 6, 2026";
export const CONTACT_EMAIL = "admin@rocketllamalabs.com";

type Section = { h: string; p: (string | string[])[] };

const render = (s: Section) => (
  <section key={s.h} className="legal-sec">
    <h2>{s.h}</h2>
    {s.p.map((x, i) => Array.isArray(x) ? <ul key={i}>{x.map((li) => <li key={li}>{li}</li>)}</ul> : <p key={i}>{x}</p>)}
  </section>
);

export const PRIVACY: Section[] = [
  { h: "Who we are", p: [
    `Rocket Llama Labs LLC ("Rocket Llama Labs", "we", "us") is a marketing and technology company based in Phoenix, Arizona. We build and run marketing systems for home service companies. This policy explains what personal information we collect through rocketllamalabs.com and the services we provide, how we use it, who we share it with, and the choices you have. It applies to visitors to our website, people who contact us or book a call, and the owners and staff of the companies that hire us.`,
    `If you are a homeowner who contacted one of our clients, your information is handled under that client's own privacy policy. We process it on their behalf, as described under "Information we process for our clients" below.`,
  ]},
  { h: "Information we collect", p: [
    "We collect information in three ways: what you give us, what our systems record when you use the site, and what we receive from the tools we run.",
    [
      "What you give us: your name, company name, email address, mobile number, trade and service area when you run the 60-second check or instant audit, schedule a call, or email us. Answers you give on those forms. Anything you tell us on a call.",
      "What our systems record: pages visited, the device and browser you use, your approximate location from your IP address, how you arrived at the site, and the actions you take on it. If you call a tracked phone number on our site, the number you called from, the time, the duration, and a recording of the call where the law allows it.",
      "What our tools provide: if you become a client, the data that flows through the systems we run for you, including your website analytics, ad account performance, reviews, call logs and CRM records.",
    ],
    "We do not knowingly collect information from anyone under 18, and our services are not aimed at them. If you believe a minor has given us information, email us and we will delete it.",
  ]},
  { h: "How we use it", p: [
    [
      "To answer you: to run your check or audit, show you the result, and follow up on it.",
      "To book and hold your call: confirmations, reminders and the details for the live audit.",
      "To do the work: if you hire us, to build and run your website, ads, phones, reviews and CRM, and to report on them.",
      "To improve the site: to see which pages work, fix what breaks, and keep the site secure.",
      "To market to you, only with your separate consent, as described under text messages and email below.",
      "To meet our legal obligations and to protect our rights and the rights of others.",
    ],
  ]},
  { h: "Text messages", p: [
    `When you check the consent box on our booking form and give us your mobile number, you agree to receive text messages from Rocket Llama Labs about that request: your qualification result, your call booking and reminders, and your free live audit. We do not send marketing texts without a separate opt-in. Message frequency varies. Message and data rates may apply. Reply STOP at any time to opt out and HELP for help. Consent to receive texts is not a condition of doing business with us.`,
    "We keep a record of your consent, including the wording you agreed to and when, so we can honor it and prove it.",
  ]},
  { h: "Email", p: [
    "We email you about your request and your account. If we send marketing email, every message identifies us as the sender, gives a valid postal address, and carries an unsubscribe link that works within ten business days, as the CAN-SPAM Act requires. Unsubscribing from marketing does not stop service emails about work in progress.",
  ]},
  { h: "Phone calls and call recording", p: [
    "The phone numbers on our site, and the numbers we set up for clients, are tracked numbers. They record the caller's number, the time and the duration so we can tell which marketing made the phone ring. Calls may be recorded for quality, training and record-keeping. Where the law requires it, you will hear a notice at the start of the call; Arizona allows recording with one party's consent, and we follow the stricter rule where the other party is in a two-party-consent state. If you do not want a call recorded, say so at the start and we will note it.",
    "Where our AI receptionist answers a call, it tells the caller it is an automated assistant, takes the caller's details and books the appointment or takes a message. Those calls are recorded and transcribed the same way.",
  ]},
  { h: "Cookies and tracking", p: [
    "Our site uses cookies and similar technologies for three things: to make the site work, to measure how it is used, and, where we run ads for ourselves, to measure whether they worked. The measurement tools we use may include Google Analytics, Google Ads and Meta pixels. These set cookies that can recognize your browser across sites. You can block or delete cookies in your browser settings; the site will still work, though some features may not. We do not respond to Do Not Track signals because there is no agreed standard for them.",
  ]},
  { h: "Who we share it with", p: [
    "We do not sell your personal information, and we do not share it for cross-context behavioral advertising. We share it only with:",
    [
      "Service providers that run parts of our business under contract and may only use it to provide the service: website hosting and deployment, telephony and call tracking, the CRM and automation platform, email and text-message delivery, analytics, payment processing, and the AI tools described in our AI policy.",
      "Our clients, where you contacted one of them through a system we run for them. In that case the client is the owner of your information.",
      "Authorities and others when the law requires it, to enforce our agreements, or to protect the safety or rights of any person.",
      "A buyer or successor if we sell or reorganize the business, under this policy or one at least as protective.",
    ],
  ]},
  { h: "Information we process for our clients", p: [
    "When a home service company hires us, we build and run systems in that company's name: its website, its ad accounts, its phone numbers, its review tools and its CRM. The leads, calls, texts, recordings and records that flow through those systems belong to the client. We process them on the client's instructions, keep them separate from other clients' data, and hand them over in full if the client leaves. Homeowners who want to exercise rights over that information should contact the company they dealt with; we will help the client respond.",
  ]},
  { h: "How long we keep it", p: [
    "We keep personal information as long as we need it for the purpose we collected it, and then delete or anonymize it. As a rule: enquiry and booking records for three years after the last contact; call recordings and tracking data for up to 24 months; client system data for the life of the engagement plus 30 days of handover, unless the client asks for a different period; records of text-message consent for as long as the law requires us to be able to prove it; and anything we must keep longer for tax, accounting or legal reasons.",
  ]},
  { h: "Your rights and choices", p: [
    "Wherever you live, you can ask us what personal information we hold about you, ask us to correct or delete it, and ask us to stop using it for marketing. Residents of California, Colorado, Connecticut, Virginia, Utah, Texas, Oregon, Montana and other states with privacy laws may also have the right to know the categories of information we have collected and shared, to opt out of certain uses, to limit the use of sensitive information, and not to be discriminated against for exercising these rights. We do not sell personal information or use it for targeted advertising in the sense those laws define, so there is nothing to opt out of on that front.",
    `To make a request, email ${CONTACT_EMAIL} with "Privacy request" in the subject line. We will confirm your identity, respond within 45 days, and tell you if we need more time. You may appeal a decision by replying to our response. You can also opt out of texts by replying STOP, and out of marketing email by using the unsubscribe link.`,
  ]},
  { h: "Security", p: [
    "We protect personal information with access controls, encryption in transit, and vendors that meet recognized security standards. No system is perfectly secure, and we cannot guarantee that information will never be lost or accessed without authorization. If a breach affects you, we will tell you and the relevant authorities as the law requires.",
  ]},
  { h: "Links to other sites", p: [
    "Our site links to other sites, including our clients' sites and third-party services. Their privacy practices are their own and we are not responsible for them.",
  ]},
  { h: "Changes to this policy", p: [
    "We may update this policy. When we do, we will change the effective date at the top of the page, and, if the change is material, we will tell current clients and recent contacts by email. Continued use of the site after a change means you accept it.",
  ]},
  { h: "Contact", p: [
    `Rocket Llama Labs LLC, Phoenix, Arizona. Email ${CONTACT_EMAIL}.`,
  ]},
];

export const TERMS: Section[] = [
  { h: "Agreement", p: [
    `These are the conditions for using rocketllamalabs.com (the "site"), which belongs to Rocket Llama Labs LLC ("Rocket Llama Labs", "we", "us"). By using the site you agree to them and to our privacy policy. If you do not agree, do not use the site. Work we do for clients is governed by the client's service agreement; where that agreement and these conditions differ, the agreement wins.`,
  ]},
  { h: "What the site is for", p: [
    "The site describes our services, lets you check how your company shows up online, run an instant audit, and schedule a call with us. It is for owners and managers of home service companies and people working on their behalf. You must be at least 18 and able to enter a binding agreement to use the forms.",
  ]},
  { h: "The 60-second check, the instant audit and the results", p: [
    "The check and the audit score your company from the answers you give and from public information about it. The score and the commentary are estimates, produced in part by automated tools, meant to start a conversation. They are not a guarantee of any result, a promise of ranking, or professional advice. Figures shown as examples on the site, including search volumes, close rates, job values and seasonal patterns, are illustrative unless a source is named.",
  ]},
  { h: "Scheduling a call", p: [
    "Booking a call does not create a client relationship or any obligation on either side. We will write you a plan and a quote; you decide whether to go ahead. If you check the text-message box on the booking form, the terms in our privacy policy apply to those texts.",
  ]},
  { h: "Your use of the site", p: [
    "You agree not to:",
    [
      "use the site in any way that breaks the law or infringes anyone's rights;",
      "submit information that is false, misleading, or that you do not have the right to share;",
      "copy, scrape, or reproduce the site or its content for commercial purposes without our written permission;",
      "interfere with the site's operation or security, probe it for weaknesses, or load it with automated traffic;",
      "use the forms to send us or our clients spam, or to test or train an automated system.",
    ],
  ]},
  { h: "Our content", p: [
    "The site and everything on it, including the text, design, logo, mascot, photographs, video, diagrams and code, belong to Rocket Llama Labs or our licensors and are protected by copyright and trademark law. You may view the site and print pages for your own evaluation of our services. Any other use needs our written permission. Names and logos of other companies on the site belong to their owners and appear only to identify them.",
  ]},
  { h: "What you own", p: [
    "You keep ownership of anything you send us through the site. You give us a licence to use it to respond to you, to prepare your plan and to provide our services. If you become a client, the website, data, phone numbers and ad accounts we build and run for you belong to you, as your service agreement sets out.",
  ]},
  { h: "Third-party services", p: [
    "The site relies on third-party services, including hosting, analytics, scheduling, telephony and AI tools, and links to third-party sites. We do not control them and are not responsible for their content, availability or practices. Your use of them is subject to their own terms.",
  ]},
  { h: "No warranty", p: [
    `The site is provided "as is" and "as available". To the fullest extent the law allows, we make no warranties about it, express or implied, including that it will be accurate, complete, uninterrupted, error-free or free of harmful code, or that it is fit for any particular purpose. Nothing on the site is a promise of marketing results, search rankings, lead volume or revenue.`,
  ]},
  { h: "Limitation of liability", p: [
    "To the fullest extent the law allows, Rocket Llama Labs and its members, managers, employees and contractors are not liable for any indirect, incidental, consequential, special or punitive damages, or for any lost profits, revenue, data or goodwill, arising from your use of or inability to use the site, even if we have been told they are possible. Our total liability for any claim connected with the site is limited to one hundred US dollars. Some jurisdictions do not allow these limits, so they may not apply to you in full.",
  ]},
  { h: "Indemnity", p: [
    "You agree to defend and indemnify Rocket Llama Labs against claims, losses and costs, including reasonable legal fees, that arise from your breach of these conditions or your misuse of the site.",
  ]},
  { h: "Governing law and disputes", p: [
    "These conditions are governed by the laws of the State of Arizona, without regard to its conflict-of-law rules. Any dispute connected with the site will be brought in the state or federal courts in Maricopa County, Arizona, and you consent to their jurisdiction. Before filing, each side agrees to try to resolve the dispute by discussion for 30 days.",
  ]},
  { h: "Changes", p: [
    "We may change the site or these conditions at any time. Changes take effect when posted. The effective date at the top of the page tells you when they last changed. Continued use after a change means you accept it.",
  ]},
  { h: "General", p: [
    "If any part of these conditions is found unenforceable, the rest still applies. Our failure to enforce a term is not a waiver of it. These conditions, with the privacy policy and the AI policy, are the whole agreement between you and us about the site.",
  ]},
  { h: "Contact", p: [
    `Rocket Llama Labs LLC, Phoenix, Arizona. Email ${CONTACT_EMAIL}.`,
  ]},
];

export const AI: Section[] = [
  { h: "Why we have this policy", p: [
    "Artificial intelligence is part of how we work. It is in the receptionist that answers a client's phone when nobody can, in the replies that go to a new lead in under a minute, in the drafts behind website copy and ad campaigns, and in the audit that scores how a company shows up online. We think you should know where it is, what it does, and where a person is responsible. That is what this policy sets out. It applies to our own site and to the systems we build and run for clients.",
  ]},
  { h: "Where we use AI", p: [
    [
      "Answering: an AI voice attendant can answer a client's tracked phone number when the owner cannot pick up. It identifies itself as an automated assistant, takes the caller's details, qualifies the request and books an appointment or takes a message. The call is transferred to a person whenever one is available or the caller asks.",
      "Replying: when a new lead comes in by form, text or missed call, an automated reply goes back by text and email in the client's voice. The client approves the wording before it goes live.",
      "Writing: first drafts of website pages, service descriptions, ad copy, review responses and emails. A person edits every draft before it is published.",
      "Research and analysis: keyword and search research, competitor review, reading call transcripts and CRM data for patterns, and the instant audit on our site.",
      "Building: code for websites and automations, which our team reviews and tests before it ships.",
    ],
    "We do not use AI to make decisions about people that have legal or similarly significant effects, and we do not use it to generate fake reviews, testimonials, case studies or results.",
  ]},
  { h: "A person is responsible", p: [
    "Every deliverable has a person's name on it. AI produces drafts, suggestions and summaries; our team decides what goes out. Website copy, ad campaigns, review responses and reports are read and approved by a person before they are published or sent. The AI receptionist's scripts are written and tested by us and reviewed with the client. If something an AI tool produced is wrong, that is our responsibility, not the tool's.",
  ]},
  { h: "Disclosure", p: [
    "We tell clients which parts of their system use AI and how, in the plan and in the service agreement. The AI receptionist tells callers it is automated. Automated texts and emails are sent from the client's own numbers and addresses and are marked as automated where the law requires it. If a client wants to know whether a specific piece of work started as an AI draft, we will say.",
  ]},
  { h: "Your choices", p: [
    "A client can ask us not to use AI for the writing on their account, and we will do that work by hand. A client can turn the AI receptionist off and route calls straight to voicemail or a person. Homeowners who reach an AI receptionist can ask for a person at any time. Research, analysis and reporting use AI tools throughout and cannot be separated from the service.",
  ]},
  { h: "Data and AI tools", p: [
    "We use AI models from established providers under business terms that do not allow our data or our clients' data to be used to train their models. We send AI tools only what the task needs. Call transcripts, CRM records and lead details are handled under our privacy policy and the client's; we do not feed them into consumer AI products. We keep a record of which tools touch which data so we can answer questions and delete data on request.",
  ]},
  { h: "Accuracy and originality", p: [
    "AI tools make mistakes and can produce text that resembles existing work. We check facts, figures and claims before they go out, and we check written drafts for originality. Scores from the 60-second check and the instant audit are automated estimates meant to start a conversation; they are not guarantees, and we say so on the page. We do not promise that AI-assisted work will produce any particular ranking, lead volume or revenue.",
  ]},
  { h: "Fairness", p: [
    "We review how automated replies and the AI receptionist handle callers to make sure they treat people consistently, regardless of who they are, and we correct anything that does not. We do not use AI to screen or score homeowners on protected characteristics.",
  ]},
  { h: "The law", p: [
    "We follow the laws that apply to automated calls and texts, including the Telephone Consumer Protection Act, the CAN-SPAM Act and state consent rules for call recording, and the consumer-protection rules that forbid misleading claims about what is human and what is automated. As AI laws change, this policy will change with them.",
  ]},
  { h: "Questions", p: [
    `If you have a question about how AI is used in your account, or about anything in this policy, email ${CONTACT_EMAIL}. We will answer in plain language.`,
  ]},
];

export function LegalBody({ sections }: { sections: Section[] }) {
  return <div className="legal">{sections.map(render)}</div>;
}
