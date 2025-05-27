"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

export default function ConditionalNavigation() {
  const pathname = usePathname();
  const hideNavigationRoutes = ["/auth/signup", "/auth/login"];

  if (hideNavigationRoutes.includes(pathname)) {
    return null;
  }

  return <Navigation />;
}