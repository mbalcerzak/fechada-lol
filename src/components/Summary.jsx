import './Summary.css'

function countWeekdaysBetween(start, end) {
  let count = 0
  const current = new Date(start)
  current.setHours(0, 0, 0, 0)
  const endDate = new Date(end)
  endDate.setHours(0, 0, 0, 0)

  while (current <= endDate) {
    const day = current.getDay()
    if (day !== 0 && day !== 6) count++
    current.setDate(current.getDate() + 1)
  }

  return count
}

function findStartDate(entries) {
  const started = entries.find((e) => e.special_event === 'started')
  if (started) return started.date

  if (entries.length === 0) return null
  return entries.reduce((min, e) => (e.date < min ? e.date : min), entries[0].date)
}

export default function Summary({ entries }) {
  const startDate = findStartDate(entries)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const workdaysPassed = startDate
    ? countWeekdaysBetween(new Date(startDate + 'T00:00:00'), today)
    : 0

  const workedYesCount = entries.filter((e) => e.worked === 'yes').length
  const percentage = workdaysPassed > 0
    ? Math.round((workedYesCount / workdaysPassed) * 100)
    : 0

  return (
    <section className="summary">
      <h2 className="summary__title">Resumen</h2>

      <div className="summary__cards">
        <div className="summary__card summary__card--workdays">
          <span className="summary__emoji">📅</span>
          <span className="summary__number">{workdaysPassed}</span>
          <span className="summary__label">días laborables transcurridos</span>
          {startDate && (
            <span className="summary__hint">desde {startDate}</span>
          )}
        </div>

        <div className="summary__vs">vs</div>

        <div className="summary__card summary__card--worked">
          <span className="summary__emoji">🎨</span>
          <span className="summary__number">{workedYesCount}</span>
          <span className="summary__label">días con trabajo en la fachada</span>
          <span className="summary__hint">worked: yes</span>
        </div>
      </div>

      <div className="summary__bar-wrap">
        <div className="summary__bar-label">
          Progreso: {workedYesCount} de {workdaysPassed} días laborables
        </div>
        <div className="summary__bar">
          <div
            className="summary__bar-fill"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <span className="summary__percentage">{percentage}%</span>
      </div>

      <p className="summary__footer">
        Todavía no está fechada. Pero vamos avanzando. 💪
      </p>
    </section>
  )
}
