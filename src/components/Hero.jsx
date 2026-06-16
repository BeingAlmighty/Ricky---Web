import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const PlayStoreIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3.7 21.6c-.3.2-.7.1-.7-.3V2.7c0-.4.4-.5.7-.3l16.8 9.3c.4.2.4.7 0 .9L3.7 21.6z"/>
  </svg>
)

const AppleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.636 10.606c-.027-2.617 2.138-3.878 2.23-3.926-1.218-1.782-3.111-2.022-3.791-2.05-1.614-.163-3.149.95-3.974.95-.824 0-2.091-.926-3.447-.9-1.748.026-3.361.983-4.262 2.55-1.821 3.158-.466 7.828 1.306 10.395.867 1.258 1.888 2.662 3.238 2.61 1.298-.053 1.796-.84 3.266-.84 1.468 0 1.916.84 3.292.813 1.4-.027 2.29-1.286 3.148-2.541.993-1.453 1.4-2.862 1.423-2.936-.032-.014-2.756-1.057-2.784-4.12zM14.61 5.372c.708-.857 1.185-2.046 1.056-3.23-.974.04-2.204.648-2.936 1.52-.656.777-1.226 1.986-1.069 3.15 1.077.084 2.241-.582 2.949-1.44z" />
  </svg>
)

import MagneticButton from './MagneticButton'

export default function Hero() {
  const containerRef = useRef(null)
  const textRefs = useRef([])
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRefs.current, {
        y: '120%',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.15,
        delay: 0.2,
      })

      gsap.to(bgRef.current, {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el)
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#FAFAFA] flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          ref={bgRef}
          src="/assets/HeroPage.png" 
          alt="Hero Background" 
          className="absolute right-0 top-0 w-[120%] md:w-[70%] h-[110%] object-cover object-right"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 10%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,1) 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, transparent 10%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,1) 100%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/95 to-transparent w-full md:w-[65%]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center w-full z-10">
        <div className="flex flex-col max-w-xl">
          <div className="overflow-hidden">
            <h1 ref={addToRefs} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#111111]">
              Skip The Walk.<br />
              Your Ride<br />
              Comes To You.
            </h1>
          </div>
          
          <div className="overflow-hidden mt-6 mb-10">
            <p ref={addToRefs} className="text-lg md:text-xl text-[#6A6A73] leading-relaxed font-inter max-w-md">
              Book an electric rickshaw and get picked up at your doorstep.
            </p>
          </div>

          <div className="pt-2">
            <div ref={addToRefs} className="flex flex-col sm:flex-row gap-4">
              <MagneticButton onClick={() => window.open('https://play.google.com/store/apps/details?id=com.arunnitd.ricky&hl=en_IN', '_blank')} className="flex items-center justify-center gap-3 bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-7 py-3 rounded-2xl transition-colors duration-300 shadow-[0_8px_20px_rgba(91,33,182,0.25)]">
                <PlayStoreIcon className="w-8 h-8" />
                <div className="flex flex-col items-start font-inter">
                  <span className="text-[10px] text-purple-200 leading-none tracking-wide mb-1 font-medium">GET IT ON</span>
                  <span className="text-[17px] font-semibold leading-none tracking-tight">Google Play</span>
                </div>
              </MagneticButton>

              <MagneticButton onClick={() => window.open('https://apps.apple.com/in/app/ricky-rickshaw-booking-app/id6754278349', '_blank')} className="flex items-center justify-center gap-3 bg-white text-[#111111] px-7 py-3 rounded-2xl transition-colors duration-300 border border-gray-200 shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:bg-gray-50">
                <AppleIcon className="w-8 h-8" />
                <div className="flex flex-col items-start font-inter">
                  <span className="text-[10px] text-[#6A6A73] leading-none tracking-wide mb-1 font-medium">Download on the</span>
                  <span className="text-[17px] font-semibold leading-none tracking-tight">App Store</span>
                </div>
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="hidden lg:block relative h-full w-full pointer-events-none"></div>
      </div>
    </section>
  )
}
