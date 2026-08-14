import type { Transition, Variants } from "motion/react";

/**
 * Reusable motion timings complying with the premium interaction budget.
 * GPU-friendly, lightweight, and calibrated for a high-end feel.
 */

export const hoverTransition: Transition = {
  duration: 0.15, // 150ms (within 120-180ms budget)
  ease: "easeInOut",
};

export const pressTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

export const enterTransition: Transition = {
  duration: 0.3, // 300ms (within 250-350ms budget)
  ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo curve (smooth, calm spring)
};

export const exitTransition: Transition = {
  duration: 0.2, // 200ms
  ease: "easeInOut",
};

/**
 * Reusable Framer Motion variants for tactile buttons, list items, modal entries,
 * and content reveals.
 */

// Tactile shrink on press, gentle scale up on hover
export const tactilePressVariants: Variants = {
  hover: {
    scale: 1.015,
    transition: hoverTransition,
  },
  tap: {
    scale: 0.97,
    transition: pressTransition,
  },
};

// Subtle reveal fade-up for list items, list elements, or sidebar options
export const listItemVariants: Variants = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0, transition: enterTransition },
  exit: { opacity: 0, y: -4, transition: exitTransition },
};

// Premium, lightweight scale-up + fade-in for dialog content
export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.985, y: 6 },
  animate: { opacity: 1, scale: 1, y: 0, transition: enterTransition },
  exit: { opacity: 0, scale: 0.985, y: 6, transition: exitTransition },
};

// General fade-up for sections or views
export const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: enterTransition },
  exit: { opacity: 0, transition: exitTransition },
};
