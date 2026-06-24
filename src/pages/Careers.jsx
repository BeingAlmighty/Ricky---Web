import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function Careers() {
  const containerRef = useRef(null);

  const cardRef = useRef(null);
  const routeRef = useRef(null);
  const vehicleRef = useRef(null);

  const [hoveredRole, setHoveredRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.anim-headline', 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      )
      .fromTo('.anim-sub',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        "-=0.6"
      )
      .fromTo(cardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.4"
      )
      .fromTo(routeRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power2.inOut', transformOrigin: "left center" },
        "-=0.2"
      )
      .fromTo(vehicleRef.current,
        { left: '0%' },
        { left: '100%', duration: 1.2, ease: 'power2.inOut' },
        "<"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const roles = [
    "Growth & Marketing Intern",
    "Operations Intern",
    "Business Development Intern"
  ];

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#FAFAFA] to-[#F9F5FF] pt-[120px] pb-12 lg:pt-[100px] lg:pb-0 flex flex-col items-center justify-start lg:justify-center text-[#111111]">
      
      <div className="max-w-7xl w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center z-10 my-auto lg:my-0">
        
        <div className="flex flex-col text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold tracking-tight leading-[1.1] mb-6">
            <div className="overflow-hidden pb-2"><div className="anim-headline">Build the future</div></div>
            <div className="overflow-hidden pb-2"><div className="anim-headline text-[#5B21B6]">of local</div></div>
            <div className="overflow-hidden pb-2"><div className="anim-headline">mobility.</div></div>
          </h1>
          <div className="text-lg md:text-xl text-[#6A6A73] font-inter max-w-lg mx-auto lg:mx-0 flex flex-col gap-2">
            <p className="anim-sub opacity-0">We're building a smarter, more accessible transportation network—one ride at a time.</p>
            <p className="anim-sub opacity-0">Join us as we rethink how people move through cities.</p>
          </div>
        </div>

        <div className="flex flex-col w-full relative lg:pl-10">
          
          <div ref={cardRef} className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-[0px_20px_40px_rgba(0,0,0,0.04)] border border-[#111111]/5 opacity-0 relative overflow-hidden group/card w-full">
            <h3 className="font-sora font-semibold text-lg lg:text-xl mb-4 lg:mb-6 tracking-tight">Currently hiring for:</h3>
            
            <div className="flex flex-col relative z-10" onMouseLeave={() => setHoveredRole(null)}>
              
              <div className="absolute left-[-16px] w-[2px] bg-transparent h-full z-0 pointer-events-none">
                 <div 
                   className="absolute w-full bg-[#5B21B6] transition-all duration-300 ease-out"
                   style={{
                     bottom: '-40px',
                     height: hoveredRole !== null ? `calc(100% + 40px - ${(hoveredRole * 48) + 24}px)` : '0px',
                     opacity: hoveredRole !== null ? 1 : 0
                   }}
                 ></div>
                 <div 
                   className="absolute w-2 h-2 rounded-full bg-[#5B21B6] -left-[3px] transition-all duration-300 ease-out"
                   style={{
                     top: hoveredRole !== null ? `${(hoveredRole * 48) + 24}px` : 'calc(100% + 40px)',
                     opacity: hoveredRole !== null ? 1 : 0,
                     transform: hoveredRole !== null ? 'scale(1)' : 'scale(0)'
                   }}
                 ></div>
              </div>

              {roles.map((role, idx) => (
                <div 
                  key={idx} 
                  className="relative px-4 py-3 rounded-xl hover:bg-[#FAFAFA] transition-colors cursor-pointer flex items-center justify-between h-[48px]"
                  onMouseEnter={() => setHoveredRole(idx)}
                  onClick={() => window.open('https://m.9m.io/fveoexg', '_blank')}
                >
                  <span className={`font-inter font-medium text-[15px] transition-colors duration-300 ${hoveredRole === idx ? 'text-[#5B21B6]' : 'text-[#111111]'}`}>{role}</span>
                  <span className={`text-[#5B21B6] transition-all duration-300 transform ${hoveredRole === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>→</span>
                </div>
              ))}
            </div>

            <div className="mt-6 lg:mt-8 pt-5 lg:pt-6 border-t border-black/5 relative z-10 bg-white">
              <p className="text-[11px] lg:text-xs text-[#6A6A73] font-inter leading-relaxed mb-6 lg:mb-8">
                Don't see a suitable role? <br/>We're always excited to meet exceptional people.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-20">
                <button onClick={() => window.open('https://m.9m.io/fveoexg', '_blank')} className="w-full sm:flex-1 bg-[#5B21B6] hover:bg-[#7C3AED] text-white px-6 py-4 rounded-xl font-inter font-semibold text-base transition-all duration-300 shadow-[0_8px_20px_rgba(91,33,182,0.25)] hover:shadow-[0_12px_25px_rgba(91,33,182,0.35)] hover:-translate-y-0.5 relative overflow-hidden group/btn">
                  <span className="relative z-10">Apply Now</span>
                  <div className={`absolute left-0 top-0 w-1 h-full bg-white transition-opacity duration-300 ${hoveredRole !== null ? 'opacity-40' : 'opacity-0'}`}></div>
                </button>
                <button onClick={() => navigate('/contact')} className="w-full sm:flex-1 bg-[#FAFAFA] border border-[#111111]/10 hover:border-[#111111]/20 text-[#111111] px-6 py-4 rounded-xl font-inter font-semibold text-base transition-all duration-300 hover:bg-white hover:-translate-y-0.5 shadow-sm">
                  Email Us
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 lg:-bottom-8 left-0 lg:left-10 w-[calc(100%-2.5rem)] flex flex-col z-20">
            <div className="w-full h-[2px] bg-[#5B21B6]/10 relative rounded-full">
              <div ref={routeRef} className="absolute left-0 top-0 h-full w-full bg-[#5B21B6] rounded-full scale-x-0 origin-left"></div>
              <div ref={vehicleRef} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-[#5B21B6] rounded-full border-2 border-white shadow-[0_0_10px_rgba(91,33,182,0.4)] left-0"></div>
            </div>
          </div>

        </div>
        
      </div>
      
    </div>
  );
}
