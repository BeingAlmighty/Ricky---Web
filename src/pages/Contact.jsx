import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const routeRef = useRef(null);

  const [hoveredSocial, setHoveredSocial] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.anim-text', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      )
      .fromTo(routeRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'left center' },
        "-=0.5"
      )
      .fromTo('.anim-contact',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        "-=0.8"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const socials = [
    { name: 'LINKEDIN', url: 'https://www.linkedin.com/company/bookricky/' },
    { name: 'INSTAGRAM', url: 'https://www.instagram.com/ride_on_ricky/' },
    { name: 'FACEBOOK', url: 'https://www.facebook.com/people/Ricky/61578159554591/' }
  ];

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-gradient-to-b from-[#FAFAFA] to-[#F4F4F7] pt-[100px] lg:pt-[120px] pb-16 flex flex-col items-center justify-center text-[#111111]">
      
      <div className="max-w-7xl w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center z-10">
        
        <div ref={leftRef} className="flex flex-col">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sora font-bold tracking-tight leading-[1.1] mb-8">
            <div className="overflow-hidden pb-2"><div className="anim-text">Let's start a</div></div>
            <div className="overflow-hidden pb-2"><div className="anim-text text-[#5B21B6]">conversation.</div></div>
          </h1>
          
          <div className="w-24 h-[2px] bg-[#5B21B6]/10 relative rounded-full mb-8 overflow-hidden anim-text opacity-0">
             <div ref={routeRef} className="absolute inset-0 bg-[#5B21B6] rounded-full scale-x-0 origin-left"></div>
          </div>

          <p className="anim-text opacity-0 text-lg md:text-xl text-[#6A6A73] font-inter max-w-md leading-relaxed">
            Questions, partnerships, media inquiries, or feedback—we'd love to hear from you.
          </p>
        </div>

        <div ref={rightRef} className="flex flex-col gap-8 lg:pl-16">
          
          <div className="flex flex-col gap-6">
            <div className="anim-contact opacity-0 group cursor-pointer inline-block w-fit">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6A6A73] mb-2">Phone</span>
              <div className="relative">
                <a href="tel:+918860670671" className="text-2xl md:text-3xl font-sora font-medium group-hover:text-[#5B21B6] transition-colors duration-300 relative z-10">+91 88606 70671</a>
                <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#5B21B6] transition-all duration-500 ease-out group-hover:w-full"></div>
              </div>
            </div>

            <div className="anim-contact opacity-0 group cursor-pointer inline-block w-fit">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6A6A73] mb-2">Support</span>
              <div className="relative">
                <a href="mailto:support@bookricky.in" className="text-2xl md:text-3xl font-sora font-medium group-hover:text-[#5B21B6] transition-colors duration-300 relative z-10">support@bookricky.in</a>
                <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#5B21B6] transition-all duration-500 ease-out group-hover:w-full"></div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-black/5 my-2 anim-contact opacity-0"></div>

          <div className="flex flex-col gap-2">
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6A6A73] mb-4 anim-contact opacity-0">Socials</span>
            {socials.map((social, idx) => (
              <div 
                key={social.name}
                className="anim-contact opacity-0 group flex items-center justify-between py-3 cursor-pointer relative"
                onMouseEnter={() => setHoveredSocial(idx)}
                onMouseLeave={() => setHoveredSocial(null)}
                onClick={() => window.open(social.url, '_blank')}
              >
                <span className={`text-xl md:text-2xl font-inter font-medium transition-all duration-500 ease-out ${hoveredSocial === idx ? 'text-[#5B21B6] translate-x-6' : 'text-[#111111]'}`}>
                  {social.name}
                </span>
                
                <span className={`text-[#5B21B6] text-xl transition-all duration-500 ease-out transform ${hoveredSocial === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
                  →
                </span>

                <div 
                  className="absolute bottom-0 left-0 h-[1px] bg-[#5B21B6] transition-all duration-500 ease-out origin-left"
                  style={{
                    width: hoveredSocial === idx ? '100%' : '0%',
                    opacity: hoveredSocial === idx ? 1 : 0
                  }}
                ></div>
              </div>
            ))}
          </div>
          
        </div>
        
      </div>
      
    </div>
  );
}
