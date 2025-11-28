
'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import './TiltableImage.css';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export const TiltableImage = ({
  src,
  alt,
  className,
  rotateAmplitude = 14,
  scaleOnHover = 1.05,
}: {
  src: string;
  alt: string;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className="tilt-container"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '800px',
      }}
    >
      <motion.div
        className="tilt-inner"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={800}
          height={800}
          className={cn('object-contain', className)}
          priority
        />
      </motion.div>
    </motion.div>
  );
};
