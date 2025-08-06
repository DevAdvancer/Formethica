import { nanoid } from 'nanoid'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function generateShortCode(): string {
  return nanoid(8)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  if (!date) return 'Unknown'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
