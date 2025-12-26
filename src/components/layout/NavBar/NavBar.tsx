"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Logo from "@/components/common/Logo/Logo";
import NavLink from "@/components/common/NavLink/NavLink";
import { ROUTES } from "@/constants/routes";

export default function NavBar() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.95)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 50], [0, 8]);
  const backdropFilter = useTransform(
    backdropBlur,
    (blur) => `blur(${blur}px)`
  );
  const shadowOpacity = useTransform(scrollY, [0, 50], [0, 0.3]);
  const boxShadow = useTransform(
    shadowOpacity,
    (opacity) =>
      `0 4px 6px -1px rgba(0, 0, 0, ${opacity}), 0 2px 4px -1px rgba(0, 0, 0, ${
        opacity * 0.5
      })`
  );

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20"
      style={{
        backgroundColor,
        backdropFilter,
        boxShadow,
      }}
    >
      <div className="flex sm:flex-row justify-between items-center gap-3 sm:gap-4 py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 w-auto justify-end">
          <NavLink href={ROUTES.invite} external>
            Request an invite
          </NavLink>
          <NavLink href={ROUTES.app}>Open the app</NavLink>
        </nav>
      </div>
    </motion.header>
  );
}
