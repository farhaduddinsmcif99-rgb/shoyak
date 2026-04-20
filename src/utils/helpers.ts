import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, lang: 'bn' | 'en') {
  if (lang === 'bn') {
    return price.toLocaleString('bn-BD') + ' ৳';
  }
  return '৳ ' + price.toLocaleString('en-IN');
}
