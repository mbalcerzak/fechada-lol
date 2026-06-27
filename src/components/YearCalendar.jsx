import MonthGrid from './MonthGrid'
import './YearCalendar.css'

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const WEEKDAY_LABELS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

export default function YearCalendar({ entries, year }) {
  const entryMap = Object.fromEntries(entries.map((e) => [e.date, e]))

  return (
    <section className="calendar-section">
      <h2 className="calendar-section__title">Calendario {year}</h2>
      <p className="calendar-section__subtitle">
        Cada día con entrada muestra si hubo trabajo, el clima y la temperatura.
      </p>

      <div className="calendar-grid">
        {MONTH_NAMES.map((name, monthIndex) => (
          <MonthGrid
            key={name}
            monthName={name}
            monthIndex={monthIndex}
            year={year}
            entryMap={entryMap}
            weekdayLabels={WEEKDAY_LABELS}
          />
        ))}
      </div>
    </section>
  )
}
