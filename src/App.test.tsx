import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { buildEnquiry, buildSmsHref, coachPhone } from './coaching'

describe('coaching website', () => {
  it('does not include third-party sample video embeds or links', () => {
    render(<App />)
    expect(document.querySelector('iframe')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Watch on YouTube' })).not.toBeInTheDocument()
    expect(screen.queryByText(/Sky Sports Cricket/)).not.toBeInTheDocument()
  })

  it('shows the coach credentials, pricing and direct text booking link', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Your game.Your ambition.A new level.')
    expect(screen.getByText('ECB Level 2 qualified')).toBeInTheDocument()
    expect(screen.getByText('Coaching since 2010')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Book by text/ })).toHaveAttribute('href', `sms:${coachPhone}`)
    expect(screen.getByText(/Hero photography is illustrative, not a portrait/)).toBeInTheDocument()
    expect(screen.getAllByText(/£50 per hour/).length).toBeGreaterThan(0)
  })

  it('switches skill content with clicks and keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('tab', { name: 'Bowling' }))
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Line, length & consistency')
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Fielding' })).toHaveFocus()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Catching & reactions')
    await user.keyboard('{Home}')
    expect(screen.getByRole('tab', { name: 'Batting' })).toHaveAttribute('aria-selected', 'true')
  })

  it('opens and closes mobile navigation', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
  })

  it('prefills programme interest and prepares a text without claiming it was sent', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Enquire about Junior development' }))
    expect(screen.getByLabelText('Coaching interest')).toHaveValue('Junior development')
    await user.type(screen.getByLabelText('Your name'), 'Alex Player')
    await user.selectOptions(screen.getByLabelText('Playing level'), 'Developing player')
    await user.type(screen.getByLabelText('What would you like to work on?'), 'Improve batting footwork.')
    await user.click(screen.getByRole('button', { name: 'Prepare booking text' }))
    expect(screen.getByRole('status')).toHaveTextContent('not been sent')
    const draft = screen.getByLabelText<HTMLTextAreaElement>('Your enquiry draft').value
    expect(draft).toContain('Improve batting footwork.')
    expect(screen.getByRole('link', { name: 'Open text message' })).toHaveAttribute('href', buildSmsHref(draft, navigator.userAgent))
    await user.click(screen.getByRole('button', { name: 'Edit enquiry' }))
    expect(screen.getByLabelText('Your name')).toHaveValue('Alex Player')
    expect(screen.getByLabelText('Playing level')).toHaveValue('Developing player')
    expect(screen.getByLabelText('What would you like to work on?')).toHaveValue('Improve batting footwork.')
    await user.click(screen.getByRole('button', { name: 'Close enquiry' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
  })

  it('restores focus to the menu toggle when a mobile-menu booking closes', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    const menu = screen.getByRole('navigation', { name: 'Mobile navigation' })
    await user.click(menu.querySelector('button')!)
    await user.click(screen.getByRole('button', { name: 'Close enquiry' }))
    expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveFocus()
  })

  it('surfaces a download failure instead of claiming success', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Find your next level' }))
    await user.type(screen.getByLabelText('Your name'), 'Alex')
    await user.selectOptions(screen.getByLabelText('Playing level'), 'Club cricketer')
    await user.type(screen.getByLabelText('What would you like to work on?'), 'Timing')
    await user.click(screen.getByRole('button', { name: 'Prepare booking text' }))
    const original = URL.createObjectURL
    URL.createObjectURL = vi.fn(() => { throw new Error('Download unavailable') })
    try {
      await user.click(screen.getByRole('button', { name: 'Download draft' }))
      expect(screen.getByRole('alert')).toHaveTextContent('download could not be started')
    } finally {
      URL.createObjectURL = original
    }
  })

  it('rejects whitespace-only goals', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Find your next level' }))
    await user.type(screen.getByLabelText('Your name'), 'Alex')
    await user.selectOptions(screen.getByLabelText('Playing level'), 'Club cricketer')
    await user.type(screen.getByLabelText('What would you like to work on?'), '   ')
    await user.click(screen.getByRole('button', { name: 'Prepare booking text' }))
    expect(screen.getByRole('alert')).toHaveTextContent('short description of your goals')
  })
})

describe('enquiry helpers', () => {
  it('encodes text messages for iOS and other devices without losing player goals', () => {
    expect(buildSmsHref('Goals & timing?\nNext week', 'iPhone')).toBe(`sms:${coachPhone}&body=Goals%20%26%20timing%3F%0ANext%20week`)
    expect(buildSmsHref('Goals & timing?', 'Android')).toBe(`sms:${coachPhone}?body=Goals%20%26%20timing%3F`)
  })

  it('includes player goals and makes booking status explicit', () => {
    expect(buildEnquiry({ name: ' Alex ', programme: 'Help me choose', level: 'Club cricketer', message: ' Better timing ' }))
      .toBe('Cricket coaching enquiry for Sajjad Ahmad\n\nName: Alex\nCoaching interest: Help me choose\nPlaying level: Club cricketer\n\nGoals / questions:\nBetter timing\n\nThis is an enquiry, not a confirmed booking.')
  })
})
