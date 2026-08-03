"use client";

import { motion } from "framer-motion";

// Scroll-entrance wrapper used across the site for a consistent fade-up
// animation. Children can be (and mostly are) server components — passing
// them through a client wrapper like this doesn't force them to become
// client components themselves.
export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  as = "section",
}) {
  const MotionTag = motion[as] || motion.section;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
