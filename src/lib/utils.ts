import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  // Simple ETH formatting for now
  return `${amount} ETH`;
}

export function isDeadlinePassed(deadline: number): boolean {
  return new Date().getTime() > deadline;
}
