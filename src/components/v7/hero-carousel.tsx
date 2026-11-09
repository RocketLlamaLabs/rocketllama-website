"use client";

import { useEffect } from "react";
import { mountHero } from "./behavior/hero";

// Mounts the banner carousel behaviour (src/components/v7/behavior/hero.js).
export function HeroCarousel() {
  useEffect(mountHero, []);
  return null;
}
