// src/data/navItems.ts
import { Gift, Camera, Calendar, Mail } from "lucide-react";
import type { NavItem } from "../types/types";

export const navItems: NavItem[] = [
  { id: "hero", label: "Home", icon: Gift },
  { id: "memories", label: "Memories", icon: Camera },
  { id: "reasons", label: "Reasons", icon: Calendar },
  { id: "contact", label: "Contact", icon: Mail },
  
  // ... other nav items
];