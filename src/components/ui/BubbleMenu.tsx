'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './BubbleMenu.css';

interface MenuItem {
  label: string;
  href: string;
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
  className?: string;
  style?: React.CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
}

const DEFAULT_ITEMS: MenuItem[] = [
  {
    label: 'VISION',
    href: '#about',
    ariaLabel: 'Vision',
    rotation: -2,
    hoverStyles: { bgColor: '#BAFF00', textColor: '#000000' }
  },
  {
    label: 'ARCHIVES',
    href: '#archives',
    ariaLabel: 'Archives',
    rotation: 2,
    hoverStyles: { bgColor: '#BAFF00', textColor: '#000000' }
  },
  {
    label: 'EVENTS',
    href: '#schedule',
    ariaLabel: 'Events',
    rotation: -2,
    hoverStyles: { bgColor: '#BAFF00', textColor: '#000000' }
  },
  {
    label: 'VAULT',
    href: '#vault',
    ariaLabel: 'Vault',
    rotation: 2,
    hoverStyles: { bgColor: '#BAFF00', textColor: '#000000' }
  }
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#111',
  menuContentColor = '#BAFF00',
  useFixedPosition = true,
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

  const menuItems = items?.length ? items : DEFAULT_ITEMS;
  const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className]
    .filter(Boolean)
    .join(' ');

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
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
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
      <nav className={containerClassName} style={style} aria-label="Main navigation">
        <div className="bubble logo-bubble" aria-label="Logo" style={{ background: menuBg, border: `1px solid ${menuContentColor}20` }}>
          <span className="logo-content text-primary font-black tracking-tighter uppercase text-sm">
            {logo}
          </span>
        </div>

        <button
          type="button"
          className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{ background: menuBg, border: `1px solid ${menuContentColor}20` }}
        >
          <span className="menu-line" style={{ background: menuContentColor }} />
          <span className="menu-line short mt-1.5" style={{ background: menuContentColor, width: '18px' }} />
        </button>
      </nav>
      {showOverlay && (
        <div
          ref={overlayRef}
          className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'}`}
          aria-hidden={!isMenuOpen}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={handleToggle} />
          <ul className="pill-list" role="menu" aria-label="Menu links">
            {menuItems.map((item, idx) => (
              <li key={idx} role="none" className="pill-col">
                <a
                  role="menuitem"
                  href={item.href}
                  onClick={handleToggle}
                  aria-label={item.ariaLabel || item.label}
                  className="pill-link font-heading font-black"
                  style={{
                    '--item-rot': `${item.rotation ?? 0}deg`,
                    '--pill-bg': menuBg,
                    '--pill-color': '#fff',
                    '--hover-bg': item.hoverStyles?.bgColor || '#BAFF00',
                    '--hover-color': item.hoverStyles?.textColor || '#000'
                  } as React.CSSProperties}
                  ref={el => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                >
                  <span
                    className="pill-label"
                    ref={el => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
