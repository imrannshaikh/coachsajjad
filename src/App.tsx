import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Crosshair, Download, MapPin, Menu, MessageCircle, MoveUpRight, ShieldCheck, Target, X,
} from 'lucide-react'
import { buildEnquiry, buildSmsHref, coachPhone, coachPhoneDisplay, programmes, type Enquiry } from './coaching'
import CareerPage from './CareerPage'

const navigation = [
  { title: 'The coach', href: '#about' },
  { title: 'Achievements', href: '/achievements.html' },
  { title: 'Coaching', href: '#coaching' },
  { title: 'The approach', href: '#approach' },
  { title: 'FAQs', href: '#faqs' },
]

const disciplines = [
  { name: 'Batting', heading: 'Play your shot. Back yourself.', text: 'From a balanced setup to confident shot selection. Build a technique that feels natural and stands up when it matters.', points: ['Footwork & balance', 'Timing & shot selection', 'Playing pace & spin'], icon: Target },
  { name: 'Bowling', heading: 'Find your rhythm. Make an impact.', text: 'Bring purpose to every delivery. Explore a repeatable action, control your line and length, and think one ball ahead.', points: ['Action & alignment', 'Line, length & consistency', 'Variations & match plans'], icon: Crosshair },
  { name: 'Fielding', heading: 'Make every chance count.', text: 'Turn the small moments into your biggest contribution. Work on movement, clean hands, and the confidence to commit.', points: ['Catching & reactions', 'Ground fielding', 'Throwing & positioning'], icon: ShieldCheck },
]

const faqs = [
  { question: 'Is coaching right for my playing level?', answer: 'Sajjad offers batting, bowling and fielding coaching for all levels, from first-time players to experienced club cricketers. Share your experience and goals by text so he can tailor the session to your game.' },
  { question: 'Where will the sessions take place?', answer: 'Sajjad has coached at Spencer and Esher cricket clubs and AJ Coaching Cricket Academy. Confirm your session venue, facility availability and any travel arrangements directly with him before attending. Previous coaching experience does not mean those venues are automatically available for your booking.' },
  { question: 'Can I enquire on behalf of my child?', answer: 'Yes. Please use your own name as the parent or guardian, choose Junior development, and describe the playing level. There is no need to include your child’s full name or other sensitive information. Confirm age suitability and safeguarding arrangements directly with Sajjad.' },
  { question: 'What does coaching cost, and how do I book?', answer: `Coaching is £50 per hour. Book by texting Sajjad on ${coachPhoneDisplay}. You can prepare a message using this site, then review and send it in your messaging app. Session duration, venue, payment arrangements and cancellation terms are confirmed directly with Sajjad. Your session is only booked once he confirms it.` },
  { question: 'What should I bring to a session?', answer: 'Confirm the equipment requirements with Sajjad when arranging your session. Ask about suitable clothing, your own cricket kit, protective equipment, and whether any equipment can be provided.' },
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion()
  return <motion.div className={className} initial={reducedMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.55, delay }}>{children}</motion.div>
}

function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="/#home" aria-label="Sajjad Ahmad home">
    <span className="brand-mark" aria-hidden="true"><span>S</span><i /></span>
    <span className="brand-name">SAJJAD AHMAD<span>CRICKET COACHING</span></span>
  </a>
}

function EnquiryDialog({ interest, onClose }: { interest: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const draftRef = useRef<HTMLTextAreaElement>(null)
  const [draft, setDraft] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [programme, setProgramme] = useState(interest)
  const [enquiryData, setEnquiryData] = useState<Enquiry | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (draft) draftRef.current?.focus()
  }, [draft])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const enquiry: Enquiry = {
      name: String(data.get('name') ?? ''),
      programme,
      level: String(data.get('level') ?? ''),
      message: String(data.get('message') ?? ''),
    }
    if (!enquiry.name.trim() || !enquiry.message.trim()) {
      setError('Please enter your name and a short description of your goals.')
      return
    }
    setError(null)
    setEnquiryData(enquiry)
    setDraft(buildEnquiry(enquiry))
  }

  function downloadDraft() {
    if (!draft) return
    try {
      const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }))
      const link = document.createElement('a')
      link.href = url
      link.download = 'sajjad-ahmad-coaching-enquiry.txt'
      document.body.append(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      setError(null)
    } catch {
      setError('The download could not be started. Select and copy your enquiry text below instead.')
    }
  }

  return <dialog ref={dialogRef} className="enquiry-dialog" aria-labelledby="enquiry-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="dialog-inner">
      <button className="icon-button dialog-close" aria-label="Close enquiry" onClick={onClose}><X size={22} /></button>
      <span className="eyebrow"><span /> YOUR NEXT CHAPTER</span>
      <h2 id="enquiry-title">{draft ? 'Your enquiry, ready.' : 'Let’s talk cricket.'}</h2>
      {!draft ? <>
        <p className="dialog-intro">Tell Sajjad a little about your game and where you want to take it.</p>
        <div className="booking-notice"><MessageCircle size={20} /><div><strong>£50 per hour · Book by text</strong><a href={`sms:${coachPhone}`}>{coachPhoneDisplay}</a><span>Prepare a message below, or text Sajjad directly.</span></div></div>
        <form onSubmit={submit}>
          <label>Your name<input name="name" autoComplete="name" required maxLength={100} defaultValue={enquiryData?.name ?? ''} placeholder="Player or parent / guardian" /></label>
          <div className="form-row">
            <label>Coaching interest<select name="programme" value={programme} onChange={e => setProgramme(e.target.value)}>{programmes.map(item => <option key={item.id}>{item.name}</option>)}<option>Help me choose</option></select></label>
            <label>Playing level<select name="level" required defaultValue={enquiryData?.level ?? ''}><option value="" disabled>Select your level</option><option>New to cricket</option><option>Developing player</option><option>Club cricketer</option><option>Competitive / performance</option></select></label>
          </div>
          <label>What would you like to work on?<textarea name="message" rows={3} required maxLength={2000} defaultValue={enquiryData?.message ?? ''} placeholder="Your goals, coaching questions, and general availability..." /></label>
          <p className="form-privacy">Please don’t include medical information or a child’s identifying details. Nothing is sent from this site. You’ll review and send the message in your own messaging app.</p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-orange form-submit" type="submit">Prepare booking text <ArrowUpRight size={19} /></button>
        </form>
      </> : <>
        <p className="dialog-intro" role="status">Your draft is ready. It has <strong>not been sent</strong>, and no session is booked.</p>
        <textarea ref={draftRef} className="draft-text" aria-label="Your enquiry draft" value={draft} readOnly rows={10} />
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="draft-actions">
          <a className="button button-orange" href={buildSmsHref(draft, navigator.userAgent)}>Open text message <MessageCircle size={18} /></a>
          <button className="button button-outline" onClick={downloadDraft}>Download draft <Download size={18} /></button>
          <button className="text-button" onClick={() => { setError(null); setDraft(null) }}>Edit enquiry</button>
        </div>
        <p className="form-privacy">Review and send in your messaging app. If your device doesn’t support text links, copy this draft and text {coachPhoneDisplay}, or download it for later. Opening the app does not send automatically. Sajjad will confirm your booking directly.</p>
      </>}
    </div>
  </dialog>
}

export default function App() {
  const isCareerPage = window.location.pathname === '/achievements.html'
  const pageNavigation = navigation.map(item => ({
    ...item,
    href: isCareerPage && item.href.startsWith('#') ? `/${item.href}` : item.href,
  }))
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDiscipline, setActiveDiscipline] = useState(0)
  const [enquiryInterest, setEnquiryInterest] = useState<string | null>(null)
  const enquiryTrigger = useRef<HTMLElement | null>(null)
  const navigationToggle = useRef<HTMLButtonElement>(null)
  const discipline = disciplines[activeDiscipline]
  const DisciplineIcon = discipline.icon

  function enquire(interest = 'Help me choose') {
    enquiryTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setMenuOpen(false)
    setEnquiryInterest(interest)
  }

  useEffect(() => {
    if (enquiryInterest === null && enquiryTrigger.current) {
      const target = enquiryTrigger.current.isConnected ? enquiryTrigger.current : navigationToggle.current
      target?.focus({ preventScroll: true })
      enquiryTrigger.current = null
    }
  }, [enquiryInterest])

  useEffect(() => {
    if (!menuOpen) return
    function escape(event: KeyboardEvent) { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [menuOpen])

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">{pageNavigation.map(item => <a key={item.href} href={item.href} aria-current={isCareerPage && item.title === 'Achievements' ? 'page' : undefined}>{item.title}</a>)}</nav>
        <button className="button button-ink header-cta" onClick={() => enquire()}>Book a session <ArrowUpRight size={17} /></button>
        <button ref={navigationToggle} className="icon-button mobile-menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{pageNavigation.map(item => <a key={item.href} href={item.href} aria-current={isCareerPage && item.title === 'Achievements' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{item.title}<ArrowUpRight size={18} /></a>)}<button className="button button-orange" onClick={() => enquire()}>Book a session <ArrowUpRight size={18} /></button></nav>}
    </header>

    {isCareerPage ? <CareerPage onEnquire={() => enquire()} /> : <main id="main" tabIndex={-1}>
      <section id="home" className="hero section-shell">
        <div className="hero-copy">
          <Reveal><span className="eyebrow"><span /> NOT JUST PRACTICE. PROGRESS.</span></Reveal>
          <Reveal delay={0.08}><h1>Your game.<br />Your ambition.<br /><span>A new level.</span></h1></Reveal>
          <Reveal delay={0.16}><p className="hero-description">Cricket coaching built around you.<br className="desktop-break" /> With Sajjad Ahmad, make every session a step<br className="desktop-break" /> towards the player you want to be.</p></Reveal>
          <Reveal delay={0.24} className="hero-actions"><button className="button button-orange" onClick={() => enquire()}>Find your next level <ArrowUpRight size={20} /></button><a className="hero-secondary" href="#coaching">Explore coaching <ArrowDown size={17} /></a></Reveal>
          <Reveal delay={0.3} className="hero-note"><span className="tiny-ball" aria-hidden="true" /><span>All levels welcome <span className="note-divider">/</span> £50 per hour</span></Reveal>
        </div>
        <Reveal className="hero-visual" delay={0.15}>
          <img className="hero-image" src="/images/cricket-hero.jpg" alt="A red leather cricket ball resting on lush green grass" fetchPriority="high" width={1200} height={803} />
          <div className="image-shade" />
          <div className="hero-image-top"><span className="image-label"><span /> THE GAME STARTS WITH YOU</span><span className="image-corner" aria-hidden="true"><MoveUpRight size={27} strokeWidth={1.2} /></span></div>
          <div className="hero-image-bottom"><span className="image-small-label">THE SAJJAD AHMAD APPROACH</span><p>Better habits.<br />Bigger possibilities.</p><span className="image-bottom-line" /></div>
          <div className="floating-note"><span className="floating-icon"><Target size={25} strokeWidth={1.4} /></span><span>One player. One focus.<strong>You.</strong></span></div>
          <span className="image-index" aria-hidden="true">01 / THE AMBITION</span>
        </Reveal>
        <a href="#coaching" className="scroll-cue"><span>SCROLL TO DISCOVER</span><ArrowDown size={16} /></a>
      </section>

      <div className="values-strip">
        <div className="section-shell values-inner"><span>EXPERIENCE THAT MAKES A DIFFERENCE.</span><span><ShieldCheck size={19} /> ECB Level 2 qualified</span><span><Target size={19} /> Former first-class cricketer</span><span><Crosshair size={19} /> Coaching since 2010</span></div>
      </div>

      <section id="coaching" className="coaching-section section-shell section-space">
        <Reveal className="section-heading"><div><span className="eyebrow"><span /> FIND YOUR FOCUS</span><h2>Different journeys.<br />The same <em>dedication.</em></h2></div><p>Just starting out or ready to push further?<br />Let’s find the coaching that meets you<br className="desktop-break" /> where you are, and takes you forward.</p></Reveal>
        <div className="programme-grid">{programmes.map((programme, index) => <Reveal key={programme.id} delay={index * 0.08} className={`programme-card programme-${programme.id}`}>
          <div className="programme-top"><span className="programme-number">{programme.number}</span><button className="card-arrow" onClick={() => enquire(programme.name)} aria-label={`Enquire about ${programme.name}`}><ArrowUpRight size={23} /></button></div>
          <div className="programme-art" aria-hidden="true">{index === 0 ? <Target size={48} strokeWidth={1.5} /> : index === 1 ? <ShieldCheck size={48} strokeWidth={1.5} /> : <Crosshair size={48} strokeWidth={1.5} />}</div>
          <span className="card-eyebrow">{programme.category}</span><h3>{programme.name}</h3><p>{programme.description}</p><div className="programme-footer"><span>{programme.detail}</span><button className="text-button" onClick={() => enquire(programme.name)}>Explore <ArrowRight size={16} /></button></div>
        </Reveal>)}</div>
        <div className="coaching-price"><p><strong>£50<span> / hour</span></strong>Personal coaching. All playing levels.</p><a href={`sms:${coachPhone}`}>Book by text <span>{coachPhoneDisplay}</span><ArrowUpRight size={19} /></a></div>
      </section>

      <section className="skills-section">
        <div className="skills-inner section-shell">
          <Reveal className="skills-heading"><span className="eyebrow"><span /> THE DETAILS MAKE THE DIFFERENCE</span><h2>A stronger game.<br />Ball by ball.</h2><p>Small refinements. Meaningful progress.<br />Give every part of your game the attention it deserves.</p></Reveal>
          <Reveal className="skills-content">
            <div className="skill-tabs" role="tablist" aria-label="Cricket disciplines">{disciplines.map((item, index) => <button key={item.name} id={`tab-${index}`} role="tab" aria-selected={index === activeDiscipline} aria-controls="discipline-panel" tabIndex={index === activeDiscipline ? 0 : -1} onClick={() => setActiveDiscipline(index)} onKeyDown={event => {
              let next: number | undefined
              if (event.key === 'ArrowRight') next = (index + 1) % disciplines.length
              if (event.key === 'ArrowLeft') next = (index + disciplines.length - 1) % disciplines.length
              if (event.key === 'Home') next = 0
              if (event.key === 'End') next = disciplines.length - 1
              if (next !== undefined) { event.preventDefault(); setActiveDiscipline(next); document.getElementById(`tab-${next}`)?.focus() }
            }}>{item.name}<ArrowUpRight size={16} /></button>)}</div>
            <div id="discipline-panel" role="tabpanel" aria-labelledby={`tab-${activeDiscipline}`} tabIndex={0}>
              <div className="skill-title"><DisciplineIcon size={29} strokeWidth={1.3} /><h3>{discipline.heading}</h3></div>
              <p>{discipline.text}</p><ul>{discipline.points.map(point => <li key={point}><Check size={15} />{point}</li>)}</ul>
              <button className="text-button" onClick={() => enquire('One-to-one coaching')}>Work on your {discipline.name.toLowerCase()} <ArrowRight size={17} /></button>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="about" className="about-section section-shell section-space">
        <Reveal className="about-visual">
          <img src="/images/sajjad-archive-portrait.jpg" alt="Historical portrait of Sajjad Ahmad from his personal cricket archive" width={320} height={650} loading="lazy" />
          <span className="about-image-caption">SAJJAD AHMAD / FROM THE PERSONAL ARCHIVE</span>
        </Reveal>
        <Reveal className="about-copy">
          <span className="eyebrow"><span /> YOUR COACH. IN YOUR CORNER.</span><h2>Sajjad Ahmad.<br />Cricket, with<br /><em>a personal touch.</em></h2>
          <p className="about-lead">A first-class playing background.<br />A player-first coaching mindset.</p>
          <p>A former first-class cricketer in Pakistan and professional for Oldham in the Central Lancashire League, Sajjad brings real experience of the game to every session.</p>
          <p>An ECB Level 2 coach, he has been coaching since 2010, working with players at Spencer and Esher cricket clubs and AJ Coaching Cricket Academy. His sessions combine technical precision, tactical thinking and the confidence to perform.</p>
          <div className="coach-specialisms"><span>Batting</span><span>Fast bowling</span><span>Fielding</span></div>
          <div className="about-location"><MapPin size={19} /><span>Surrey & surrounding areas<span>Session venues confirmed on enquiry</span></span></div>
          <button className="text-button about-link" onClick={() => enquire()}>Start a conversation <ArrowUpRight size={19} /></button>
          <a href="/achievements.html" className="text-button about-career-link">Discover Sajjad’s career & achievements <ArrowUpRight size={19} /></a>
          <p className="bio-placeholder">Batting, bowling & fielding coaching for all levels.</p>
        </Reveal>
      </section>

      <section id="approach" className="approach-section">
        <div className="section-shell section-space">
          <Reveal className="section-heading"><div><span className="eyebrow"><span /> INTENTION IN EVERY SESSION</span><h2>Not a one-size-fits-all plan.<br /><em>A way forward for you.</em></h2></div><span className="approach-heading-icon" aria-hidden="true"><ArrowDownRight size={64} strokeWidth={1} /></span></Reveal>
          <div className="process-grid">
            {[
              ['01', 'Understand your game.', 'Start with a conversation. Your experience, your strengths, your goals. Good coaching begins with listening.'],
              ['02', 'Train with intention.', 'Give practice a clear purpose. Work on the details that matter to your game, with feedback you can actually use.'],
              ['03', 'Take it to the middle.', 'Build habits that travel with you. Reflect, adapt, and bring a more confident mindset to your next innings.'],
            ].map(([number, title, description], index) => <Reveal className="process-step" key={number} delay={index * 0.08}><span className="process-number">{number}<span /></span><h3>{title}</h3><p>{description}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section id="faqs" className="faq-section section-shell section-space">
        <Reveal className="faq-heading"><span className="eyebrow"><span /> GOOD QUESTIONS. CLEAR ANSWERS.</span><h2>Before you<br /><em>take guard.</em></h2><p>A few things you might want to know<br />before starting your coaching journey.</p><button className="text-button" onClick={() => enquire()}>Have another question? <ArrowUpRight size={17} /></button></Reveal>
        <Reveal className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span className="faq-number">0{index + 1}</span><span>{faq.question}</span><ChevronDown size={18} /></summary><p>{faq.answer}</p></details>)}</Reveal>
      </section>

      <section className="cta-section section-shell">
        <Reveal className="cta-inner"><div className="cta-decoration" aria-hidden="true"><span /><span /><span /></div><span className="eyebrow">THE NEXT MOVE IS YOURS.</span><h2>Your next chapter<br />starts with <em>one conversation.</em></h2><p>Batting. Bowling. Fielding. All levels. £50 per hour.</p><button className="button button-cream" onClick={() => enquire()}>Book your session <ArrowUpRight size={20} /></button><a className="cta-phone" href={`sms:${coachPhone}`}><MessageCircle size={14} /> Text {coachPhoneDisplay}</a><span className="cta-footnote">Your game. Your goals. Sajjad in your corner.</span></Reveal>
      </section>
    </main>}

    <footer className="footer section-shell">
      <div className="footer-top"><Brand /><p>For the love of the game.<br /><span>For the player you can become.</span></p><a className="back-top" href={isCareerPage ? '#career' : '#home'}>BACK TO TOP <ArrowUpRight size={18} /></a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Sajjad Ahmad Cricket Coaching</span><nav aria-label="Footer navigation"><a href={isCareerPage ? '/#coaching' : '#coaching'}>Coaching</a><a href={isCareerPage ? '/#about' : '#about'}>The coach</a><a href="/achievements.html">Achievements</a><button onClick={() => enquire()}>Enquire <ArrowUpRight size={13} /></button></nav><span>CRAFTED WITH PURPOSE.</span></div>
      <div className="preview-footer"><span className="preview-dot" /> A PERSONAL APPROACH TO CRICKET <span>{isCareerPage ? 'Historical photograph from the personal archive, used with permission.' : 'Hero photography is illustrative, not a portrait of Sajjad. His historical portrait is used with permission.'} Bookings are arranged by text and confirmed directly. No personal details are stored by this site.</span></div>
    </footer>
    {enquiryInterest !== null && <EnquiryDialog interest={enquiryInterest} onClose={() => setEnquiryInterest(null)} />}
  </>
}
