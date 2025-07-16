// src/types/types.ts
export interface Memory {
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface Reason {
  icon: React.ComponentType<{ size?: number }>;
  text: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}