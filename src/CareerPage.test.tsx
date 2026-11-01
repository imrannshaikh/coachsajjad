import { afterEach, describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

afterEach(() => window.history.replaceState(null, '', '/'))

function renderCareer() {
  window.history.replaceState(null, '', '/achievements.html')
  return render(<App />)
}

describe('career and achievements page', () => {
  it('shows the 1988/89 Roll of Honour with distinguished historical recipients and context', () => {
    renderCareer()
    const section = screen.getByRole('region', { name: 'Roll of Honour. 1988/89 season.' })
    expect(within(section).getByText(/received Roll of Honour recognition in the 1988\/89 season/)).toBeInTheDocument()
    for (const name of ['Saleem Malik', 'Rameez Raja', 'Javed Burki', 'Wasim Raja']) {
      expect(within(section).getByText(name)).toBeInTheDocument()
    }
    expect(within(section).getByText(/not necessarily in the same season/)).toBeInTheDocument()
    expect(within(section).getByText(/does not imply endorsement/)).toBeInTheDocument()
  })

  it('has a dedicated page and date-qualified historical statistics', () => {
    renderCareer()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A life in cricket.A legacy to share.')
    expect(screen.queryByText('Your game.')).not.toBeInTheDocument()
    expect(screen.getByText('12,001')).toBeInTheDocument()
    expect(screen.getByText('SCL records screenshot · undated')).toBeInTheDocument()
    expect(screen.getByText(/9,111 Surrey Cricket League runs by the end of 2008/)).toBeInTheDocument()
    expect(screen.getByText(/not a verified current record/)).toBeInTheDocument()
    expect(screen.getByText(/not individual awards/)).toBeInTheDocument()
    expect(screen.getByText(/denotes not out/)).toBeInTheDocument()
    expect(screen.getByText('221*')).toBeInTheDocument()
  })

  it('links back to valid homepage sections and marks the active navigation page', () => {
    renderCareer()
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(within(nav).getByRole('link', { name: 'Achievements' })).toHaveAttribute('aria-current', 'page')
    expect(within(nav).getByRole('link', { name: 'The coach' })).toHaveAttribute('href', '/#about')
    expect(within(nav).getByRole('link', { name: 'Coaching' })).toHaveAttribute('href', '/#coaching')
    expect(screen.getByRole('link', { name: 'BACK TO TOP' })).toHaveAttribute('href', '#career')
    expect(screen.getAllByRole('link', { name: 'Sajjad Ahmad home' })[0]).toHaveAttribute('href', '/#home')
  })

  it('publishes only the cleared archive photograph, not private source images', () => {
    renderCareer()
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/sajjad-archive-portrait.jpg')
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Historical portrait of Sajjad Ahmad from his personal cricket archive')
    expect(screen.getByText(/Date unconfirmed/)).toBeInTheDocument()
    expect(screen.getByText(/does not imply endorsement by anyone pictured/)).toBeInTheDocument()
    expect(document.querySelectorAll('img')).toHaveLength(1)
    expect(document.body.innerHTML).not.toContain('WhatsApp Image')
    expect(document.body.innerHTML).not.toContain('sajjad-presentation.jpg')
  })

  it('supports shared booking and mobile navigation from the career page', async () => {
    const user = userEvent.setup()
    renderCareer()
    await user.click(screen.getAllByRole('button', { name: 'Train with Sajjad' })[0])
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('£50 per hour · Book by text')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Close enquiry' }))
    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    const nav = screen.getByRole('navigation', { name: 'Mobile navigation' })
    expect(within(nav).getByRole('link', { name: 'Coaching' })).toHaveAttribute('href', '/#coaching')
    expect(within(nav).getByRole('link', { name: 'Achievements' })).toHaveAttribute('aria-current', 'page')
  })

  it('makes the career page discoverable from the homepage', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Discover Sajjad’s career & achievements' })).toHaveAttribute('href', '/achievements.html')
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(within(nav).getByRole('link', { name: 'Achievements' })).toHaveAttribute('href', '/achievements.html')
  })
})
