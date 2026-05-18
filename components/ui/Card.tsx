"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = false, className = "", children, ...props }, ref) => {
    const base =
      "rounded-none border border-[rgba(255,255,255,0.08)] bg-[#111111] p-6 md:p-8";

    if (!hoverable) {
      return (
        <div ref={ref} className={`${base} ${className}`} {...props}>
          {children}
        </div>
      );
    }

    const {
      onAnimationStart: _oas,
      onDragStart: _ods,
      onDragEnd: _ode,
      onDrag: _od,
      ...restProps
    } = props;

    return (
      <motion.div
        ref={ref}
        className={`${base} ${className} cursor-pointer group`}
        whileHover={{ borderColor: "rgba(255,230,0,0.4)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        {...restProps}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
