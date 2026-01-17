"use client";

import { motion, useScroll, useTransform, type Variants, type HTMLMotionProps } from "framer-motion";
import { ReactNode, useRef } from "react";

/**
 * BLUECREW MOTION COMPONENTS
 * Greenhouse-style smooth animations
 * 
 * Usage:
 *   <FadeUp>Content</FadeUp>
 *   <FadeUp delay={0.2}>Delayed content</FadeUp>
 *   <StaggerContainer><FadeUp>1</FadeUp><FadeUp>2</FadeUp></StaggerContainer>
 */

// ============================================
// VARIANTS
// ============================================

export const fadeUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
    }
  }
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const fadeLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20 // Subtle drift from left
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

export const fadeRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 20 // Subtle drift from right
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

export const scaleUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

// ============================================
// COMPONENTS
// ============================================

interface MotionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Fade up animation - the workhorse
 * Elements fade in while sliding up from below
 * SEO: Content renders visible (opacity:1) in HTML, animation triggers on client
 */
export function FadeUp({ 
  children, 
  delay = 0, 
  className = "",
  ...props 
}: MotionProps) {
  return (
    <motion.div
      initial="visible" // SEO: Render visible in SSR HTML
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUpVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Simple fade in
 * SEO: Content renders visible in HTML
 */
export function FadeIn({ 
  children, 
  delay = 0, 
  className = "",
  ...props 
}: MotionProps) {
  return (
    <motion.div
      initial="visible" // SEO: Render visible in SSR HTML
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fade from left - subtle smoke drift
 * Perfect for alternating content sections
 */
export function FadeLeft({ 
  children, 
  delay = 0, 
  className = "",
  ...props 
}: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeLeftVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fade from right - subtle smoke drift
 * Perfect for alternating content sections
 */
export function FadeRight({ 
  children, 
  delay = 0, 
  className = "",
  ...props 
}: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeRightVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale up - good for cards, images
 */
export function ScaleUp({ 
  children, 
  delay = 0, 
  className = "",
  ...props 
}: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={scaleUpVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container - wraps children that animate sequentially
 * Use with StaggerItem children
 */
export function StaggerContainer({ 
  children, 
  className = "",
  ...props 
}: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger item - use inside StaggerContainer
 */
export function StaggerItem({ 
  children, 
  className = "",
  ...props 
}: MotionProps) {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hero text animation - staggered words/lines
 */
export function HeroText({ 
  children, 
  delay = 0,
  className = "",
  ...props 
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll fade - Greenhouse style
 * Opacity progressively increases 0-100% as element enters viewport
 * Smooth continuous fade tied to scroll position
 */
export function ScrollFade({ 
  children, 
  className = "",
  ...props 
}: Omit<MotionProps, 'delay'>) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hover scale - wrap interactive elements
 */
export function HoverScale({ 
  children, 
  scale = 1.02,
  className = "",
  ...props 
}: MotionProps & { scale?: number }) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide in from left
 */
export function SlideInLeft({ 
  children, 
  delay = 0, 
  className = "",
  ...props 
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide in from right
 */
export function SlideInRight({ 
  children, 
  delay = 0, 
  className = "",
  ...props 
}: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// MOTION VARIANTS FOR DIRECT USE
// ============================================

export const motionConfig = {
  viewport: { once: true, margin: "-50px" },
  transition: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94],
  }
};


