"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import './ScrollStack.css';

type Item = {
  id: string;
  client: string;
  liveProjectLink: string;
  images: ImagePlaceholder[];
};

type ScrollStackProps = {
  items: Item[];
  className?: string;
};

export const ScrollStack = ({ items, className }: ScrollStackProps) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div ref={containerRef} className={cn("scroll-stack-container", className)}>
      {items.map((item, i) => {
        const targetScale = 1 - (items.length - i) * 0.05;

        const scale = useTransform(
          scrollYProgress,
          [i / items.length, 1],
          [1, targetScale]
        );

        const opacity = useTransform(
          scrollYProgress,
          [i / items.length, (i + 1) / items.length],
          [1, 0]
        );

        return (
          <motion.div
            key={item.id}
            className="scroll-stack-card-container"
            style={{
              scale,
              top: `calc(${i * 2.5}rem + 6rem)`, 
            }}
          >
            <motion.div
              className="scroll-stack-card"
              style={{
                opacity: i === items.length - 1 ? 1 : opacity,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold text-gray-500">{item.id}</span>
                  <div>
                    <p className="text-xs text-gray-400">CLIENT</p>
                    <p className="font-semibold text-white">{item.client}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild className="bg-white text-black hover:bg-gray-200 hover:text-black">
                  <Link href={item.liveProjectLink}>LIVE PROJECT</Link>
                </Button>
              </div>
              <div className="border-b border-gray-800 mb-6"></div>
              <div className="grid grid-cols-3 gap-4 h-[400px]">
                <div className="col-span-2 relative rounded-lg overflow-hidden">
                  <Image src={item.images[0].imageUrl} alt={item.images[0].description} fill className="object-cover" data-ai-hint={item.images[0].imageHint} />
                </div>
                <div className="col-span-1 grid grid-rows-2 gap-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <Image src={item.images[1].imageUrl} alt={item.images[1].description} fill className="object-cover" data-ai-hint={item.images[1].imageHint} />
                  </div>
                  <div className="relative rounded-lg overflow-hidden">
                    <Image src={item.images[2].imageUrl} alt={item.images[2].description} fill className="object-cover" data-ai-hint={item.images[2].imageHint} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};
