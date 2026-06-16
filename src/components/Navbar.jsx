import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); 
      } else {
        setIsVisible(true);  
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = ['Home', 'About Us', 'Safety', 'Careers', 'Blog', 'Press', 'Contact Us'];

  return (
    <>
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } bg-white/80 backdrop-blur-lg shadow-sm border-b border-primary/10 py-4 px-6 md:px-12`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between lg:justify-center w-full">
        
        <div className="lg:hidden flex items-center justify-between w-full">
          <div className="text-xl font-bold font-sora text-[#5B21B6]">ricky</div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -mr-2 text-[#111111] hover:text-[#5B21B6] transition-colors">
            <Menu size={28} />
          </button>
        </div>

        <div className="hidden lg:flex items-center justify-center gap-10 w-full">
          <div className="flex gap-10 mx-auto">
            {['Home', 'About', 'Safety', 'Careers', 'Contact'].map((link, idx) => {
              const target = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
              return (
                <Link 
                  key={idx} 
                  to={target}
                  className="group relative text-[#111111] font-inter font-medium text-[15px] hover:text-[#5B21B6] transition-colors py-1"
                >
                  {link}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#5B21B6] transition-all duration-300 ease-out group-hover:w-full"></span>
                </Link>
              )
            })}
          </div>
          
          <MagneticButton onClick={() => window.open('https://play.google.com/store/apps/details?id=com.arunnitd.ricky&hl=en_IN', '_blank')} className="hidden md:block bg-[#5B21B6] hover:bg-[#7C3AED] text-white px-6 py-2.5 rounded-xl transition-colors duration-300 font-inter font-medium shadow-[0_4px_14px_rgba(91,33,182,0.25)] hover:shadow-[0_6px_20px_rgba(91,33,182,0.4)]">
            Download App
          </MagneticButton>
        </div>

      </div>
    </nav>

      <div className={`fixed inset-0 bg-[#FAFAFA] z-[200] flex flex-col px-6 py-8 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex items-center justify-between mb-12">
          <div className="text-2xl font-bold font-sora text-[#5B21B6]">ricky</div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-[#111111] hover:text-[#5B21B6] transition-colors bg-white shadow-sm rounded-full">
            <X size={28} />
          </button>
        </div>
        
        <div className="flex flex-col gap-6">
          {['Home', 'About', 'Safety', 'Careers', 'Contact'].map((link, idx) => {
            const target = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
            return (
              <Link 
                key={idx} 
                to={target}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-sora font-semibold text-[#111111] hover:text-[#5B21B6] transition-colors"
              >
                {link}
              </Link>
            )
          })}
        </div>

        <div className="mt-auto pb-8">
          <MagneticButton onClick={() => window.open('https://play.google.com/store/apps/details?id=com.arunnitd.ricky&hl=en_IN', '_blank')} className="w-full bg-[#5B21B6] hover:bg-[#7C3AED] text-white px-6 py-4 rounded-xl transition-colors duration-300 font-inter font-semibold text-lg shadow-[0_8px_20px_rgba(91,33,182,0.25)] flex justify-center items-center">
            Download App
          </MagneticButton>
        </div>
      </div>
    </>
  );
}
