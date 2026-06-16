import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MagneticButton({ children, className, onClick }) {
  const buttonRef = useRef(null)
  
  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const xTo = gsap.quickTo(button, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(button, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" })

    const moveEvent = (e) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = button.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      xTo(x * 0.25)
      yTo(y * 0.25)
    }

    const leaveEvent = () => {
      xTo(0)
      yTo(0)
    }

    button.addEventListener("mousemove", moveEvent)
    button.addEventListener("mouseleave", leaveEvent)

    return () => {
      button.removeEventListener("mousemove", moveEvent)
      button.removeEventListener("mouseleave", leaveEvent)
    }
  }, [])

  return (
    <button ref={buttonRef} className={className} onClick={onClick}>
      {children}
    </button>
  )
}
