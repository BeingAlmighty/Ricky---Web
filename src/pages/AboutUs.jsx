import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import MagneticButton from '../components/MagneticButton'
import { PlayStoreIcon, AppleIcon } from '../components/Icons';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function AboutUs() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  const introText1 = useRef(null);
  const introText2 = useRef(null);
  const mostText = useRef(null);
  
  const routePath = useRef(null);
  const metroNode = useRef(null);
  
  const signaturePauseText = useRef(null);
  const rickyVehicle = useRef(null);

  
  const solutionTextContainer = useRef(null);
  
  const visionContainer = useRef(null);
  const vWord1 = useRef(null);
  const vWord2 = useRef(null);
  const vWord3 = useRef(null);
  const vWord4 = useRef(null);
  const vWord5 = useRef(null);
  const visionSub = useRef(null);

  const futureContainer = useRef(null);
  const ctaContainer = useRef(null);
  const nodesGroup = useRef(null);
  
  const bgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1200%',
          scrub: 1.5,
          pin: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.25) setActiveSection(0);
            else if (p >= 0.25 && p < 0.5) setActiveSection(1);
            else if (p >= 0.5 && p < 0.75) setActiveSection(2);
            else setActiveSection(3);
          }
        }
      });

      
      tl.to({}, { duration: 1.5 })
        .to(introText1.current, { opacity: 0, y: -30, duration: 1 })
      
      tl.fromTo(introText2.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 0.5 })
        .to(introText2.current, { opacity: 0, scale: 0.9, duration: 1 })

      tl.fromTo(mostText.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 20, duration: 2, ease: "power2.in" })
        .to(mostText.current, { opacity: 0, duration: 0.5 })

      tl.fromTo(metroNode.current, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5 })
        .fromTo(routePath.current, { strokeDashoffset: 1000 }, { strokeDashoffset: 400, duration: 2, ease: "power1.inOut" })

      tl.fromTo(signaturePauseText.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 1.5 })

      
      tl.to(bgRef.current, { backgroundColor: '#F9F5FF', duration: 1 }, "<")
      
      tl.to(signaturePauseText.current, { opacity: 0, y: -20, duration: 1 })
      tl.fromTo(rickyVehicle.current, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5 })
      tl.to(routePath.current, { strokeDashoffset: 0, duration: 2, ease: "power2.out" })
      tl.to(rickyVehicle.current, { 
        motionPath: {
          path: routePath.current,
          align: routePath.current,
          alignOrigin: [0.5, 0.5],
        },
        duration: 2,
      }, "<")

      tl.fromTo(solutionTextContainer.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5 })
        .to({}, { duration: 1 })

      
      tl.to(solutionTextContainer.current, { opacity: 0, y: -30, duration: 1 })
      tl.to(bgRef.current, { backgroundColor: '#FAFAFA', duration: 1 }, "<")
      tl.to([routePath.current, metroNode.current, rickyVehicle.current], { opacity: 0, duration: 1 }, "<")

      tl.to(visionContainer.current, { opacity: 1, duration: 0.1 })
      
      const vWords = [vWord1, vWord2, vWord3, vWord4, vWord5];
      vWords.forEach((wordRef, index) => {
        tl.fromTo(wordRef.current, { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.5 })
          .to({}, { duration: 1 })
        
        if (index < vWords.length - 1) {
          tl.to(wordRef.current, { opacity: 0, y: -50, scale: 1.1, duration: 1.5 })
        }
      });

      tl.fromTo(visionSub.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 2 })
        .to(visionSub.current, { opacity: 0, duration: 1 })

      
      tl.to(bgRef.current, { backgroundColor: '#0F0F14', duration: 1.5 })
      tl.to(containerRef.current, { color: '#FAFAFA', duration: 1.5 }, "<")

      tl.to(vWord5.current, { opacity: 0, scale: 2, filter: 'blur(10px)', duration: 1.5 })
      
      tl.to(futureContainer.current, { opacity: 1, duration: 0.1 })
      tl.fromTo(nodesGroup.current.children, 
        { opacity: 0, scale: 0 }, 
        { opacity: 1, scale: 1, duration: 2, stagger: 0.3, ease: "elastic.out(1, 0.5)" }
      )
      
      tl.to(nodesGroup.current, { scale: 1.5, opacity: 0.4, duration: 3 }, "<1")

      tl.to(futureContainer.current, { opacity: 0, duration: 1 })
      tl.to(ctaContainer.current, { opacity: 1, duration: 1 })
        .fromTo(ctaContainer.current.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2 })
        .to({}, { duration: 2 })

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-8">
        {['Problem', 'Solution', 'Vision', 'Future'].map((label, idx) => (
          <div key={label} className="flex items-center gap-4 group">
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              activeSection === idx 
                ? 'bg-primary scale-125' 
                : activeSection > idx 
                  ? (activeSection === 3 ? 'bg-white/50' : 'bg-[#111111]') 
                  : (activeSection === 3 ? 'border-2 border-white/30 bg-transparent' : 'border-2 border-[#6A6A73] bg-transparent')
            }`} />
            <span className={`text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
              activeSection === idx 
                ? (activeSection === 3 ? 'opacity-100 text-white' : 'opacity-100 text-[#111111]') 
                : (activeSection === 3 ? 'opacity-0 group-hover:opacity-50 text-white' : 'opacity-0 group-hover:opacity-50 text-[#111111]')
            }`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div>
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden text-text-primary">
        <div ref={bgRef} className="absolute inset-0 bg-[#FAFAFA] z-0"></div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 ref={introText1} className="text-4xl md:text-6xl font-sora font-semibold text-center tracking-tight text-[#111111]">
              Every day, millions<br/>travel across Delhi.
            </h2>
            <h2 ref={introText2} className="absolute text-4xl md:text-6xl font-sora font-semibold text-center opacity-0 tracking-tight">
              The metro solves<br/>most of the journey.
            </h2>
            <h1 ref={mostText} className="absolute text-[15vw] font-sora font-bold text-center opacity-0 tracking-tighter">
              MOST
            </h1>
          </div>

          <div className="absolute inset-0 flex items-center justify-center w-full h-full max-w-4xl mx-auto opacity-80">
            <svg viewBox="0 0 1000 600" className="w-full h-full overflow-visible">
              <path 
                ref={routePath}
                d="M 100,300 C 250,300 350,150 500,150 C 650,150 750,450 900,450" 
                fill="none" 
                stroke="#111111" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                className="opacity-20"
              />
              <path 
                d="M 100,300 C 250,300 350,150 500,150 C 650,150 750,450 900,450" 
                fill="none" 
                stroke="#111111" 
                strokeWidth="4" 
                strokeLinecap="round"
                className="opacity-[0.03]"
              />

              <g ref={metroNode} className="opacity-0">
                <circle cx="100" cy="300" r="12" fill="#FAFAFA" stroke="#111111" strokeWidth="4" />
                <circle cx="100" cy="300" r="24" fill="none" stroke="#111111" strokeWidth="1" className="opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
              </g>

              <g ref={rickyVehicle} className="opacity-0">
                <circle cx="0" cy="0" r="16" fill="#5B21B6" />
                <path d="M-4,-4 L4,0 L-4,4 Z" fill="white" />
              </g>
            </svg>
          </div>

          <h2 ref={signaturePauseText} className="absolute text-3xl md:text-5xl font-sora font-semibold text-center opacity-0 tracking-tight mt-32">
            But not the last 500 meters.
          </h2>

          <div ref={solutionTextContainer} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 mt-32 px-6">
            <h2 className="text-5xl md:text-7xl font-sora font-bold text-center tracking-tight leading-[1.05] max-w-4xl">
              Transportation<br/>should finish<br/>the journey.
            </h2>
            <p className="mt-8 text-xl text-text-secondary font-inter text-center max-w-2xl">
              Ricky connects people from where public transport ends to where life actually happens.
            </p>
          </div>

        </div>

        <div ref={visionContainer} className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <h2 ref={vWord1} className="absolute text-[12vw] font-sora font-bold text-[#111111] opacity-0 tracking-tighter">Affordable</h2>
            <h2 ref={vWord2} className="absolute text-[12vw] font-sora font-bold text-[#5B21B6] opacity-0 tracking-tighter">Accessible</h2>
            <h2 ref={vWord3} className="absolute text-[12vw] font-sora font-bold text-[#00C853] opacity-0 tracking-tighter">Electric</h2>
            <h2 ref={vWord4} className="absolute text-[12vw] font-sora font-bold text-[#7C3AED] opacity-0 tracking-tighter">Doorstep</h2>
            <h2 ref={vWord5} className="absolute text-[12vw] font-sora font-bold text-[#111111] opacity-0 tracking-tighter">For Everyone</h2>
          </div>
          <p ref={visionSub} className="absolute bottom-32 text-xl md:text-2xl font-inter text-[#6A6A73] text-center max-w-xl opacity-0">
            We're building the missing layer between public transport and your destination.
          </p>
        </div>

        <div ref={futureContainer} className="absolute inset-0 z-0 flex flex-col items-center justify-center opacity-0 pointer-events-none">
          
          <div className="absolute inset-0 flex items-center justify-center w-full h-full opacity-80">
            <svg viewBox="0 0 1000 600" className="w-full h-full overflow-visible" ref={nodesGroup}>
              <circle cx="500" cy="300" r="8" fill="#FAFAFA" className="animate-pulse" />
              <text x="500" y="280" fill="#FAFAFA" fontSize="14" textAnchor="middle" className="font-inter opacity-60">Delhi</text>
              
              <path d="M 500,300 L 400,200" stroke="#FAFAFA" strokeWidth="1" className="opacity-20" />
              <circle cx="400" cy="200" r="5" fill="#5B21B6" />
              <text x="400" y="185" fill="#FAFAFA" fontSize="12" textAnchor="middle" className="font-inter opacity-40">NCR</text>

              <path d="M 500,300 L 650,250" stroke="#FAFAFA" strokeWidth="1" className="opacity-20" />
              <circle cx="650" cy="250" r="6" fill="#7C3AED" />

              <path d="M 500,300 L 450,450" stroke="#FAFAFA" strokeWidth="1" className="opacity-20" />
              <circle cx="450" cy="450" r="4" fill="#00C853" />

              <path d="M 650,250 L 800,150" stroke="#FAFAFA" strokeWidth="1" className="opacity-10" />
              <circle cx="800" cy="150" r="3" fill="#FAFAFA" className="opacity-50" />

              <path d="M 400,200 L 250,150" stroke="#FAFAFA" strokeWidth="1" className="opacity-10" />
              <circle cx="250" cy="150" r="4" fill="#FAFAFA" className="opacity-50" />
            </svg>
          </div>

          <div className="z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-sora font-semibold mb-4 tracking-tight">We’re just getting started.</h2>
            <p className="text-text-secondary font-inter text-lg">Building India’s most accessible short-distance mobility network.</p>
          </div>
        </div>

        <div ref={ctaContainer} className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 pointer-events-auto bg-[#0F0F14]">
          <h1 className="text-5xl md:text-7xl font-sora font-bold text-center tracking-tight leading-[1.05] mb-12 max-w-4xl">
            The future of local mobility starts at your doorstep.
          </h1>
          <div className="flex flex-col sm:flex-row gap-6">
            <MagneticButton onClick={() => window.open('https://play.google.com/store/apps/details?id=com.arunnitd.ricky&hl=en_IN', '_blank')} className="flex items-center justify-center gap-3 bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-7 py-3 rounded-2xl transition-colors duration-300 shadow-[0_8px_20px_rgba(91,33,182,0.25)]">
              <PlayStoreIcon className="w-8 h-8" />
              <div className="flex flex-col items-start font-inter">
                <span className="text-[10px] text-purple-200 leading-none tracking-wide mb-1 font-medium">GET IT ON</span>
                <span className="text-[17px] font-semibold leading-none tracking-tight">Google Play</span>
              </div>
            </MagneticButton>

            <MagneticButton onClick={() => window.open('https://apps.apple.com/in/app/ricky-rickshaw-booking-app/id6754278349', '_blank')} className="flex items-center justify-center gap-3 bg-transparent text-[#FAFAFA] px-7 py-3 rounded-2xl transition-all duration-300 border border-[#FAFAFA]/20 hover:border-[#FAFAFA] hover:bg-white/5 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
              <AppleIcon className="w-8 h-8" />
              <div className="flex flex-col items-start font-inter">
                <span className="text-[10px] text-[#FAFAFA]/70 leading-none tracking-wide mb-1 font-medium">Download on the</span>
                <span className="text-[17px] font-semibold leading-none tracking-tight">App Store</span>
              </div>
            </MagneticButton>
          </div>
        </div>

        </div>
      </div>
    </>
  );
}
