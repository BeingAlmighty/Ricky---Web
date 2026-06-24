import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { TrainFront, MapPin } from 'lucide-react'

export default function MapAnimation() {
  const sectionRef = useRef(null)
  const pathRef = useRef(null)
  const vehicleRef = useRef(null)

  useEffect(() => {
    if (!pathRef.current || !vehicleRef.current) return

    const path = pathRef.current
    const length = path.getTotalLength()

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      })

      tl.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        duration: 1
      }, 0)

    }, sectionRef)


    return () => ctx.revert()
  }, [])


  return (
    <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">Seamless Daily Commute</h2>
          <p className="text-text-secondary text-lg font-inter">
            Metro to Doorstep in minutes. Watch how Ricky connects the dots of your daily travel seamlessly.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto h-[400px] bg-surface-light rounded-3xl overflow-hidden premium-shadow border border-gray-100 flex items-center justify-center">
          
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 100 Q 200 150 400 50 T 800 200 T 1200 100" stroke="#111" strokeWidth="2" fill="none" />
            <path d="M 0 300 Q 300 250 500 350 T 900 150 T 1200 300" stroke="#111" strokeWidth="1" fill="none" />
            <path d="M 200 0 L 150 400" stroke="#111" strokeWidth="1" fill="none" />
            <path d="M 700 0 L 800 400" stroke="#111" strokeWidth="1" fill="none" />
          </svg>

          <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            <path 
              d="M 150 200 C 300 200 400 100 550 150 S 700 300 850 200" 
              fill="none" 
              stroke="#E5E7EB" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />

            <path 
              ref={pathRef}
              d="M 150 200 C 300 200 400 100 550 150 S 700 300 850 200" 
              fill="none" 
              stroke="#7C3AED" 
              strokeWidth="4" 
              strokeLinecap="round" 
              filter="url(#glow)"
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />
          </svg>

          <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            <div className="absolute left-[15%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="bg-dark text-white p-2 rounded-full mb-2 premium-shadow">
                <TrainFront size={20} />
              </div>
              <span className="text-sm font-semibold bg-white/80 px-2 py-1 rounded backdrop-blur-md">Metro</span>
            </div>

            <div className="absolute left-[23.5%] top-[47.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-4 h-4 bg-secondary rounded-full border-4 border-white premium-shadow mb-2"></div>
              <span className="text-sm font-semibold bg-white/80 px-2 py-1 rounded backdrop-blur-md">Pickup</span>
            </div>

            <div className="absolute left-[85%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="bg-primary text-white p-2 rounded-full mb-2 premium-shadow">
                <MapPin size={20} />
              </div>
              <span className="text-sm font-semibold bg-white/80 px-2 py-1 rounded backdrop-blur-md">Home</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
