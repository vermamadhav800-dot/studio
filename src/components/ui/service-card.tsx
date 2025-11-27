'use client';

import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const ROTATION_RANGE = 20;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const ServiceCard = ({ icon, title, description, className }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30, bounce: 0.25 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30, bounce: 0.25 });

  const rotateX = useTransform(
    ySpring,
    [-0.5, 0.5],
    [`${HALF_ROTATION_RANGE}deg`, `-${HALF_ROTATION_RANGE}deg`]
  );
  const rotateY = useTransform(
    xSpring,
    [-0.5, 0.5],
    [`-${HALF_ROTATION_RANGE}deg`, `${HALF_ROTATION_RANGE}deg`]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;

    x.set(mouseX - 0.5);
    y.set(mouseY - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      variants={cardVariants}
      className={cn(
        'relative h-full w-full rounded-2xl bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-lg',
        'p-8 shadow-2xl shadow-black/40 ring-1 ring-white/10 transition-all duration-300',
        'hover:ring-purple-400/50 hover:shadow-purple-500/20',
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${x}px ${y}px,
              hsla(263, 90%, 51%, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div style={{ transform: 'translateZ(50px)' }} className="flex flex-col items-center text-center">
        <div className="mb-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-4 text-white">
          {icon}
        </div>
        <h3 className="mb-2 text-2xl font-bold font-headline text-white">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
