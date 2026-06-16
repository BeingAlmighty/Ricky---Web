import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function AppShowcase() {
  const containerRef = useRef(null)

  const screens = [
    { title: 'Enter Your Destination', desc: 'Open the app and choose exactly where you want to go. A clear, minimal interface designed for speed.', src: '/assets/screen2.png' },
    { title: 'Get Matched Instantly', desc: "We'll immediately connect you with a nearby, highly-rated Ricky captain so you never have to wait.", src: '/assets/screen3.png' },
    { title: 'Savings & Payments', desc: 'Apply promo codes instantly to get discounts on your rides. Enjoy seamless, hassle-free payments via UPI, wallet, or cash.', src: '/assets/screen4.png' },
    { title: 'Manage Your Profile', desc: 'Take full control of your experience. Access your complete trip history, manage saved addresses, track referrals, and customize settings effortlessly.', src: '/assets/screen5.png' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.app-card');
      const phoneScreens = gsap.utils.toArray('.phone-screen');
      
      gsap.set(cards, { transformOrigin: "top center" });
      
      gsap.set(cards.slice(1), { y: 600, opacity: 0 });
      gsap.set(phoneScreens.slice(1), { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4000',
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      tl.to({}, { duration: 0.5 });

      screens.forEach((_, i) => {
        if (i === 0) return;

        for (let j = 0; j < i; j++) {
          tl.to(cards[j], {
            scale: 1 - (0.05 * (i - j)),
            opacity: 1 - (0.2 * (i - j)),
            duration: 1,
            ease: "power2.inOut"
          }, `step${i}`)
        }
        
        tl.to(cards[i], {
          y: i * 35,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }, `step${i}`)
        
        tl.to(phoneScreens[i], {
          opacity: 1,
          duration: 0.5,
          ease: "none"
        }, `step${i}`)

        tl.to({}, { duration: 0.8 });
      });

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div>
      <section ref={containerRef} className="h-screen bg-dark text-white relative flex flex-col justify-center overflow-hidden pt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        <div className="text-center mb-8 md:mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold mb-2 md:mb-4 tracking-tight">How Ricky Works</h2>
          <p className="text-text-secondary text-lg font-inter">
            A seamless experience designed to get you moving instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 relative items-center">
          
          <div className="relative h-[280px] md:h-[320px] w-full max-w-md mx-auto lg:mx-0 lg:-translate-y-12">
            {screens.map((screen, idx) => (
              <div 
                key={idx} 
                className="app-card absolute top-0 left-0 w-full"
                style={{ zIndex: idx }}
              >
                <div className="bg-[#18181B] p-8 md:p-10 rounded-3xl border border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] h-full flex flex-col justify-center transition-shadow">
                  <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">Step {idx + 1}</span>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 font-sora">{screen.title}</h3>
                  <p className="text-gray-400 font-inter text-base leading-relaxed">{screen.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex h-[50vh] md:h-[65vh] items-center justify-center w-full max-w-[240px] md:max-w-[280px] mx-auto relative z-20 mt-4 md:mt-0">
            <div className="relative w-full aspect-[1/2.05] bg-gradient-to-br from-[#2E1A47] to-[#0F0F14] rounded-[36px] md:rounded-[40px] border-[8px] border-[#18181B] shadow-[0_0_80px_rgba(124,58,237,0.15)] premium-shadow overflow-hidden">
              
              <div className="relative w-full h-full bg-black">
                {screens.map((screen, idx) => (
                  <div
                    key={idx}
                    className="phone-screen absolute inset-0 w-full h-full"
                    style={{ zIndex: idx }}
                  >
                    <img 
                      src={screen.src} 
                      alt={screen.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          </div>

        </div>
      </section>
    </div>
  )
}
