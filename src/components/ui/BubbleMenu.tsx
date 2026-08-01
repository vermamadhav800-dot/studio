
'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { X } from 'lucide-react';
import './BubbleMenu.css';

interface MenuItem {
  label: string;
  href: string;
  thumbnail?: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
}

interface BubbleMenuProps {
  logo?: React.ReactNode;
  onMenuClick?: (open: boolean) => void;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
}

export default function BubbleMenu({
  logo,
  onMenuClick,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const menuItems = items || [];

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean) as HTMLAnchorElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[];

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { x: 50, autoAlpha: 0, transformOrigin: '100% 50%' });
      gsap.set(labels, { x: 20, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay;
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          x: 0,
          autoAlpha: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              x: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            `-=${animationDuration * 0.8}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to([bubbles, labels], {
        x: 20,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  return (
    <>
      <nav className="fixed top-8 right-8 z-[100] flex items-center gap-4 pointer-events-auto">
        <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 p-4 flex items-center gap-4 shadow-2xl rounded-full">
          {logo && (
            <div className="flex items-center justify-center">
              {logo}
            </div>
          )}
          <button
            type="button"
            className={`flex flex-col items-center justify-center gap-1.5 w-6 h-6 group`}
            onClick={handleToggle}
            aria-label="Toggle menu"
          >
            <span className="w-6 h-[2px] bg-primary group-hover:w-4 transition-all" />
            <span className="w-4 h-[2px] bg-primary group-hover:w-6 transition-all" />
          </button>
        </div>
      </nav>

      {showOverlay && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[998] flex items-center justify-end"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={handleToggle} />
          
          <div className="relative w-full h-full flex items-center justify-between px-12 md:px-24">
             <div className="hidden lg:block">
                <h2 className="text-[15vw] font-black tracking-tighter leading-none text-white/5 select-none pointer-events-none uppercase font-anton italic">
                  C9 CLUB
                </h2>
             </div>

             <div className="w-full max-w-[360px] flex flex-col items-end gap-4">
                <button 
                  onClick={handleToggle}
                  className="w-[54px] h-[54px] bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 hover:bg-primary hover:text-black transition-all rounded-[18px]"
                >
                  <X className="w-6 h-6" />
                </button>

                <ul className="w-full flex flex-col gap-4">
                  {menuItems.map((item, idx) => (
                    <li key={idx} className="w-full">
                      <a
                        href={item.href}
                        onClick={handleToggle}
                        className="group relative flex items-center justify-between w-[340px] h-[88px] px-8 bg-zinc-900/80 border border-white/10 overflow-hidden hover:bg-primary hover:text-black hover:-translate-x-[10px] transition-all duration-300 rounded-[24px]"
                        ref={el => {
                          if (el) bubblesRef.current[idx] = el;
                        }}
                      >
                        {item.thumbnail && (
                          <div className="absolute inset-0 opacity-35 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                            <Image 
                              src={item.thumbnail} 
                              alt="" 
                              fill 
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/45 group-hover:from-primary/20 group-hover:to-primary/10 transition-all" />
                          </div>
                        )}
                        <span
                          className="relative z-10 text-[20px] font-black tracking-tighter uppercase font-heading"
                          ref={el => {
                            if (el) labelRefs.current[idx] = el;
                          }}
                        >
                          {item.label}
                        </span>
                        <div className="w-2 h-2 bg-primary group-hover:bg-black transition-colors" />
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 w-full flex justify-between px-4 text-[10px] font-black tracking-widest text-white/40 uppercase font-heading">
                   <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                   <a href="#" className="hover:text-primary transition-colors">Strava</a>
                   <a href="#" className="hover:text-primary transition-colors">Discord</a>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
}
