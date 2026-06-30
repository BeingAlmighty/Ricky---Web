import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, CheckCircle2, Navigation, MapPin, Search, FileCheck, UserCheck, Car, ShieldCheck, Share2, PhoneCall, History, Lock } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import CoverflowCarousel from '../components/CoverflowCarousel';

gsap.registerPlugin(ScrollTrigger);

export default function Safety() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const navigate = useNavigate();

  const bgRef = useRef(null);

  const s1Headline = useRef(null);
  const s1Sub = useRef(null);
  const s1Card = useRef(null);
  const stepApp = useRef(null);
  const stepDoc = useRef(null);
  const stepId = useRef(null);
  const stepVeh = useRef(null);
  const stepAppr = useRef(null);
  const momentOfTrustText = useRef(null);
  const rickyBadge = useRef(null);
  const pendingState = useRef(null);

  const s2Headline = useRef(null);
  const s2Phone = useRef(null);
  const s2ScreenNotif = useRef(null);
  const s2ScreenAssign = useRef(null);
  const s2ScreenApproach = useRef(null);
  const s2ScreenLive = useRef(null);
  const s2ScreenComplete = useRef(null);
  const s2Cards = useRef(null);

  const s3Headline = useRef(null);
  const s3HumanText = useRef(null);
  const s3Features = useRef(null);
  
  const s4Headline = useRef(null);
  const s4Sub = useRef(null);
  const s4Network = useRef(null);
  const riderNode = useRef(null);
  const protectiveRing = useRef(null);
  const ctaContainer = useRef(null);

  const safetyCards = [
    {
      id: 1,
      title: "Live Trip Sharing",
      desc: "Broadcast your encrypted live route and telemetry instantly.",
      icon: Share2,
      bgClass: "bg-[#0F0F14]",
      borderClass: "border-white/5",
      titleClass: "text-white",
      descClass: "text-white/60",
      iconWrapperClass: "bg-white/5 border border-white/10 text-white backdrop-blur-md group-hover:rotate-12 transition-transform duration-500",
      iconClass: "",
      effects: () => (
        <>
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-50"></div>
        </>
      )
    },
    {
      id: 2,
      title: "Verified Identity",
      desc: "Match the driver's biometrics and vehicle before stepping inside.",
      icon: UserCheck,
      bgClass: "bg-white",
      borderClass: "border-black/5",
      titleClass: "text-[#111111]",
      descClass: "text-[#6A6A73]",
      iconWrapperClass: "bg-[#FAFAFA] border border-black/5 text-[#111111] group-hover:-rotate-12 transition-transform duration-500",
      iconClass: "",
      effects: () => (
        <div className="absolute inset-0 bg-gradient-to-br from-[#F9F5FF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      )
    },
    {
      id: 3,
      title: "24/7 Rapid Response",
      desc: "Priority access to our dedicated safety team and local services.",
      icon: PhoneCall,
      bgClass: "bg-white",
      borderClass: "border-black/5",
      titleClass: "text-[#111111]",
      descClass: "text-[#6A6A73]",
      iconWrapperClass: "bg-red-50/50 border border-red-100/50 text-red-500 group-hover:scale-110 transition-transform duration-500",
      iconClass: "",
      effects: () => (
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-red-500 rounded-full filter blur-[60px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700"></div>
      )
    },
    {
      id: 4,
      title: "Immutable Records",
      desc: "Every journey is securely logged and accessible in your history.",
      icon: History,
      bgClass: "bg-gradient-to-br from-[#F9F5FF] to-[#F3E8FF]",
      borderClass: "border-primary/10",
      titleClass: "text-[#111111]",
      descClass: "text-primary/70",
      iconWrapperClass: "bg-white/60 backdrop-blur-sm border border-white text-primary shadow-[0px_5px_15px_rgba(91,33,182,0.05)] group-hover:rotate-12 transition-transform duration-500",
      iconClass: "",
      effects: () => (
        <div className="absolute top-0 right-0 w-[200%] h-[200%] -translate-y-1/2 translate-x-1/3 bg-[radial-gradient(circle,rgba(91,33,182,0.04)_0%,transparent_60%)]"></div>
      )
    },
    {
      id: 5,
      title: "Privacy by Design",
      desc: "Your location data is end-to-end encrypted during the trip and automatically wiped from our active servers after every ride. We never sell your data.",
      icon: Lock,
      bgClass: "bg-[#FAFAFA]",
      borderClass: "border-black/5",
      titleClass: "text-[#111111]",
      descClass: "text-[#6A6A73]",
      iconWrapperClass: "bg-white border border-black/5 text-[#111111] shadow-sm group-hover:rotate-[360deg] transition-transform duration-700",
      iconClass: "",
      badge: () => (
        <div className="flex shrink-0 items-center justify-center px-4 py-2 bg-[#00C853]/10 rounded-full border border-[#00C853]/20 text-[#00C853] gap-2 absolute top-6 right-6">
           <div className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse"></div>
           <span className="font-inter text-xs font-bold uppercase tracking-wider">Encrypted</span>
        </div>
      )
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1600%',
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

      
      tl.to({}, { duration: 1 })


      const steps = [stepApp, stepDoc, stepId, stepVeh, stepAppr];
      steps.forEach((step) => {
        tl.to(step.current, { color: '#5B21B6', duration: 0.5 })
          .to(step.current.querySelector('.lucide'), { stroke: '#5B21B6', scale: 1.1, duration: 0.5 }, "<")
          .to({}, { duration: 0.3 });
      });

      tl.to({}, { duration: 1 })
        .to(pendingState.current, { opacity: 0, scale: 0.9, duration: 0.5 })
        .fromTo(momentOfTrustText.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5 }, "<0.2")
        .fromTo(rickyBadge.current, { opacity: 0, scale: 0, rotation: -45 }, { opacity: 1, scale: 1, rotation: 0, ease: "back.out(1.7)", duration: 1.5 }, "<0.2")
        .to({}, { duration: 2 });

      tl.to([s1Headline.current, s1Sub.current, s1Card.current, momentOfTrustText.current, rickyBadge.current], { opacity: 0, y: -30, duration: 1.5 })

      
      tl.to(bgRef.current, { backgroundColor: '#F9F5FF', duration: 1.5 })

      tl.fromTo(s2Headline.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(s2Phone.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5 }, "<")
        .fromTo(s2Cards.current.children, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, stagger: 0.2 }, "<0.5")
        .to({}, { duration: 1 })

      tl.to(s2ScreenNotif.current, { opacity: 0, duration: 0.5 })
        .fromTo(s2ScreenAssign.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 })
        .to({}, { duration: 1 })

      tl.to(s2ScreenAssign.current, { opacity: 0, duration: 0.5 })
        .fromTo(s2ScreenApproach.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 })
        .to({}, { duration: 1 })

      tl.to(s2ScreenApproach.current, { opacity: 0, duration: 0.5 })
        .fromTo(s2ScreenLive.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 })
        .to({}, { duration: 1 })

      tl.to(s2ScreenLive.current, { opacity: 0, duration: 0.5 })
        .fromTo(s2ScreenComplete.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 })
        .to({}, { duration: 2 })

      tl.to([s2Headline.current, s2Phone.current, s2Cards.current], { opacity: 0, y: -30, duration: 1.5 })

      
      tl.to(bgRef.current, { backgroundColor: '#FAFAFA', duration: 1 })

      tl.to({}, { duration: 0.5 })
        .fromTo(s3HumanText.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5 })
        .to({}, { duration: 2 })
        .to(s3HumanText.current, { opacity: 0, y: -30, duration: 1.5 })

      tl.fromTo(s3Headline.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo('.s3-desktop-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.3 }, "<0.5")
        .fromTo('.s3-mobile-carousel', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "<")
        .to({}, { duration: 2 })
      
      tl.to([s3Headline.current, s3Features.current], { opacity: 0, y: -30, duration: 1.5 })

      
      tl.to(bgRef.current, { backgroundColor: '#0F0F14', duration: 2 })
      tl.to(containerRef.current, { color: '#FAFAFA', duration: 2 }, "<")

      tl.fromTo(s4Headline.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(s4Sub.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "<0.5")
        .to({}, { duration: 0.5 })

      tl.fromTo(s4Network.current, { opacity: 0 }, { opacity: 1, duration: 1 })
        
      tl.fromTo(riderNode.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.5)" })
      
      tl.fromTo(protectiveRing.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" })
      tl.to({}, { duration: 1 })

      const nodes = gsap.utils.toArray(s4Network.current.querySelectorAll('.system-node'));
      const lines = gsap.utils.toArray(s4Network.current.querySelectorAll('.system-line'));
      
      lines.forEach((line, i) => {
        tl.fromTo(line, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.5, ease: "none" })
          .fromTo(nodes[i], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, "<0.3")
      });

      tl.to({}, { duration: 2 })

      tl.to([s4Headline.current, s4Sub.current, s4Network.current], { opacity: 0, duration: 1.5 })
      tl.to(ctaContainer.current, { opacity: 1, duration: 1 })
        .fromTo(ctaContainer.current.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2 })
        .to({}, { duration: 2 })

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-8">
        {['Trust', 'Tracking', 'Protection', 'System'].map((label, idx) => (
          <div key={label} className="flex items-center gap-4 group">
            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
              activeSection === idx 
                ? 'bg-primary scale-[1.5]' 
                : activeSection > idx 
                  ? (activeSection === 3 ? 'bg-white/50' : 'bg-[#111111]') 
                  : (activeSection === 3 ? 'border-2 border-white/30 bg-transparent' : 'border-2 border-[#6A6A73] bg-transparent')
            }`} />
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              activeSection === idx 
                ? (activeSection === 3 ? 'opacity-100 text-white' : 'opacity-100 text-[#111111]') 
                : (activeSection === 3 ? 'opacity-0 group-hover:opacity-50 text-white' : 'opacity-0 group-hover:opacity-40 text-[#111111]')
            }`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div>
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden text-text-primary">
          <div ref={bgRef} className="absolute inset-0 bg-[#FAFAFA] z-0"></div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center md:justify-start pointer-events-none px-6 md:pl-28 lg:px-6 pt-12 md:pt-[80px] pb-4">
            <div className="max-w-4xl w-full flex flex-col items-center justify-center text-center">
              
              <h1 ref={s1Headline} className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold tracking-tight leading-tight text-[#111111]">
                Trust begins<br/>before the ride.
              </h1>
              <p ref={s1Sub} className="mt-2 md:mt-4 text-sm md:text-base lg:text-lg text-text-secondary font-inter max-w-lg leading-relaxed">
                Every Ricky driver goes through a strict verification and onboarding process before joining our network.
              </p>

              <div ref={s1Card} className="w-full mt-4 md:mt-6 bg-white rounded-3xl p-5 md:p-8 shadow-[0px_20px_40px_rgba(0,0,0,0.04)] border border-primary/5 text-left flex flex-col md:flex-row items-center gap-6 md:gap-10">
                
                <div className="flex flex-col gap-2 md:gap-3 relative flex-1 w-full max-w-sm mx-auto">
                  <div className="absolute left-[22px] top-[22px] bottom-[22px] w-[2px] bg-primary/10"></div>
                  
                  <div ref={stepApp} className="flex items-center gap-3 md:gap-4 text-[#6A6A73] transition-colors relative z-10">
                    <div className="bg-white p-2 rounded-full border-2 border-current"><Search size={18} /></div>
                    <span className="font-inter font-medium text-sm md:text-base">Application</span>
                  </div>
                  <div ref={stepDoc} className="flex items-center gap-3 md:gap-4 text-[#6A6A73] transition-colors relative z-10">
                    <div className="bg-white p-2 rounded-full border-2 border-current"><FileCheck size={18} /></div>
                    <span className="font-inter font-medium text-sm md:text-base">Document Verification</span>
                  </div>
                  <div ref={stepId} className="flex items-center gap-3 md:gap-4 text-[#6A6A73] transition-colors relative z-10">
                    <div className="bg-white p-2 rounded-full border-2 border-current"><UserCheck size={18} /></div>
                    <span className="font-inter font-medium text-sm md:text-base">Identity Check</span>
                  </div>
                  <div ref={stepVeh} className="flex items-center gap-3 md:gap-4 text-[#6A6A73] transition-colors relative z-10">
                    <div className="bg-white p-2 rounded-full border-2 border-current"><Car size={18} /></div>
                    <span className="font-inter font-medium text-sm md:text-base">Vehicle Inspection</span>
                  </div>
                  <div ref={stepAppr} className="flex items-center gap-3 md:gap-4 text-[#6A6A73] transition-colors relative z-10">
                    <div className="bg-white p-2 rounded-full border-2 border-current"><CheckCircle2 size={18} /></div>
                    <span className="font-inter font-medium text-sm md:text-base">Driver Approval</span>
                  </div>
                </div>

                <div className="relative flex flex-col items-center justify-center md:border-l border-t md:border-t-0 border-primary/10 pt-5 md:pt-0 md:pl-10 text-center flex-1 w-full min-h-[180px]">
                  
                  <div ref={pendingState} className="absolute inset-0 flex flex-col items-center justify-center pt-5 md:pt-0 md:pl-10 z-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 mb-3">
                      <Lock size={20} className="opacity-50" />
                    </div>
                    <div className="text-xs md:text-sm text-gray-400 font-inter">Awaiting verification...</div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                    <p ref={momentOfTrustText} className="text-base md:text-lg font-sora font-semibold text-[#111111] opacity-0 mb-4 md:mb-6 max-w-[200px] leading-snug">
                      Only then does a driver receive the Ricky badge.
                    </p>
                    <div ref={rickyBadge} className="bg-[#5B21B6] text-white p-4 md:p-5 rounded-2xl shadow-xl opacity-0 shrink-0 transform md:scale-110">
                      <ShieldCheck size={36} strokeWidth={1.5} />
                    </div>
                  </div>

                </div>
                
              </div>

            </div>
          </div>

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pointer-events-none px-6 md:pl-28 lg:px-6 pt-20 md:pt-[90px] pb-4">
            <div className="w-full flex flex-col items-center text-center mb-4 md:mb-6">
              <h2 ref={s2Headline} className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold tracking-tight text-[#111111] opacity-0">
                Every ride leaves a<br/>visible trail.
              </h2>
            </div>

            <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mx-auto">
              
              <div ref={s2Cards} className="flex flex-col gap-4">
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-[0px_10px_30px_rgba(0,0,0,0.03)] border border-[#5B21B6]/10 flex items-center gap-4">
                  <div className="bg-[#5B21B6]/10 p-2 md:p-3 rounded-full text-[#5B21B6]"><Navigation size={20} /></div>
                  <span className="font-inter font-semibold text-base md:text-lg">GPS Tracked</span>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-[0px_10px_30px_rgba(0,0,0,0.03)] border border-[#5B21B6]/10 flex items-center gap-4 ml-4 md:ml-8">
                  <div className="bg-[#5B21B6]/10 p-2 md:p-3 rounded-full text-[#5B21B6]"><MapPin size={20} /></div>
                  <span className="font-inter font-semibold text-base md:text-lg">Live Route Monitoring</span>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-[0px_10px_30px_rgba(0,0,0,0.03)] border border-[#5B21B6]/10 flex items-center gap-4 ml-8 md:ml-16">
                  <div className="bg-[#5B21B6]/10 p-2 md:p-3 rounded-full text-[#5B21B6]"><Shield size={20} /></div>
                  <span className="font-inter font-semibold text-base md:text-lg">Trip Records</span>
                </div>
              </div>

              <div ref={s2Phone} className="relative mx-auto w-[240px] md:w-[280px] h-[480px] md:h-[540px] shrink-0 bg-white rounded-[2.5rem] shadow-[0px_30px_60px_rgba(0,0,0,0.1)] border-[6px] md:border-[8px] border-[#111111] overflow-hidden opacity-0">
                <div className="absolute inset-0 bg-[#F4F4F7]">
                  
                  <div ref={s2ScreenNotif} className="absolute inset-0 flex items-center justify-center p-6 bg-black/5">
                    <div className="bg-white w-full p-4 rounded-xl shadow-lg border border-black/5 text-center">
                      <div className="font-sora font-semibold mb-1">Ride Request</div>
                      <div className="text-sm text-[#6A6A73] font-inter">Looking for nearby drivers...</div>
                    </div>
                  </div>

                  <div ref={s2ScreenAssign} className="absolute inset-0 bg-white opacity-0 flex flex-col justify-between">
                    <div className="h-1/2 bg-gray-200"></div> 
                    <div className="p-6 h-1/2">
                      <h3 className="font-sora font-bold text-xl mb-4">Driver Assigned</h3>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div>
                          <div className="font-semibold font-inter">Rajesh K.</div>
                          <div className="text-sm text-[#6A6A73]">UP16 CD 1234</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div ref={s2ScreenApproach} className="absolute inset-0 bg-white opacity-0 flex flex-col justify-between">
                    <div className="h-1/2 bg-gray-300 flex items-center justify-center">
                      <div className="w-4 h-4 bg-primary rounded-full animate-ping"></div>
                    </div>
                    <div className="p-6 h-1/2 bg-primary text-white">
                      <h3 className="font-sora font-bold text-xl mb-2">Arriving in 2 mins</h3>
                      <div className="text-sm opacity-80 font-inter">Your driver is nearby</div>
                    </div>
                  </div>

                  <div ref={s2ScreenLive} className="absolute inset-0 bg-white opacity-0 flex flex-col justify-between">
                    <div className="h-2/3 bg-gray-200 relative">
                      <svg className="absolute inset-0 w-full h-full"><path d="M50,300 C150,200 200,100 250,50" fill="none" stroke="#5B21B6" strokeWidth="4" strokeDasharray="5 5"/></svg>
                    </div>
                    <div className="p-6 h-1/3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-10">
                      <h3 className="font-sora font-bold text-xl mb-1">In Progress</h3>
                      <div className="text-sm text-[#6A6A73] font-inter mb-4">Sharing live location</div>
                      <button className="w-full bg-[#FAFAFA] border border-[#111111]/10 py-3 rounded-lg font-inter font-medium text-[#111111]">Share Trip Status</button>
                    </div>
                  </div>

                  <div ref={s2ScreenComplete} className="absolute inset-0 bg-white opacity-0 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="font-sora font-bold text-2xl mb-2">You have arrived</h3>
                    <div className="text-[#6A6A73] font-inter mb-8">Hope you had a safe journey!</div>
                    <button className="w-full bg-[#111111] text-white py-4 rounded-xl font-inter font-semibold">Rate Driver</button>
                  </div>

                </div>
                <div className="absolute top-0 inset-x-0 h-6 bg-[#111111] rounded-b-3xl w-1/2 mx-auto"></div>
              </div>

            </div>
          </div>

          <div className="absolute inset-0 z-30 flex flex-col items-center justify-start pointer-events-none px-6 md:pl-28 lg:px-6 pt-[120px] md:pt-[100px] pb-4">
            
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 ref={s3HumanText} className="text-2xl md:text-4xl lg:text-5xl font-sora font-semibold text-center opacity-0 max-w-4xl tracking-tight leading-[1.1]">
                Because getting home safely should never be a concern.
              </h2>
            </div>

            <div className="w-full flex flex-col items-center text-center mb-6 md:mb-8 mt-0">
              <h2 ref={s3Headline} className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold tracking-tight text-[#111111] opacity-0">
                Support when you need it.
              </h2>
            </div>

            <div className="max-w-4xl mx-auto w-full pointer-events-auto">
              
              <div ref={s3Features} className="w-full">
                
                <div className="hidden lg:grid grid-cols-2 gap-6 w-full">
                  
                  <div className="s3-desktop-card opacity-0 relative overflow-hidden bg-[#0F0F14] p-8 rounded-[2rem] border border-white/5 shadow-2xl group flex flex-row items-center gap-6">
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-50"></div>
                    
                    <div className="relative z-10 shrink-0">
                      <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-md group-hover:rotate-12 transition-transform duration-500">
                        <Share2 size={22} />
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col text-left">
                      <h3 className="font-sora font-semibold text-xl text-white mb-1.5 tracking-tight">Live Trip Sharing</h3>
                      <p className="text-white/60 font-inter leading-relaxed text-sm">Broadcast your encrypted live route and telemetry instantly.</p>
                    </div>
                  </div>

                  <div className="s3-desktop-card opacity-0 relative overflow-hidden bg-white p-8 rounded-[2rem] border border-black/5 shadow-[0px_10px_30px_rgba(0,0,0,0.03)] group flex flex-row items-center gap-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F9F5FF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="relative z-10 shrink-0">
                      <div className="w-14 h-14 bg-[#FAFAFA] border border-black/5 rounded-2xl flex items-center justify-center text-[#111111] group-hover:-rotate-12 transition-transform duration-500">
                        <UserCheck size={22} />
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col text-left">
                      <h3 className="font-sora font-semibold text-xl text-[#111111] mb-1.5 tracking-tight">Verified Identity</h3>
                      <p className="text-[#6A6A73] font-inter leading-relaxed text-sm">Match the driver's biometrics and vehicle before stepping inside.</p>
                    </div>
                  </div>

                  <div className="s3-desktop-card opacity-0 relative overflow-hidden bg-white p-8 rounded-[2rem] border border-black/5 shadow-[0px_10px_30px_rgba(0,0,0,0.03)] group flex flex-row items-center gap-6">
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-red-500 rounded-full filter blur-[60px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700"></div>
                    
                    <div className="relative z-10 shrink-0">
                      <div className="w-14 h-14 bg-red-50/50 border border-red-100/50 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform duration-500">
                        <PhoneCall size={22} />
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col text-left">
                      <h3 className="font-sora font-semibold text-xl text-[#111111] mb-1.5 tracking-tight">24/7 Rapid Response</h3>
                      <p className="text-[#6A6A73] font-inter leading-relaxed text-sm">Priority access to our dedicated safety team and local services.</p>
                    </div>
                  </div>

                  <div className="s3-desktop-card opacity-0 relative overflow-hidden bg-gradient-to-br from-[#F9F5FF] to-[#F3E8FF] p-8 rounded-[2rem] border border-primary/10 group flex flex-row items-center gap-6">
                    <div className="absolute top-0 right-0 w-[200%] h-[200%] -translate-y-1/2 translate-x-1/3 bg-[radial-gradient(circle,rgba(91,33,182,0.04)_0%,transparent_60%)]"></div>
                    
                    <div className="relative z-10 shrink-0">
                      <div className="w-14 h-14 bg-white/60 backdrop-blur-sm border border-white rounded-2xl flex items-center justify-center text-primary shadow-[0px_5px_15px_rgba(91,33,182,0.05)] group-hover:rotate-12 transition-transform duration-500">
                        <History size={22} />
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col text-left">
                      <h3 className="font-sora font-semibold text-xl text-[#111111] mb-1.5 tracking-tight">Immutable Records</h3>
                      <p className="text-primary/70 font-inter leading-relaxed text-sm">Every journey is securely logged and accessible in your history.</p>
                    </div>
                  </div>

                  <div className="s3-desktop-card opacity-0 col-span-2 relative overflow-hidden bg-[#FAFAFA] p-6 rounded-[2rem] border border-black/5 shadow-inner group flex flex-row items-center gap-6">
                    
                    <div className="relative z-10 shrink-0">
                      <div className="w-14 h-14 bg-white border border-black/5 rounded-2xl flex items-center justify-center text-[#111111] shadow-sm group-hover:rotate-[360deg] transition-transform duration-700">
                        <Lock size={22} />
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col text-left flex-1">
                      <h3 className="font-sora font-semibold text-xl text-[#111111] mb-1 tracking-tight">Privacy by Design</h3>
                      <p className="text-[#6A6A73] font-inter leading-relaxed text-sm max-w-2xl">Your location data is end-to-end encrypted during the trip and automatically wiped from our active servers after every ride. We never sell your data.</p>
                    </div>

                    <div className="flex shrink-0 items-center justify-center px-4 py-2 bg-[#00C853]/10 rounded-full border border-[#00C853]/20 text-[#00C853] gap-2">
                       <div className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse"></div>
                       <span className="font-inter text-xs font-bold uppercase tracking-wider">End-to-End Encrypted</span>
                    </div>
                  </div>

                </div>

                <div className="lg:hidden w-full s3-mobile-carousel opacity-0 mb-6">
                  <CoverflowCarousel cards={safetyCards} />
                </div>

              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-40 flex flex-col items-center justify-start pointer-events-none px-6 pt-[120px] md:pt-[100px] pb-10">
            
            <div className="w-full flex flex-col items-center text-center mb-4 md:mb-8 relative z-10 shrink-0">
              <h2 ref={s4Headline} className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold tracking-tight opacity-0 leading-tight">
                Safety is not a feature.<br/>It's a system.
              </h2>
              <p ref={s4Sub} className="mt-3 md:mt-4 text-base md:text-lg text-[#6A6A73] font-inter opacity-0 max-w-2xl">
                Every trip is supported by multiple layers working together behind the scenes.
              </p>
            </div>

            <div ref={s4Network} className="relative w-full max-w-4xl flex-1 min-h-0 opacity-0 flex items-center justify-center mt-8 md:mt-0">
              <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet" className="w-[140%] md:w-full h-[140%] md:h-full scale-[1.1] md:scale-100 overflow-visible transform origin-center">
                
                <g stroke="#5B21B6" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" className="opacity-40">
                  <line x1="500" y1="200" x2="300" y2="100" className="system-line" />
                  <line x1="500" y1="200" x2="700" y2="100" className="system-line" />
                  <line x1="500" y1="200" x2="200" y2="250" className="system-line" />
                  <line x1="500" y1="200" x2="800" y2="250" className="system-line" />
                  <line x1="500" y1="200" x2="500" y2="350" className="system-line" />
                </g>

                <circle ref={protectiveRing} cx="500" cy="200" r="80" fill="none" stroke="#7C3AED" strokeWidth="1" className="opacity-0" strokeDasharray="4 4" />
                
                <g ref={riderNode} className="opacity-0">
                  <circle cx="500" cy="200" r="30" fill="#5B21B6" />
                  <text x="500" y="205" fill="#FAFAFA" fontSize="14" textAnchor="middle" className="font-sora font-semibold">You</text>
                </g>

                <g className="system-node opacity-0">
                  <circle cx="300" cy="100" r="8" fill="#FAFAFA" />
                  <text x="300" y="80" fill="#FAFAFA" fontSize="14" textAnchor="middle" className="font-inter">Driver Verification</text>
                </g>
                <g className="system-node opacity-0">
                  <circle cx="700" cy="100" r="8" fill="#FAFAFA" />
                  <text x="700" y="80" fill="#FAFAFA" fontSize="14" textAnchor="middle" className="font-inter">GPS Tracking</text>
                </g>
                <g className="system-node opacity-0">
                  <circle cx="200" cy="250" r="8" fill="#FAFAFA" />
                  <text x="200" y="275" fill="#FAFAFA" fontSize="14" textAnchor="middle" className="font-inter">Support Team</text>
                </g>
                <g className="system-node opacity-0">
                  <circle cx="800" cy="250" r="8" fill="#FAFAFA" />
                  <text x="800" y="275" fill="#FAFAFA" fontSize="14" textAnchor="middle" className="font-inter">Trip Records</text>
                </g>
                <g className="system-node opacity-0">
                  <circle cx="500" cy="350" r="8" fill="#FAFAFA" />
                  <text x="500" y="375" fill="#FAFAFA" fontSize="14" textAnchor="middle" className="font-inter">Community Standards</text>
                </g>
              </svg>
            </div>
          </div>

          <div ref={ctaContainer} className="absolute inset-0 z-50 flex flex-col items-center justify-center opacity-0 pointer-events-auto bg-[#0F0F14]">
            
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent mb-12 opacity-50 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#FAFAFA] w-4 animate-[slideRight_2s_infinite]"></div>
            </div>

            <h1 className="text-6xl md:text-8xl font-sora font-bold text-center tracking-tight leading-[1.05] mb-16 text-[#FAFAFA]">
              Move confidently.<br/>Ride confidently.
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticButton onClick={() => window.open('https://play.google.com/store/apps/details?id=com.arunnitd.ricky&hl=en_IN', '_blank')} className="flex items-center justify-center px-10 py-5 bg-[#5B21B6] hover:bg-[#7C3AED] text-white rounded-2xl transition-colors duration-300 font-inter font-semibold text-lg shadow-[0_10px_30px_rgba(91,33,182,0.3)] hover:-translate-y-1">
                Download Ricky
              </MagneticButton>
              <MagneticButton onClick={() => navigate('/contact')} className="flex items-center justify-center px-10 py-5 bg-transparent border-2 border-[#FAFAFA]/20 hover:border-[#FAFAFA] text-[#FAFAFA] rounded-2xl transition-all duration-300 font-inter font-semibold text-lg hover:bg-white/5 hover:-translate-y-1">
                Contact Support
              </MagneticButton>
            </div>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes slideRight {
              0% { transform: translateX(-100%); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateX(1000%); opacity: 0; }
            }
          `}} />

        </div>
      </div>
    </>
  );
}
