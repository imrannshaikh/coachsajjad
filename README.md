# Sajjad Ahmad Cricket Coaching

A responsive, editorial-style coaching website built with React 19, TypeScript, Vite, Motion, and Lucide. Warm ivory, deep green, and burnt orange form the proposed brand identity.

## Development

Use Node.js 22.12+ or a compatible newer release.

```sh
npm install
npm run dev
```

Open the local address printed by Vite. `npm run build` runs strict TypeScript checks and produces `dist/`. `npm run preview` serves the production build. `npm test` runs the interaction and enquiry tests.

Motion is imported through `motion/react`; no `npx motion` command is required for the animation library.

## Features

- Responsive desktop and mobile layouts, mobile navigation, and progressive section reveals.
- Reduced-motion preferences, keyboard-accessible skill tabs, native disclosure FAQs, skip link, and modal focus containment.
- Batting, bowling, and fielding disciplines plus programme-specific enquiries.
- £50/hour pricing, ECB Level 2 credentials, and the coach's supplied playing/coaching biography.
- Direct text links and a guided message builder for **+44 7720 704495**, including iOS-compatible SMS links.
- Downloadable enquiry drafts for devices without a messaging application.
- No accounts, payment collection, analytics, server-side personal-data storage, or third-party form submissions.
- Local cricket images to avoid runtime image-service dependencies.
- Dedicated `/achievements.html` career page with historical highlights, timeline, all-round season figures, club honours, and source context.

## How booking works

Players can text Sajjad directly or prepare a message with their name, playing level, coaching interest, and goals. The draft is held in page memory only. Opening the text link hands it to the device's messaging app; the user must review and send it there. Sajjad confirms the session directly. This website never claims that a message has been sent or a booking confirmed.

On a desktop without a text-message handler, the number and draft are visible for manual copying, and a plain-text draft can be downloaded. Closing the modal discards form state. The public phone number and display formatting are centralised in `src/coaching.ts`.

No email or child-identifying information is requested. Google Fonts are the only external runtime resource; their provider receives a standard font request, but no enquiry content. Photos are served locally.

## Before public launch

1. Consider adding a current portrait. Both pages use the cleared historical portrait cropped to Sajjad alone; the homepage hero uses illustrative imagery.
2. Approve the proposed programme packaging, brand identity, and coaching-philosophy copy.
3. Confirm venues, coverage area, permitted age groups, and safeguarding arrangements.
4. Confirm session durations, payment arrangements, and cancellation terms; the supplied rate is £50/hour.
5. Add any required privacy and booking policies.
6. Confirm the domain, then add canonical/Open Graph URL metadata and a social preview image. The current build deliberately has no invented domain or third-party credential/endorsement claims.
7. Test the SMS handoff on physical iOS and Android devices; browser tests verify the link format but cannot prove messaging-app delivery.

The supplied brief identifies **Sajjad Ahmad**, ECB Level 2, former first-class cricketer in Pakistan, former professional at Oldham in the Central Lancashire League, and coaching since 2010 at Spencer, Esher, and AJ Coaching Cricket Academy. “Ahmed” appeared in the supplied academy extract; this site consistently uses the requested “Ahmad” spelling.

The original research links were [AJ Coaching coaches](https://ajcoaching.co.uk/coaches/) and [Cheam Cricket Club coaching](https://www.cheamcricketclub.com/coaching). Neither rendered page provided a usable biography during initial preparation; the biographical details were subsequently supplied by the user. No source-site portraits or unapproved testimonials are reproduced.

## Design

The interface uses a bold sports direction: dark-green hero and skill panels, ivory surfaces, oversized Manrope headings, 18–20px main body copy, larger booking controls and rounded coaching cards. Both pages share responsive typography and navigation. At tablet widths the coaching cards stack to preserve readability; the menu switches before desktop navigation becomes crowded. Reduced-motion visitors see content immediately, without reveal fades.

## Image credits

The historical portrait at `public/images/sajjad-archive-portrait.jpg` is a 320 × 650 crop of the supplied `WhatsApp Image 2026-10-31 at 20.58.12 (1).jpeg`, starting at x=880, y=140. Website-use permission was confirmed by the user. At the user's request, it shows Sajjad alone and completely excludes the presenter, other attendees, and handshake. The wider presentation image has been removed from public and built assets. The original private source is unchanged. The caption does not name an award, date the event, or imply endorsement.

Illustrative cricket photography from Unsplash:

- Cricket ball: https://images.unsplash.com/photo-1531415074968-036ba1b575da
- Cricket stadium: https://images.unsplash.com/photo-1540747913346-19e32dc3e97e

Use is under the [Unsplash licence](https://unsplash.com/license). Images are illustrative and do not depict or imply Sajjad's identity or endorsement.

## Deployment

Deploy **only `dist/`**, not the project root, to a static host after `npm run build`. The build emits both `index.html` and `achievements.html`, each with page-specific metadata. Navigation between pages uses ordinary links; section links on the career page point back to the homepage. No SPA route rewrites are needed. Serve over HTTPS and add platform-appropriate security headers. Google Fonts are loaded externally; replace with locally hosted licensed fonts if a completely self-contained deployment is required.

## Career sources and editorial decisions

The career page is an original factual summary of the history and 12 archive images supplied on 31 October 2026, not a transcription of the publications. Written-history statistics are identified as supplied, not independently audited. The 9,111-run total is dated to the end of 2008; the 12,001-run total is separately attributed to the undated league-record screenshot. Neither is asserted to be today's record. Asterisk notation for unbeaten innings is explained. Club titles are described as team honours; league-wide leadership is not described as national captaincy.

Potentially inconsistent averages in the supplied history are omitted where not necessary. The South Africa invitation anecdote is omitted because it is not needed to establish the coaching background. Private correspondence, private contact details, disciplinary matters, full newspaper/book scans, duplicate screenshots, and pages about other players are not published or copied into `public/`.

The Roll of Honour section uses the 1988/89 season explicitly supplied by the user. The photographed historical list includes Sajjad Ahmed alongside Saleem Malik, Rameez Hasan Raja (displayed as Rameez Raja), Javed Burki and Waseem Hasan Raja (displayed as Wasim Raja). This is shared historical recognition, not a claim that all received the honour in the same year, played together or endorse the coaching business. The institution is not named because the supplied archive does not unambiguously establish it.

**Local source privacy:** Vite is a development server, not a private-document vault. The supplied originals remain in the project root at the user's paths, outside `public/`, and are not included in `dist/`. Vite's file-deny rules block `WhatsApp Image*.jpeg` originals while preserving the default secret-file protections. Keep development bound to loopback (the default command). Move private source documents out of the project before sharing the source folder or exposing a development server.
