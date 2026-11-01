import { ArrowDown, ArrowLeft, ArrowUpRight, Medal, ShieldCheck, Trophy } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { coachPhone, coachPhoneDisplay } from './coaching'
import './career.css'

const milestones = [
  { period: '1985–1988', title: 'First-class foundations in Pakistan.', text: 'Representing Rawalpindi across the 1985–86 to 1987–88 seasons, Sajjad played seven first-class matches. His record includes 178 runs and an unbeaten 55 against Lahore City at Pindi Club in the 1987–88 Quaid-e-Azam Trophy. He also appeared in the national one-day competition for Railways and Rawalpindi.', tag: 'RAWALPINDI · FIRST-CLASS CRICKET' },
  { period: '1987–1988', title: 'Taking his game overseas.', text: 'Tours with Rawalpindi District Cricket Association took Sajjad to the Netherlands and England in 1987, including a half-century at Schiedam. A P&T Gymkhana tour to England followed in 1988, the year he first played for Old Thorntonians and helped the club win Surrey Cricket League Division Two.', tag: 'PAKISTAN → THE NETHERLANDS → ENGLAND' },
  { period: '1992–1995', title: 'Making his mark in Lancashire.', text: 'Professional cricket at Oldham in the Central Lancashire League brought a reported 972-run summer. The supplied history records 1,081 runs in 1993, followed by two standout all-round seasons at Moorside: 1,471 runs and 80 wickets in 1994, then 1,200 runs and 69 wickets in 1995.', tag: 'OLDHAM · MOORSIDE' },
  { period: '1996–2008', title: 'Leading from the middle.', text: 'Sajjad led Surrey Cricket League in 1996 and captained Old Thorntonians for the 1997 and 2003 seasons, then again from 2005 to 2008. The club won Division One in 2006 during that captaincy period. His 1997 bowling season brought 43 wickets at a reported average of 10.53.', tag: 'CAPTAINCY · ALL-ROUND CONTRIBUTIONS' },
  { period: '2001–2008', title: 'Runs that left a legacy.', text: 'An unbeaten 221 against Wandgas in 2001 stands among his signature innings. He led the league run-scoring that year with 703 runs and was named Batsman of the Year in 2003 after scoring 836. By the end of 2008, the supplied history records 9,111 league runs and a batting average above 50.', tag: 'OLD THORNTONIANS · SURREY CRICKET LEAGUE' },
  { period: '2010 onwards', title: 'Experience, passed on.', text: 'An ECB Level 2 coach, Sajjad has coached since 2010 at Spencer and Esher cricket clubs and AJ Coaching Cricket Academy. The understanding developed through batting, seam bowling, captaincy and years of competitive cricket now informs his work with players of all levels.', tag: 'BATTING · BOWLING · FIELDING' },
]

const innings = [
  { runs: '221*', opponent: 'Wandgas', year: '2001' },
  { runs: '203*', opponent: 'Putney', year: '1993' },
  { runs: '180*', opponent: 'Redhill', year: '1988' },
  { runs: '147*', opponent: 'BCCI', year: '1990' },
]

export default function CareerPage({ onEnquire }: { onEnquire: () => void }) {
  const reducedMotion = useReducedMotion()
  return <main id="main" tabIndex={-1} className="career-page">
    <section id="career" className="career-hero section-shell">
      <div className="career-hero-copy">
        <a href="/#home" className="career-back"><ArrowLeft size={15} /> Back to coaching</a>
        <span className="eyebrow"><span /> THE EXPERIENCE BEHIND THE COACH</span>
        <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.5 }}>A life in cricket.<br /><span>A legacy to share.</span></motion.h1>
        <p>From first-class cricket in Pakistan to standout seasons in Lancashire and Surrey. Meet the player, captain and coach behind your next session.</p>
        <div className="career-hero-actions"><a href="#career-timeline" className="button button-orange">Explore his journey <ArrowDown size={17} /></a><button className="text-button" onClick={onEnquire}>Train with Sajjad <ArrowUpRight size={18} /></button></div>
        <div className="career-profile"><span><ShieldCheck size={17} /> ECB Level 2</span><span>Right-hand bat</span><span>Right-arm fast-medium</span></div>
      </div>
      <figure className="career-portrait">
        <img src="/images/sajjad-archive-portrait.jpg" alt="Historical portrait of Sajjad Ahmad from his personal cricket archive" width={320} height={650} fetchPriority="high" />
        <figcaption><span>FROM THE PERSONAL ARCHIVE</span>Sajjad Ahmad. A life in cricket.<small>Cropped historical portrait supplied for this website. Date unconfirmed.</small></figcaption>
      </figure>
    </section>

    <section className="career-stats section-shell" aria-labelledby="career-highlights">
      <h2 id="career-highlights" className="visually-hidden">Career highlights</h2>
      <div><strong>7</strong><span>First-class appearances</span><small>Rawalpindi · 1985–86 to 1987–88</small></div>
      <div><strong>1,471</strong><span>Runs in a standout season</span><small>Moorside · 1994</small></div>
      <div><strong>80</strong><span>Wickets in the same season</span><small>Moorside · 1994</small></div>
      <div><strong>12,001</strong><span>League runs in the archive</span><small>SCL records screenshot · undated</small></div>
    </section>

    <section className="career-intro section-shell section-space">
      <div><span className="eyebrow"><span /> ROOTED IN THE GAME</span><h2>More than a scorecard.<br /><em>A depth of experience.</em></h2></div>
      <div><p>Born in Joharabad, Punjab, Pakistan, on 2 November 1968, Sajjad built his game as a right-handed middle-order batsman and right-arm fast-medium bowler. His career crossed countries, competitions and roles, bringing together the perspective of an all-rounder and the responsibility of a captain.</p><p>The story here is drawn from the career history and personal archive supplied for this website. Historical sources also use the spelling <strong>Sajjad Ahmed</strong>; the website uses <strong>Sajjad Ahmad</strong>.</p></div>
    </section>

    <section id="career-timeline" className="career-timeline-section">
      <div className="section-shell section-space">
        <div className="section-heading"><div><span className="eyebrow"><span /> THE JOURNEY, CHAPTER BY CHAPTER</span><h2>Different grounds.<br /><em>The same commitment.</em></h2></div><p>A career shaped by competition,<br />leadership and a love of the game.</p></div>
        <ol className="career-timeline">{milestones.map(item => <li key={item.period}><span className="timeline-period">{item.period}</span><div><span className="timeline-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol>
      </div>
    </section>

    <section className="career-performance section-shell section-space" aria-labelledby="performance-heading">
      <div className="section-heading"><div><span className="eyebrow"><span /> AN ALL-ROUNDER IN EVERY SENSE</span><h2 id="performance-heading">The summer of <em>1994.</em></h2></div><p>Moorside CC · Saddleworth & District Cricket League<br />Season figures from the supplied career history.</p></div>
      <div className="performance-panel">
        <div><Trophy size={28} strokeWidth={1.3} /><h3>A season with bat and ball.</h3><p>Seven centuries. Eighty wickets. A year that illustrates the range of Sajjad’s contribution, not just his ability in one discipline.</p></div>
        <dl><div><dt>Runs</dt><dd>1,471</dd></div><div><dt>Batting average</dt><dd>61.30</dd></div><div><dt>Centuries</dt><dd>7</dd></div><div><dt>Wickets</dt><dd>80</dd></div><div><dt>Bowling average</dt><dd>14.50</dd></div><div><dt>Best bowling</dt><dd>9/65</dd></div></dl>
      </div>
      <div className="career-innings-heading"><h3>Innings to remember.</h3><p>Selected unbeaten scores from the supplied Surrey history. <strong>*</strong> denotes not out.</p></div>
      <div className="career-innings">{innings.map(item => <div key={item.runs}><strong>{item.runs}</strong><span>vs {item.opponent}</span><small>{item.year}</small></div>)}</div>
      <p className="career-small-note">These are historical personal highlights, not a claim to hold the current highest-innings record.</p>
    </section>

    <section className="career-roll-of-honour section-shell section-space" aria-labelledby="roll-of-honour-heading">
      <div className="section-heading"><div><span className="eyebrow"><span /> RECOGNITION IN DISTINGUISHED COMPANY</span><h2 id="roll-of-honour-heading">Roll of Honour.<br /><em>1988/89 season.</em></h2></div><Medal size={48} strokeWidth={1.2} aria-hidden="true" /></div>
      <p className="honour-intro">Sajjad received Roll of Honour recognition in the 1988/89 season. His name appears in a historical list that also includes some of Pakistan’s distinguished former cricketers.</p>
      <ul className="honour-names" aria-label="Former Pakistan cricketers also listed on the Roll of Honour">
        <li>Saleem Malik</li><li>Rameez Raja</li><li>Javed Burki</li><li>Wasim Raja</li>
      </ul>
      <p className="career-small-note">The photographed Roll of Honour lists Sajjad as “Sajjad Ahmed”. The 1988/89 season is confirmed in the supplied biographical details. These names appear on the same historical list, not necessarily in the same season; their inclusion does not imply endorsement of Sajjad’s coaching.</p>
    </section>

    <section className="career-legacy-section">
      <div className="career-legacy section-shell section-space">
        <div><span className="eyebrow"><span /> PART OF SOMETHING BIGGER</span><h2>A club legacy.<br /><em>A captain’s perspective.</em></h2><p>Old Thorntonians’ history provides the team context for Sajjad’s individual achievements. Titles are club honours, not individual awards.</p></div>
        <div className="career-honours">
          <article><Trophy size={22} /><div><h3>Seven knockout cup wins</h3><p>The supplied history credits Sajjad with helping Old Thorntonians to cup wins in 1988, 1989, 1990, 1991, 2000, 2001 and 2003.</p></div></article>
          <article><Medal size={22} /><div><h3>A sustained league presence</h3><p>The club’s reported Division One titles include 1991, 1995, 1997, 2005 and 2006, followed by five consecutive Premier Division titles from 2011 to 2015.</p></div></article>
          <article><ShieldCheck size={22} /><div><h3>Leadership on the field</h3><p>Club captain in 1997, 2003 and 2005–08, with a Division One title in 2006. That experience adds a team-focused dimension to Sajjad’s coaching.</p></div></article>
        </div>
      </div>
    </section>

    <section id="career-sources" className="career-sources section-shell section-space">
      <span className="eyebrow"><span /> THE RECORD, IN CONTEXT</span><h2>Remembered.<br /><em>And carefully represented.</em></h2>
      <div className="career-source-grid">
        <article><span className="source-index">01 / CAREER HISTORY</span><h3>A snapshot through 2008.</h3><p>The supplied written history records 9,111 Surrey Cricket League runs by the end of 2008, with a batting average above 50. Season totals, first-class figures, captaincy years and cup results on this page are summarised from that history; they have not been independently audited.</p></article>
        <article><span className="source-index">02 / LEAGUE RECORDS SCREENSHOT</span><h3>A later archive total.</h3><p>A supplied screenshot of surreycricketleague.co.uk lists “Sajjad Ahmed, Old Thorntonians” beside 12,001 under “Most Runs in Competition”. The capture date is unknown. This is an archived listing, not a verified current record or an additional 12,001 runs on top of the 2008 total.</p></article>
        <article><span className="source-index">03 / PERSONAL ARCHIVE</span><h3>Recognition beyond the numbers.</h3><p>The supplied newspaper clippings document a 172-run innings for Moorside, a seven-wicket return for eight runs in June 1994, and an unbeaten 147 for Old Thorntonians. A photographed college roll of honour also lists Sajjad Ahmed. These are factual summaries, not reproductions of the publications.</p></article>
      </div>
      <p className="career-source-note">Private correspondence, unrelated personal details and full publication scans are not displayed. The archive photograph is published with permission confirmed by the website owner; it does not imply endorsement by anyone pictured. Record totals are historical, and no claim is made about current league rankings.</p>
    </section>

    <section className="cta-section section-shell">
      <div className="cta-inner"><div className="cta-decoration" aria-hidden="true"><span /><span /><span /></div><span className="eyebrow">EXPERIENCE, PUT TO WORK FOR YOU.</span><h2>The next story<br />could be <em>your own.</em></h2><p>Batting, bowling and fielding. All levels. £50 per hour.</p><button className="button button-cream" onClick={onEnquire}>Train with Sajjad <ArrowUpRight size={20} /></button><a className="cta-phone" href={`sms:${coachPhone}`}>Text {coachPhoneDisplay}</a><span className="cta-footnote">Sessions arranged by text and confirmed directly.</span></div>
    </section>
  </main>
}
