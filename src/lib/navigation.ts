import type { Route } from "next";

export type NavItem = {
  label: string;
  href: Route;
  section?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Tools", href: "/tools" },
];

export const SITE_NAME = "Cole Ward";
