import './MonthGrid.css'

const MONTH_COLORS = [
  '#ff6b9d', '#ff9f43', '#ffd93d', '#6bcb77',
  '#4d96ff', '#a29bfe', '#fd79a8', '#00cec9',
  '#e17055', '#74b9ff', '#fab1a0', '#55efc4',
]

const WEATHER_EMOJI = {
  sunny: '☀️',
  cloudy: '☁️',
  'partly cloudy': '⛅',
  rainy: '🌧️',
  windy: '💨',
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstWeekday(year, month) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

export default function MonthGrid({
  monthName,
  monthIndex,
  year,
  entryMap,
  weekdayLabels,
}) {
  const daysInMonth = getDaysInMonth(year, monthIndex)
  const firstWeekday = getFirstWeekday(year, monthIndex)
  const accent = MONTH_COLORS[monthIndex]

  const blanks = Array.from({ length: firstWeekday })
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <article className="month-card" style={{ '--month-accent': accent }}>
      <h3 className="month-card__title">{monthName}</h3>

      <div className="month-card__weekdays">
        {weekdayLabels.map((label) => (
          <span key={label} className="month-card__weekday">
            {label}
          </span>
        ))}
      </div>

      <div className="month-card__days">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="day-cell day-cell--empty" />
        ))}

        {days.map((day) => {
          const dateKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const entry = entryMap[dateKey]

          return (
            <div
              key={day}
              className={`day-cell ${entry ? 'day-cell--has-entry' : ''} ${entry?.worked === 'yes' ? 'day-cell--worked' : ''} ${entry?.worked === 'no' ? 'day-cell--not-worked' : ''}`}
              title={entry ? `${entry.weather}, ${entry.degrees}°C` : undefined}
            >
              <span className="day-cell__number">{day}</span>
              {entry && (
                <div className="day-cell__details">
                  {entry.special_event && (
                    <span className="day-cell__event">🎉</span>
                  )}
                  <span className="day-cell__weather">
                    {WEATHER_EMOJI[entry.weather] ?? '🌡️'}
                  </span>
                  <span className="day-cell__degrees">{entry.degrees}°</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </article>
  )
}
