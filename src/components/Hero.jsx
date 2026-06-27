import { useEffect, useState } from 'react'
import './Hero.css'

export default function Hero() {
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowAnswer(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero">
      <div className="hero__blobs" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="blob blob--3" />
        <span className="blob blob--4" />
      </div>

      <div className="hero__content">
        {/* <p className="hero__eyebrow">fechada.lol</p> */}
        <h1 className="hero__question">¿Está lista la fachada?</h1>
        <p className={`hero__answer ${showAnswer ? 'hero__answer--visible' : ''}`}>
          NO
        </p>
      </div>

      <div className="hero__scroll-hint">
        <span>scroll</span>
        <span className="hero__scroll-arrow">↓</span>
      </div>
    </section>
  )
}
