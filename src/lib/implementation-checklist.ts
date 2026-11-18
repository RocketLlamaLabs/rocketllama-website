// The new-client implementation checklist shown at
// /admin/assets/implementation-checklist. Edit the lists here; the page
// renders whatever is in this file.
//
// `who` says where the item comes from: "client" is something we collect
// from the client, "us" is something we set up or confirm ourselves.
//
// Ticks are saved by item id (section id plus position), so add new items to
// the end of a section to keep ticks on a checklist in progress lined up.

export type ChecklistItem = {
  text: string;
  note?: string;
  who: "client" | "us";
};

export type ChecklistSection = {
  id: string;
  title: string;
  lead: string;
  items: ChecklistItem[];
};

const client = (text: string, note?: string): ChecklistItem => ({
  text,
  note,
  who: "client",
});
const us = (text: string, note?: string): ChecklistItem => ({
  text,
  note,
  who: "us",
});

export const CHECKLIST_UPDATED = "2026-11-16";

export const checklistSections: ChecklistSection[] = [
  {
    id: "kickoff",
    title: "Agreement and kickoff",
    lead: "Before any build work starts.",
    items: [
      us("Signed agreement on file", "Scope, term, monthly fee, ad spend terms, and that the client owns every account."),
      client("Billing contact and payment method", "Name, email, card or ACH, billing address."),
      us("First invoice or subscription set up"),
      client("Main point of contact", "Name, role, mobile, email, best way and time to reach them."),
      client("Who approves copy, design and ad spend", "One person if possible, with a backup."),
      client("Goals for the first 90 days", "More calls, more of a certain job type, a new service area, fewer missed calls."),
      us("Kickoff call booked and held", "Walk this checklist with the client on the call."),
      us("Shared channel agreed for day-to-day questions", "Email, text or Slack, and expected reply times both ways."),
      us("Client folder created in the shared drive", "Contract, logins record, brand files, photos, reports."),
    ],
  },
  {
    id: "business",
    title: "Business profile",
    lead: "The facts every system reuses: website, Google, phone registration, CRM.",
    items: [
      client("Legal business name and any DBA", "Exactly as on IRS and state records; text message registration fails on a mismatch."),
      client("EIN and entity type", "Needed for text message (A2P) registration."),
      client("Business address", "Street address, and whether it is shown publicly or hidden as a service-area business."),
      client("Main phone number and public email"),
      client("Hours of operation", "Normal, after hours, weekends, holidays, emergency service."),
      client("Contractor license numbers", "Arizona ROC number and class, plus any city licenses."),
      client("Proof of insurance and bonding", "Certificate of insurance; Local Services Ads asks for it."),
      client("Year founded, owner names, team size, number of trucks"),
      client("Services offered, in priority order", "Which jobs make the most money and which they want more of."),
      client("Services they do not offer", "So ads, the website and the AI receptionist never promise them."),
      client("Service area", "Cities and ZIP codes served, plus any they will not go to."),
      client("Pricing rules we may share", "Service call fee, free estimates, price ranges, or no prices at all."),
      client("Average job value and close rate by service", "Used for the report card and ad targets."),
      client("Financing, warranties and guarantees"),
      client("Current offers and seasonal promotions"),
      client("Busy and slow seasons"),
      client("Ideal customer", "Homeowner or commercial, home age, neighborhoods, typical problem."),
      client("Top three to five competitors"),
      client("What sets them apart", "In their own words; record it if you can."),
    ],
  },
  {
    id: "brand",
    title: "Brand and content",
    lead: "Everything we need to make the company look like itself.",
    items: [
      client("Logo files", "Vector if they exist (SVG, AI, EPS), plus light and dark versions."),
      client("Brand colors and fonts", "Or permission for us to set them."),
      client("Photos of the team, trucks, shop and real jobs", "Real photos beat stock every time. Book a shoot if there are none."),
      client("Before and after photos"),
      client("Video", "Owner intro, job walk-throughs, customer testimonials."),
      client("Owner and team bios, with headshots"),
      client("Customer testimonials we may publish", "With written permission for names and photos."),
      client("Certifications, awards, memberships and manufacturer badges", "BBB, NATE, dealer programs, chamber of commerce."),
      client("Tone of voice", "How they talk to customers; words and claims to avoid."),
      client("Existing brochures, flyers, truck wraps and mailers"),
      us("Brand kit saved to the client folder"),
    ],
  },
  {
    id: "website",
    title: "Website",
    lead: "Access to what exists today, and what the new site needs.",
    items: [
      client("Domain name and where it is registered", "GoDaddy, Namecheap, Squarespace, a past agency."),
      client("Access to the domain registrar and DNS", "A delegated or invited login; never a password over email or text."),
      client("Access to the current website and host", "WordPress, Wix, Squarespace or other admin."),
      client("Who owns the current site and content", "Confirm a past agency cannot take it down."),
      us("Every email address on the domain listed", "So a DNS change never breaks their mail. Note the mail provider."),
      us("Current site crawled and backed up", "Pages, URLs, titles, rankings and backlinks, before anything changes."),
      us("Redirect map from old URLs to new"),
      client("Pages they want", "Services, service areas, about, reviews, financing, careers, contact."),
      client("Lead forms and where submissions go", "Fields, who is notified, how fast."),
      client("Online booking", "Yes or no, which services, and the hours offered."),
      client("Chat or text widget on the site", "Yes or no."),
      us("Privacy policy, terms and text message consent wording in place", "Text registration checks the site for these."),
      us("Site copy and design approved by the client"),
      us("Analytics, call tracking and conversion tracking installed"),
      us("Speed, phone layout and accessibility checked"),
      us("Site hosted and DNS moved to accounts the client owns", "Renewal dates noted for domain and SSL."),
    ],
  },
  {
    id: "search",
    title: "Google, maps and AI search",
    lead: "Access is granted by inviting us as a manager, not by sharing a login.",
    items: [
      client("Google Business Profile access", "Add us as a manager. Note who the primary owner is."),
      us("Google Business Profile status checked", "Verified, suspended or duplicate listings; categories, services, hours, photos."),
      client("Google Search Console access", "Or we verify the domain ourselves through DNS."),
      client("Google Analytics access", "Or we create a new GA4 property the client owns."),
      client("Local Services Ads account access", "Or the license, insurance and background check details to open one."),
      client("Bing Places and Apple Business Connect access", "Or permission to claim them."),
      client("Yelp, Nextdoor, Angi, Thumbtack and HomeAdvisor accounts", "Which exist, which they pay for, and who has the logins."),
      us("Business name, address and phone audited across directories", "List every mismatch and fix it."),
      us("Baseline recorded", "Map rankings, search rankings, AI search answers, calls and leads per month."),
      us("Target keywords and service-area pages agreed"),
    ],
  },
  {
    id: "ads",
    title: "Paid ads",
    lead: "Only for clients running ads with us.",
    items: [
      client("Google Ads account access", "Invite our manager account. Note the account number."),
      client("Meta Business portfolio and ad account access", "Partner access to the Page, ad account, pixel and Instagram."),
      client("Payment method on each ad account", "The client's card, in the client's account."),
      client("Monthly ad budget by channel"),
      client("Past ad results", "What ran, what it cost, what worked, any disapproved ads or account suspensions."),
      client("Offers we can advertise", "Tune-up specials, free estimates, financing, seasonal deals."),
      client("Services and areas to push, and ones to exclude"),
      us("Conversion tracking set up", "Calls, forms and bookings, tied back to paid jobs."),
      us("Landing pages built and approved"),
      us("Ads approved by the client before launch"),
    ],
  },
  {
    id: "social",
    title: "Social media management",
    lead: "Accounts, voice and the routine for getting real content from the field.",
    items: [
      client("Every social account they have", "Facebook, Instagram, TikTok, YouTube, LinkedIn, Nextdoor, X, Pinterest: handle and link for each."),
      client("Which platforms we manage", "And which we leave alone or close down."),
      client("Access to each account", "Page roles or partner access through Meta Business; invited users elsewhere. No shared passwords."),
      us("Missing accounts created in the client's name", "Matching handles where we can get them."),
      us("Profiles brought up to date", "Logo, cover, bio, hours, phone, service area, website and booking links."),
      client("Who else posts today", "Staff, family, a past agency; agree who stops."),
      client("How often to post, per platform"),
      client("Content themes", "Finished jobs, tips, team, reviews, offers, community, hiring."),
      client("Topics, words and claims to avoid", "Plus anything a license or manufacturer restricts."),
      client("Approval process", "Approve each post, approve a month at a time, or trust us to post."),
      client("How job photos and videos get to us", "A shared album or a text line the techs send to. Name the person responsible."),
      client("Permission rules for customer homes, faces and addresses", "Get a simple written release process in place."),
      client("Who answers comments and messages, and how fast", "Us, them, or the CRM inbox. What we may answer and what we pass on."),
      client("What to do with a complaint or a crisis", "Who we call, and what we never reply to on our own."),
      client("Promotions, events and seasonal dates for the year"),
      client("Community ties", "Sponsorships, charities, local teams, neighborhoods to feature."),
      client("Accounts they admire, and local competitors to watch"),
      client("Budget for boosted posts, if any"),
      us("Scheduling tool connected to each account"),
      us("First month of content planned and approved"),
      us("Baseline recorded", "Followers, reach, engagement, messages and leads from social."),
    ],
  },
  {
    id: "reviews",
    title: "Reviews",
    lead: "How requests go out and who answers.",
    items: [
      us("Current rating and review count recorded for each platform", "Google, Yelp, Facebook, BBB, Angi, Nextdoor."),
      us("Direct Google review link created"),
      client("When a job counts as finished", "The trigger for the review request: invoice paid, job closed, tech marks done."),
      client("Who answers reviews, and in what voice", "Us or them; how to handle a bad one."),
      client("Past customer list for a first review campaign", "Only customers they have permission to contact."),
      client("Customers never to ask", "Open disputes, refunds, commercial accounts."),
      us("Review request text and email approved"),
    ],
  },
  {
    id: "phones",
    title: "Phones, texting and AI receptionist",
    lead: "Number moves and text registration take the longest. Start them first.",
    items: [
      client("Every phone number in use and its carrier", "Main line, tracking numbers, numbers on trucks and old ads."),
      client("Which numbers move to us and which stay"),
      client("Signed letter of authorization and a recent phone bill", "Needed to move a number. The name and address must match the bill."),
      client("Account number and transfer PIN from the current carrier"),
      client("How calls are answered today", "Who picks up, hours, voicemail, answering service, missed call rate."),
      client("Call routing wanted", "Business hours, after hours, overflow, emergencies, and who gets transferred calls."),
      client("Staff mobile numbers for transfers and alerts"),
      client("Call recording", "Yes or no; we add the notice to the greeting."),
      us("Tracking numbers bought for each marketing source"),
      us("Text message brand and campaign registered (A2P 10DLC)", "Legal name, EIN, address, website, sample messages and how customers opt in."),
      client("AI receptionist name, voice and greeting"),
      client("Questions it must answer", "Services, areas, hours, pricing rules, financing, warranties."),
      client("Booking rules", "Which jobs it may book, time windows, lead time, and what it needs to collect."),
      client("When it must hand off to a person", "Emergencies such as gas smell, flooding or no heat; angry callers; existing customers; vendors."),
      client("What it must never say or promise"),
      us("Missed-call text back turned on and worded"),
      us("Test calls and test texts placed on every number", "Business hours and after hours."),
    ],
  },
  {
    id: "crm",
    title: "CRM",
    lead: "Setting the company up in Llama Labs.",
    items: [
      us("Company created with the right time zone and profile"),
      client("Users to add", "Name, email, mobile and role for each; who is an admin."),
      client("Software they use today", "ServiceTitan, Housecall Pro, Jobber, QuickBooks, another CRM, and what must stay in sync."),
      client("Customer and lead list to import", "CSV export, with consent status for text and email."),
      client("Do-not-contact list"),
      client("Lead sources to track", "Website, Google, ads, social, referrals, repeat, yard signs, trucks."),
      client("Pipeline stages", "From new lead to paid job, in their words."),
      client("Calendars and booking", "Whose calendars, Google Calendar connections, job lengths, travel time, service windows."),
      client("Who is notified of a new lead, and how", "Text, email, app; the under-a-minute rule and a backup person."),
      client("Sender name and reply-to address for email"),
      us("Sending domain verified for email", "SPF, DKIM and DMARC records added to their DNS."),
      us("Follow-up sequences written and approved", "New lead, missed call, estimate follow-up, appointment reminders, win-back."),
      us("Message templates include opt-out wording"),
      client("Payments", "Whether they take deposits or payments through us, and the Stripe account to connect."),
      us("Test lead run end to end", "Form, call and text each create a contact, alert the team and start follow-up."),
    ],
  },
  {
    id: "reporting",
    title: "Reporting",
    lead: "Agree on the scoreboard before launch.",
    items: [
      us("Baseline month recorded", "Leads, calls, booked jobs, revenue, cost per lead, reviews, rankings."),
      client("How booked and paid jobs get reported back to us", "From their job software, the CRM, or a monthly export."),
      client("Who receives the monthly report card"),
      us("Report card set up for the client"),
      us("Recurring review call booked", "Monthly, plus 30, 60 and 90 day check-ins."),
    ],
  },
  {
    id: "access",
    title: "Access and security",
    lead: "The client owns everything; we are invited in.",
    items: [
      us("Every account recorded in the client folder", "What it is, who owns it, how we were given access. No passwords in the record."),
      us("All access granted by invite or role, to a company address", "Never a personal login, never a password in email, text or chat."),
      client("Two-step sign-in turned on for Google, Meta and the domain registrar", "With the client's own phone as the recovery method."),
      client("Past agencies and former staff removed from every account"),
      us("Client told how to remove our access at any time"),
    ],
  },
  {
    id: "launch",
    title: "Launch and handoff",
    lead: "Nothing goes live until these pass.",
    items: [
      us("Go-live date agreed with the client"),
      us("Website, forms, phones, texts, booking and tracking tested on a phone and a computer"),
      us("Client and staff trained", "CRM inbox, calendar, the mobile view, and how to send us job photos."),
      us("Client has the support contact and knows what counts as urgent"),
      us("Old site, old numbers and old tools switched off or redirected", "After confirming nothing still depends on them."),
      us("Launch summary sent to the client", "What is live, what is still pending, and what we need from them next."),
    ],
  },
];

export const checklistItemCount = checklistSections.reduce(
  (total, section) => total + section.items.length,
  0
);
