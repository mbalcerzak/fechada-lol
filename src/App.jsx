import Hero from './components/Hero'
import YearCalendar from './components/YearCalendar'
import Summary from './components/Summary'
import entries from './data/entries.json'
import './App.css'

const CALENDAR_YEAR = 2026

export default function App() {
  return (
    <div className="app">
      <Hero />
      <YearCalendar entries={entries} year={CALENDAR_YEAR} />
      <Summary entries={entries} />
    </div>
  )
}
