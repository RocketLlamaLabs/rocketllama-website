# The Rocket Llama SEO and AI Search Playbook

The standard every client website is built to, and the one our own site follows. It covers Google search, the map pack, and AI search (ChatGPT, Gemini, Google AI Overviews, Perplexity, Claude).

Written for home service companies: one business, a defined service area, a handful of services, and a phone that needs to ring.

**How to use it.** Sections 1 to 3 are the model. Sections 4 to 12 are the build standard. Section 13 is the launch checklist, section 14 the monthly routine. Section 15 shows where each rule is applied on rocketllamalabs.com so there is a working example to copy.

---

## 1. How a company gets picked

Three systems decide who gets the call, and each reads the same site differently.

| System | What it rewards | What we give it |
| --- | --- | --- |
| Google organic | A page that matches the search, on a fast site, from a business it trusts | One page per service and per city, unique copy, clean technical setup |
| Google map pack and Local Services Ads | Proximity, a complete verified profile, review count and rating, answering the phone | Verified Google Business Profile, review requests after every job, calls answered |
| AI assistants | Clear statements of fact they can quote, consistent across the web, from a source that looks real | Answer-first copy, a summary block, FAQs, structured data, a named author, the same facts everywhere |

Two rules follow from this and apply to everything below:

1. **One page, one job.** Every page targets one service, one city, or one question. Nothing competes with another page on the same site.
2. **Say it in plain text, then say it again in schema.** If a fact matters (what you do, where, who you are, what it costs), it appears in visible copy first and structured data second. Schema never states anything the page does not.

## 2. Keyword and question research

Do this before any page is written. One sheet per client.

1. **Services.** List every service the company wants more of, in the customer's words ("AC repair", not "HVAC service call").
2. **Cities.** List every city and neighborhood in the service area, largest first.
3. **Service by city.** Cross the two lists. The cells with real search volume become pages. The rest are covered by the city page.
4. **Questions.** For each service, collect the questions customers ask on the phone, the "People also ask" box, and what an AI assistant answers when asked "who is the best [trade] in [city]" and "how much does [service] cost in [city]". These become FAQs.
5. **Money terms first.** Prioritize emergency and replacement terms (highest job value), then maintenance, then informational.

Map every keyword to exactly one URL. If two pages want the same keyword, merge them.

## 3. Site architecture

```
/                               Home: who, what, where, proof, one call to action
/services                       Every service, linking to each service page
/[service]                      One page per service        e.g. /ac-repair
/service-areas                  Every city, linking to each city page
/[city]                         One page per city           e.g. /scottsdale
/[city]/[service]               Only where search volume justifies it
/about                          The owner, the team, licenses, years in business
/reviews                        Real reviews, with the source named
/contact                        Name, address, phone, hours, map, service area
/blog or /answers               One question per article
/privacy  /terms                Legal
```

For a company that sells to other businesses by vertical (as we do), swap service pages for industry pages: `/hvac`, `/plumbing`, `/roofing`.

Rules:

- Short, lowercase, hyphenated URLs. No dates, no IDs, no `/services/category/sub/page`.
- Every page is reachable in two clicks from the home page.
- Every page links up to its hub (service page to `/services`) and sideways to two or three siblings.
- No orphan pages. No page exists only in the sitemap.
- City pages must be genuinely different from each other: local landmarks, neighborhoods served, local jobs, local reviews, local conditions. A page that only swaps the city name is a doorway page and gets ignored or penalized.

## 4. The page template

Every service, city and industry page has these blocks, in this order.

| # | Block | Standard |
| --- | --- | --- |
| 1 | Title tag | Unique. Primary keyword first, brand last. 50 to 60 characters. |
| 2 | Meta description | Unique. What the page offers and why to click. 140 to 160 characters. |
| 3 | Banner image | A real photo of the trade or the place. Descriptive alt text. Sized and compressed. |
| 4 | H1 | One per page. Contains the primary keyword. Not identical to the title tag. |
| 5 | Opening paragraph | Answers "what is this and who is it for" in the first two sentences. |
| 6 | Byline | Author name, role, and the date last updated, linking to the author's bio. |
| 7 | Summary block | 40 to 80 words that stand on their own, plus 4 to 6 one-line facts. This is the passage an AI quotes. |
| 8 | Body sections | H2s that each answer one thing. Unique to this page. 600 words minimum across the page. |
| 9 | Proof | Reviews, numbers, photos of real work, licenses. |
| 10 | Location block | Where the company is based and the cities this page covers, in text. |
| 11 | FAQ | 5 to 8 real questions with complete answers of 40 to 90 words. Visible on the page. |
| 12 | Call to action | One primary action, repeated at the top and bottom. Phone number is tap-to-call. |
| 13 | Related links | Two to four sibling pages. |
| 14 | Structured data | See section 7. |

### Title and description formulas

| Page | Title | Example |
| --- | --- | --- |
| Home | [Trade] in [City] \| [Brand] | AC Repair and Installation in Phoenix \| Desert Air |
| Service | [Service] in [City] \| [Brand] | Water Heater Replacement in Mesa \| Copper State Plumbing |
| City | [Trade] in [City], [State] \| [Brand] | Electrician in Gilbert, AZ \| Volt Electric |
| Industry (B2B) | [Industry] Marketing Services: [benefit] \| [Brand] | HVAC Marketing Services: SEO, Ads and Leads \| Rocket Llama Labs |
| Article | [The question, as asked] | How Much Does a New AC Unit Cost in Phoenix? |

No two pages on a site share a title, a description, or an H1.

### Heading rules

- One H1. H2 for sections, H3 inside sections. Never skip a level for styling.
- Headings describe the content. "AC repair in Scottsdale" beats "Our services".
- Phrase some H2s as the question a customer asks. AI assistants match questions to headings.

## 5. Writing for AI search

AI assistants do not rank ten links. They assemble an answer from passages they trust, and name the source. To be the source:

1. **Answer first.** The first sentence under any heading is the answer. Explanation follows. Never open with a wind-up.
2. **Write quotable passages.** Each paragraph should make sense lifted out of the page. Name the subject instead of saying "we" or "it" in the sentences that matter: "Desert Air repairs and installs air conditioners in Phoenix, Scottsdale and Mesa."
3. **Add a summary block** near the top of every key page (template block 7). Plain facts, no adjectives.
4. **State specifics.** Prices or price ranges, response times, years in business, license numbers, cities, hours, warranties. Assistants prefer the page with a number over the page with a claim.
5. **Use FAQs** written the way people ask out loud: "How much does it cost to replace a water heater in Mesa?"
6. **Use lists and tables** for steps, comparisons and prices. They are extracted cleanly.
7. **Name entities.** The company, the owner, the city, the brands installed, the licensing body. Link the first mention of each to its page.
8. **Keep facts identical everywhere.** Name, address, phone, hours, services and service area must match on the site, the Google Business Profile, Bing Places, Apple Business Connect, Yelp, the BBB and every directory. Assistants cross-check; a mismatch reads as unreliable.
9. **Earn mentions off the site.** Assistants weigh what others say: reviews, local news, supplier and manufacturer dealer pages, chamber of commerce, trade associations, Reddit and Nextdoor threads. One real local mention beats ten directory listings.
10. **Stay fresh.** Show a "last updated" date and actually update. Revisit key pages at least every six months.
11. **Let the crawlers in.** `robots.txt` must allow `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`, `Google-Extended` and `Bingbot`. Blocking them removes the site from those answers.
12. **Serve real HTML.** Most AI crawlers do not run JavaScript. All copy, FAQs and schema must be in the HTML the server sends.
13. **Publish `/llms.txt`.** A short plain-text summary of the business and a list of its key pages. Cheap to maintain; keep it in step with the site.
14. **Be in Bing.** ChatGPT search draws on Bing's index. Verify the site in Bing Webmaster Tools and submit the sitemap there as well as in Google Search Console.

## 6. Authorship and trust

Google and AI assistants both look for a real, accountable person behind the content.

- Every content page carries a visible byline: name, role, date updated, linking to the author's bio.
- The author is someone who actually does or directs the work: the owner, a licensed tech, a manager. The named author reads and approves the page before it is published.
- The About page has a full bio per author: photo, role, years of experience, licenses and certifications, and links to profiles elsewhere (LinkedIn, the license lookup, a manufacturer dealer page).
- The site shows license numbers, insurance, years in business, and association memberships in the footer or on the About page.
- Reviews are real, attributed, and name the source (Google, Yelp). Never write or edit a review.
- The schema repeats the same author (section 7).

## 7. Structured data

JSON-LD, in the server-rendered HTML, one `@graph` per page. Use stable `@id`s so pages reference the same business and people rather than redefining them.

| Page | Types |
| --- | --- |
| Every page | `BreadcrumbList`, `WebPage` (with `author`, `datePublished`, `dateModified`, `primaryImageOfPage`) |
| Home | The business node: `LocalBusiness` or its subtype (`HVACBusiness`, `Plumber`, `Electrician`, `RoofingContractor`), plus `WebSite` |
| Service, city, industry | `Service` (with `provider`, `areaServed`, `serviceType`, `audience`), `FAQPage` |
| About | `AboutPage`, `Person` for each team member |
| Article | `Article` or `BlogPosting` with `author` |
| Video | `VideoObject` |

### The business node

Carries `name`, `legalName`, `url`, `logo`, `image`, `telephone`, `email`, `address` (full `PostalAddress`), `geo`, `openingHoursSpecification`, `areaServed` (every city), `sameAs` (Google profile, Facebook, Yelp, BBB, license lookup), `founder`, and `knowsAbout`.

A service-area business that hides its street address on Google still lists city, state and ZIP here, and lists every city in `areaServed`.

### Authorship

`WebPage.author` points to a `Person` node with `name`, `jobTitle`, `worksFor`, `url` (their bio), `image` and `sameAs`. The same person is named in the visible byline.

### FAQ

`FAQPage` with one `Question` per visible FAQ. The text in the schema is the text on the page, word for word.

### Rules

- Schema only repeats what is visible on the page.
- Leave a field out rather than guess it.
- Do not mark up the company's own reviews with `AggregateRating` on its own business node; Google treats this as self-serving and ignores it.
- Google now shows FAQ rich results for very few sites. We still publish `FAQPage` because it is the cleanest machine-readable question-and-answer format for every other reader, including AI assistants. Do not promise a client FAQ rich results.
- Validate every template in Google's Rich Results Test and the Schema.org validator before launch.

## 8. Location

Local search runs on location signals. Be explicit.

- **NAP.** Name, address and phone are identical, character for character, on the site footer, the contact page, the schema, the Google Business Profile and every listing.
- **Service area in text.** Every key page names the cities it covers in a sentence, not only in a footer list.
- **City pages** for each city worth targeting, each with unique local content (section 3).
- **Embedded map** on the contact page.
- **Local proof.** Photos of jobs with the city named in the caption and alt text; reviews that mention the city.
- **Listings.** Google Business Profile, Bing Places, Apple Business Connect, Yelp, BBB, Nextdoor, Angi, the manufacturer's dealer locator, the state license lookup, the local chamber. Same NAP on all.

## 9. Google Business Profile

The profile drives the map pack and is the first thing an AI assistant reads about a local company.

1. **Claim and verify.** Google now verifies most service businesses by video: one continuous recording showing the location or service area, the tools and a branded vehicle, and proof the person runs the business (unlocking the shop, the license, the invoice system). Plan and script this with the client; a failed verification costs weeks.
2. **Set up as a service-area business** if customers are not served at the address. Hide the address, list the cities served.
3. **Primary category** is the main money service. Add every secondary category that truly applies.
4. **Services.** List every service with a description, matching the service pages on the site.
5. **Complete everything:** hours (including holiday and emergency hours), phone, website link with tracking, booking link, attributes, a 750-character description that leads with trade and city.
6. **Photos.** Real jobs, team, trucks. Add new ones every month.
7. **Posts.** One a week: a finished job, an offer, a seasonal reminder.
8. **Reviews.** Ask after every job; answer every one (section 11).
9. **Never** keyword-stuff the business name, use a virtual office address, or create duplicate profiles. Each is grounds for suspension.

## 10. Local Services Ads

The Google-screened listings above everything else, paid per lead instead of per click.

- **Eligibility.** Google checks the business before ads run: business registration, license and insurance where the trade and state require them, and background checks for some categories. Requirements vary by trade and market; confirm the category is available in the client's area first.
- **Account in the client's name,** on their card. We manage it.
- **Ranking** depends on review count and rating, how often and how fast leads are answered, proximity, hours and budget. Answering every lead is the cheapest way to rank higher.
- **Tune:** job types (turn off low-value ones), service area, hours, weekly budget by season.
- **Dispute** invalid leads every week (wrong service, wrong area, spam).
- **Connect** leads to the CRM so each one is tracked to a booked job and its value.

## 11. Reviews

- Ask by text within an hour of the job closing, with a direct link to the Google review form.
- Ask every customer, not just the happy ones. Never offer anything in exchange and never screen who is asked.
- Answer every review within two business days, in the owner's voice. Mention the service and the city naturally.
- Answer bad reviews calmly, once, and take it offline.
- Show real reviews on the site with the reviewer's first name, the city and the source.
- Target: more reviews, and more recent reviews, than the top three competitors in the map pack.

## 12. Technical standard

| Area | Standard |
| --- | --- |
| Speed | Largest Contentful Paint under 2.5 s, Interaction to Next Paint under 200 ms, Cumulative Layout Shift under 0.1, measured on a phone |
| Mobile | Designed for a phone first. Tap-to-call. No horizontal scroll. |
| Rendering | Content and schema in server-rendered HTML |
| HTTPS | Everywhere, one canonical host (www or bare, not both) |
| Canonical | Self-referencing canonical on every page |
| Sitemap | `/sitemap.xml` lists every indexable page, submitted to Google and Bing |
| Robots | `/robots.txt` allows search and AI crawlers, blocks only admin and private paths |
| Images | WebP or AVIF, `width` and `height` set, responsive `srcset`, lazy-loaded below the fold, descriptive alt text, descriptive file names |
| Banner image | Loaded eagerly with high fetch priority; it is usually the LCP element |
| Links | No broken links. Old URLs redirect (301) to the new ones. Descriptive anchor text. |
| Errors | A real 404 page that returns a 404 status |
| Social | Open Graph and Twitter card tags with a 1200 by 630 image |
| Accessibility | Proper heading order, labels on forms, sufficient contrast, alt text. What helps a screen reader helps a crawler. |
| Tracking | Search Console, Bing Webmaster Tools, analytics, a tracked phone number per source |

## 13. Launch checklist

Before a site or a new page goes live:

- [ ] Every page has a unique title, description and H1
- [ ] Every keyword maps to exactly one URL
- [ ] Banner image present, compressed, with alt text
- [ ] Summary block and FAQ on every service, city and industry page
- [ ] Byline and updated date on every content page; the author has approved the copy
- [ ] Location named in text on every key page; NAP identical everywhere
- [ ] Schema validates: breadcrumbs, page, service, FAQ, author, business
- [ ] Schema matches the visible page
- [ ] Internal links: hub to page, page to hub, page to siblings
- [ ] Canonical tags, sitemap and robots.txt correct; no leftover `noindex`
- [ ] AI crawlers allowed; `/llms.txt` current
- [ ] Core Web Vitals pass on a phone
- [ ] Redirects in place from every old URL
- [ ] Search Console and Bing Webmaster Tools verified, sitemap submitted
- [ ] Google Business Profile verified, complete, and linking to the site
- [ ] Call tracking and form tracking tested end to end

## 14. Monthly routine

| When | What |
| --- | --- |
| Weekly | Google Business Profile post. Answer every review. Dispute bad Local Services leads. |
| Monthly | New photos on the profile. One new article answering a real customer question. Check Search Console for errors, new queries and pages losing clicks. |
| Monthly | **AI check.** Ask ChatGPT, Gemini, Perplexity and Google the same fixed set of prompts ("best [trade] in [city]", "who should I call for [service] in [city]", "[brand] reviews") and record whether the client is named, what is said, and which sources are cited. Fix whatever is wrong at the source. |
| Monthly | Report: rankings, map pack position, AI mentions, calls, booked jobs, revenue per source. |
| Quarterly | Refresh the top ten pages: update facts, add FAQs from real calls, update the date. Audit listings for NAP drift. Compare reviews with the top three competitors. |
| Twice a year | Full technical crawl. Re-run keyword and question research. |

## 15. Applied on rocketllamalabs.com

The industry pages are the reference build for this playbook.

| Rule | Where it lives |
| --- | --- |
| One page per industry at a short URL (`/hvac`, `/plumbing`, ...) | `src/app/(home)/[slug]/page.tsx`, one folder per trade |
| All copy, titles, FAQs per industry | `src/components/v7/industries-data.ts` |
| Page template (banner, byline, summary, sections, location, FAQ, related links) | `src/components/v7/industry-page.tsx` |
| Schema: breadcrumbs, page with author and dates, service, FAQ, organization, person | `IndustryStructuredData` in `src/components/v7/page-seo.tsx` |
| Hub page linking to every industry | `/industries` |
| Sitemap and `llms.txt` | `src/app/sitemap.ts`, `public/llms.txt` |

Still open on our own site, to close before launch: remove the pre-launch `noindex` (`next.config.ts`) and the blanket `Disallow` (`src/app/robots.ts`); add a street address or ZIP, a phone number and social profiles to the organization schema; replace the shared banner photos with one real photo per trade.
