export const programmes = [
  {
    id: 'individual',
    name: 'One-to-one coaching',
    category: 'YOUR GAME. YOUR SESSION.',
    description: 'Dedicated time to work on what matters to you. Refine your technique, understand your game, and build real confidence.',
    detail: 'Personal attention · All playing levels',
    number: '01',
  },
  {
    id: 'junior',
    name: 'Junior development',
    category: 'BIG DREAMS. STRONG FOUNDATIONS.',
    description: 'A positive start to a lifelong love of cricket. Develop the fundamentals, learn to make decisions, and enjoy the game.',
    detail: 'Young players · Enquire as a parent',
    number: '02',
  },
  {
    id: 'performance',
    name: 'Performance coaching',
    category: 'TURN POTENTIAL INTO PROGRESS.',
    description: 'Purposeful practice for ambitious players. Explore your strengths, work through challenges, and prepare for match day.',
    detail: 'Club players · Goal-led development',
    number: '03',
  },
] as const

export type ProgrammeName = (typeof programmes)[number]['name']

export type Enquiry = {
  name: string
  programme: string
  level: string
  message: string
}

export function buildEnquiry(enquiry: Enquiry): string {
  return [
    'Cricket coaching enquiry for Sajjad Ahmad',
    '',
    `Name: ${enquiry.name.trim()}`,
    `Coaching interest: ${enquiry.programme}`,
    `Playing level: ${enquiry.level}`,
    '',
    'Goals / questions:',
    enquiry.message.trim(),
    '',
    'This is an enquiry, not a confirmed booking.',
  ].join('\n')
}

export const coachPhone = '+447720704495'
export const coachPhoneDisplay = '+44 7720 704495'

export function buildSmsHref(body: string, userAgent: string): string {
  const separator = /iPad|iPhone|iPod/i.test(userAgent) ? '&' : '?'
  return `sms:${coachPhone}${separator}body=${encodeURIComponent(body)}`
}
