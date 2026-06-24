import { useState, useEffect, useRef, useCallback } from 'react';

export default function CoverflowCarousel({ cards }) {
  const displayCards = cards.length < 5 ? [...cards, ...cards] : cards;
  const N = displayCards.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  
  const containerRef = useRef(null);
  const touchStartRef = useRef(0);
  const touchCurrentRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const autoplayTimerRef = useRef(null);
  const interactionTimerRef = useRef(null);
  
  const DRAG_THRESHOLD = 50; 
  const SWIPE_VELOCITY_SENSITIVITY = 150; // px distance representing a full swipe

  const normalizeIndex = useCallback((index) => {
    return ((index % N) + N) % N;
  }, [N]);

  const nextCard = useCallback(() => {
    setActiveIndex(prev => normalizeIndex(prev + 1));
  }, [normalizeIndex]);

  const prevCard = useCallback(() => {
    setActiveIndex(prev => normalizeIndex(prev - 1));
  }, [normalizeIndex]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      nextCard();
    }, 3500);
  }, [nextCard, stopAutoplay]);

  const resetAutoplayAfterInteraction = useCallback(() => {
    stopAutoplay();
    interactionTimerRef.current = setTimeout(() => {
      startAutoplay();
    }, 3000);
  }, [startAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay]);

  const handleStart = (clientX) => {
    stopAutoplay();
    setIsDragging(true);
    touchStartRef.current = clientX;
    touchCurrentRef.current = clientX;
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    touchCurrentRef.current = clientX;
    setDragOffset(clientX - touchStartRef.current);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (dragOffset < -DRAG_THRESHOLD) {
      nextCard();
    } else if (dragOffset > DRAG_THRESHOLD) {
      prevCard();
    }
    
    setDragOffset(0);
    resetAutoplayAfterInteraction();
  };

  const onMouseDown = (e) => handleStart(e.clientX);
  const onMouseMove = (e) => handleMove(e.clientX);
  const onMouseUp = handleEnd;
  const onMouseLeave = handleEnd;

  const onTouchStart = (e) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX);
  const onTouchEnd = handleEnd;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        stopAutoplay();
        nextCard();
        resetAutoplayAfterInteraction();
      } else if (e.key === 'ArrowLeft') {
        stopAutoplay();
        prevCard();
        resetAutoplayAfterInteraction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard, resetAutoplayAfterInteraction]);

  const getCardStyle = (i) => {
    let offset = i - activeIndex;
    if (offset > Math.floor(N / 2)) offset -= N;
    if (offset < -Math.floor(N / 2)) offset += N;

    const dragPercentage = dragOffset / SWIPE_VELOCITY_SENSITIVITY;
    const animatedOffset = offset - dragPercentage;
    
    const absOffset = Math.abs(animatedOffset);
    const direction = Math.sign(animatedOffset);

    if (absOffset > 2.5) {
      return {
        opacity: 0,
        transform: `translate3d(${direction * 150}%, 0, -300px) scale(0.5)`,
        zIndex: 0,
        pointerEvents: 'none',
      };
    }

    let scale = 1;
    if (absOffset > 0) scale -= 0.12 * Math.min(absOffset, 1);
    if (absOffset > 1) scale -= 0.13 * (Math.min(absOffset, 2) - 1);

    let opacity = 1;
    if (absOffset > 0) opacity -= 0.3 * Math.min(absOffset, 1);
    if (absOffset > 1) opacity -= 0.35 * (Math.min(absOffset, 2) - 1);

    let rotateY = 0;
    if (absOffset > 0) rotateY = -direction * 20 * Math.min(absOffset, 1);
    if (absOffset > 1) rotateY = -direction * (20 + 10 * (Math.min(absOffset, 2) - 1));

    let translateX = animatedOffset * 65; 
    
    let translateZ = -absOffset * 120;

    const zIndex = Math.round(100 - absOffset * 10);

    return {
      opacity: Math.max(0, opacity),
      transform: `translate3d(${translateX}%, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1), opacity 600ms ease',
    };
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pointer-events-auto">
      <div 
        ref={containerRef}
        className="relative w-full max-w-[100vw] h-[400px] md:h-[460px] flex items-center justify-center touch-pan-y"
        style={{ perspective: '1200px' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {displayCards.map((card, i) => {
          const style = getCardStyle(i);
          const isInteractive = style.opacity > 0.5;
          
          return (
            <div
              key={i}
              className="absolute w-[280px] md:w-[360px] will-change-transform cursor-grab active:cursor-grabbing select-none"
              style={{ ...style, transformStyle: 'preserve-3d' }}
              aria-hidden={!isInteractive}
            >
              <div className={`w-full h-[360px] md:h-[400px] p-6 md:p-8 rounded-[2rem] border shadow-2xl flex flex-col items-center justify-center text-center gap-4 md:gap-5 relative overflow-hidden group ${card.bgClass} ${card.borderClass}`}>
                {card.effects && card.effects()}
                
                <div className="relative z-10 shrink-0">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center ${card.iconWrapperClass}`}>
                    <card.icon size={22} className={card.iconClass} />
                  </div>
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center mt-2">
                  <h3 className={`font-sora font-semibold text-lg md:text-xl mb-2 tracking-tight ${card.titleClass}`}>{card.title}</h3>
                  <p className={`font-inter leading-relaxed text-xs md:text-sm ${card.descClass}`}>{card.desc}</p>
                </div>
                
                {card.badge && card.badge()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-8">
        {cards.map((_, i) => {
          const mappedActive = activeIndex % cards.length;
          const isActive = i === mappedActive;
          return (
            <button
              key={i}
              onClick={() => {
                stopAutoplay();
                setActiveIndex(i);
                resetAutoplayAfterInteraction();
              }}
              className={`h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'bg-[#5B21B6] w-8' : 'bg-black/10 md:bg-white/20 w-2 hover:bg-[#5B21B6]/50'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
