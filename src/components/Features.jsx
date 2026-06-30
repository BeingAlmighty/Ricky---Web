import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
  const containerRef = useRef(null)
  const scrollWrapperRef = useRef(null)
  const vehicleRef = useRef(null)
  
  const cards = [
    {
      title: "Doorstep Pickup",
      desc: "No need to walk long distances. Your Ricky driver comes directly to your location.",
      image: "homePickup.png",
      pill: "2-5 mins",
    },
    {
      title: "Fair & Transparent",
      desc: "Know your fare before you ride. No negotiations. No surprises.",
      image: "transparent.jpg",
      pill: "From ₹10",
    },
    {
      title: "Eco-Friendly Travel",
      desc: "Every ride supports cleaner and greener transportation in Delhi.",
      image: "ecoFriendly.avif",
      pill: "100% Electric",
    },
    {
      title: "Trusted Drivers",
      desc: "All drivers go through a verification process to provide safe rides.",
      image: "trustedCaptain.avif",
      pill: "Verified",
    },
    {
      title: "Perfect for Short Trips",
      desc: "Built for everyday local travel like metro connections and nearby markets.",
      image: "shortTravels.webp",
      pill: "Metro to Home",
    }
  ]

  useEffect(() => {
    let ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      const sections = gsap.utils.toArray('.feature-section');
      
      const scrollSpeedMultiplier = 3.5;
      const getTravelDistance = () => window.innerWidth * scrollSpeedMultiplier;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: true,
          end: () => "+=" + (getTravelDistance() * 1.08),
          invalidateOnRefresh: true
        }
      });

      let scrollTween = gsap.to(wrapper, {
        x: "-300vw",
        ease: "none",
        duration: 1
      });
      mainTl.add(scrollTween, 0);

      let vehicleTween = gsap.to(vehicleRef.current, {
        ease: "none", 
        keyframes: [
          { y: 60, duration: 0.2, ease: "sine.inOut" },
          { y: -60, duration: 0.2, ease: "sine.inOut" },
          { y: 60, duration: 0.2, ease: "sine.inOut" },
          { y: -60, duration: 0.2, ease: "sine.inOut" },
          { y: 60, duration: 0.2, ease: "sine.inOut" },
        ],
        duration: 1
      });
      mainTl.add(vehicleTween, 0);

      mainTl.to({}, { duration: 0.08 });

      sections.forEach((sec) => {
        const card = sec.querySelector('.feature-card')
        const dot = sec.querySelector('.map-dot')
        const stem = sec.querySelector('.stem')
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            containerAnimation: scrollTween,
            start: "left 90%", 
            end: "center 60%", 
            scrub: true 
          }
        })
        
        const isValley = sec.dataset.position === 'valley';
        
        tl.fromTo(dot, 
            { scale: 0, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.2, ease: "none" }
          )
          .fromTo(stem,
            { scaleY: 0 },
            { scaleY: 1, duration: 0.3, ease: "none" },
            "-=0.1"
          )
          .fromTo(card,
            { opacity: 0 },
            { opacity: 1, duration: 0.1, ease: "none" },
            "-=0.1"
          )
          .fromTo(card,
            { y: isValley ? 20 : -20, scale: 0.95 },
            { y: 0, scale: 1, duration: 0.5, ease: "none" },
            "<"
          )
      })
      
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div>
      <section ref={containerRef} className="h-screen bg-gradient-to-br from-[#F9F5FF] via-[#FFFFFF] to-[#F3E8FF] w-full overflow-hidden relative flex flex-col">
        
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] flex items-center justify-center">
        <svg className="w-full h-full text-primary" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <pattern id="largeGrid" width="160" height="160" patternUnits="userSpaceOnUse">
              <rect width="160" height="160" fill="url(#smallGrid)" />
              <path d="M 160 0 L 0 0 0 160" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#largeGrid)" />
        </svg>
      </div>

      <div className="w-full text-center z-50 px-6 pt-[8vh] pb-8 flex-shrink-0 relative bg-gradient-to-b from-[#F9F5FF] via-[#F9F5FF]/90 to-transparent">
        <span className="text-secondary font-bold text-sm tracking-wider uppercase mb-2 block">Why Riders Love Ricky</span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-dark">Why People Choose Ricky</h2>
      </div>

      <div className="flex-1 relative w-full overflow-visible">
        
        <div className="flex h-full w-[400vw] relative" ref={scrollWrapperRef}>
          
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[400vw] h-[200px] z-0">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 4000 100">
              <path 
                d="M 500 50 C 700 50, 900 80, 1100 80 C 1300 80, 1500 20, 1700 20 C 1900 20, 2100 80, 2300 80 C 2500 80, 2700 20, 2900 20 C 3100 20, 3300 80, 3500 80" 
                fill="none" 
                stroke="#E9D5FF" 
                strokeWidth="2.5" 
                strokeDasharray="8 8"
              />
            </svg>
          </div>

          <div className="w-[80vw] h-full flex-shrink-0"></div>

          {cards.map((card, idx) => {
            const isValley = idx % 2 === 0;
            const dotY = isValley ? '60px' : '-60px'; 
            
            return (
              <div 
                key={idx} 
                data-position={isValley ? 'valley' : 'peak'}
                className="feature-section w-[60vw] h-full relative flex-shrink-0 z-10 flex items-center justify-center" 
              >
                
                <div 
                  className="map-dot absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-[4px] border-primary premium-shadow z-20"
                  style={{ top: `calc(50% + ${dotY})` }}
                ></div>
                
                <div 
                  className="stem absolute left-1/2 -translate-x-1/2 w-[2px] bg-primary/30 z-10"
                  style={{ 
                    height: '40px',
                    top: isValley ? `calc(50% + 20px)` : `calc(50% - 60px)`,
                    transformOrigin: isValley ? 'bottom' : 'top'
                  }}
                ></div>

                <div 
                  className="feature-card absolute w-[260px] md:w-[300px] h-[220px] md:h-[250px] bg-dark rounded-3xl overflow-hidden premium-shadow border border-white/20 z-30 group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50"
                  style={{
                    bottom: isValley ? `calc(50% - 15px)` : 'auto',
                    top: isValley ? 'auto' : `calc(50% - 15px)`,
                  }}
                >
                  <img 
                    src={`/assets/${card.image}`} 
                    alt={card.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                  
                  <div className="relative h-full flex flex-col justify-end p-5 md:p-6 z-10">
                    <div className="mb-3">
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                        {card.pill}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2 text-white font-sora leading-tight">{card.title}</h3>
                    <p className="text-white/80 font-inter text-xs md:text-sm leading-relaxed line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
                
              </div>
            )
          })}
        </div>

        <div 
          className="absolute left-1/2 pointer-events-none z-40"
          style={{ top: '50%', transform: 'translate(-50%, -50%)' }} 
        >
          <div ref={vehicleRef}>
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center premium-shadow border-[3px] border-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="18" r="2.5" />
                <circle cx="18" cy="18" r="2.5" />
                <path d="M8.5 18h7" />
                <path d="M2 18h1.5" />
                <path d="M20.5 18H22" />
                <path d="M2 18V9a3 3 0 0 1 3-3h11" />
                <path d="M16 6l5.5 7.5V18" />
                <path d="M13 6v12" />
                <path d="M13 13.5h8.5" />
              </svg>
            </div>
          </div>
        </div>

        </div>
      </section>
    </div>
  )
}
