import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Stats() {
  const sectionRef = useRef(null)
  const numbersRef = useRef([])

  const stats = [
    { value: 500, suffix: '+', label: 'Drivers' },
    { value: 50, suffix: '+', label: 'Service Areas' },
    { value: 4.8, suffix: '★', label: 'Average Rating', isFloat: true }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      numbersRef.current.forEach((el, index) => {
        const targetValue = stats[index].value
        const isFloat = stats[index].isFloat

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(el, 
              { innerHTML: 0 }, 
              { 
                innerHTML: targetValue,
                duration: 2,
                ease: 'power3.out',
                snap: { innerHTML: isFloat ? 0.1 : 1 },
                onUpdate: function() {
                  el.innerHTML = isFloat 
                    ? Number(this.targets()[0].innerHTML).toFixed(1)
                    : Math.round(this.targets()[0].innerHTML)
                }
              }
            )
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el) => {
    if (el && !numbersRef.current.includes(el)) {
      numbersRef.current.push(el)
    }
  }

  return (
    <section ref={sectionRef} className="py-20 bg-surface-light border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, i) => (
            <div key={i} className="pt-8 md:pt-0 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center text-5xl md:text-6xl font-bold text-dark font-stats mb-2">
                <span ref={addToRefs}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-text-secondary font-inter text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
