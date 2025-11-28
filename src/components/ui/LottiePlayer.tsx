"use client";
import Lottie, { LottieComponentProps } from 'lottie-react';
import { useState, useEffect } from 'react';

const LottiePlayer = (props: LottieComponentProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  return <Lottie {...props} />;
};

export { LottiePlayer };
