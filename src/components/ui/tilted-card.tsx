'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import './tilted-card.css';

const springValues = {
  damping: 35,
  stiffness: 150,
  mass: 1.5,
};

export default function TiltedCard({
  children,
  altText = 'Tilted card image',
  containerHeight = 'auto',
  containerWidth = '100%',
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5); // Start at center
  const y = useMotionValue(0.5); // Start at center

  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  
  const glareX = useTransform(x, (v) => v * 400 - 200);
  const glareY = useTransform(y, (v) => v * 400 - 200);

  function handleMouse(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!ref.current) return;
    
    // Pause auto-animation on hover
    x.stop();
    y.stop();

    const rect = ref.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;

    const offsetX = relativeX - 0.5;
    const offsetY = relativeY - 0.5;

    const rotationX = offsetY * -rotateAmplitude;
    const rotationY = offsetX * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
    
    x.set(relativeX);
    y.set(relativeY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    
    // Resume auto-animation
    startAnimation();
  }

  const startAnimation = React.useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const animateAxis = (axis, size) => {
        const sequence = [0.2, 0.8, 0.2]; // Example path
        animate(axis, sequence, {
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            onUpdate: (latest) => {
                const offset = latest - 0.5;
                const rotation = offset * (axis === y ? -rotateAmplitude : rotateAmplitude);
                (axis === y ? rotateX : rotateY).set(rotation);
            }
        });
    }

    animateAxis(x, rect.width);
    animateAxis(y, rect.height);
  }, [rotateX, rotateY, x, y, rotateAmplitude]);

  React.useEffect(() => {
    // Initial delay before starting the animation
    const timeout = setTimeout(() => {
      if (ref.current) {
        startAnimation();
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      x.stop();
      y.stop();
    };
  }, [x, y, startAnimation]);


  return (
    <motion.figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="tilted-card-inner"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        <div className="tilted-card-content">{children}</div>
        <motion.div
          className="tilted-card-glare"
          style={{
            x: glareX,
            y: glareY,
          }}
        />
      </motion.div>
    </motion.figure>
  );
}
