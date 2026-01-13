import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { subDays, subMonths, subWeeks, subYears } from 'date-fns'
import type { TimeRange } from '@/types/article.ts'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getPageNumbers(currentPage: number, totalPages: number) {
  const maxVisiblePages = 5 // Maximum number of page buttons to show
  const rangeWithDots = []

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      rangeWithDots.push(i)
    }
  } else {
    rangeWithDots.push(1)

    if (currentPage <= 3) {
      for (let i = 2; i <= 4; i++) {
        rangeWithDots.push(i)
      }
      rangeWithDots.push('...', totalPages)
    } else if (currentPage >= totalPages - 2) {
      rangeWithDots.push('...')
      for (let i = totalPages - 3; i <= totalPages; i++) {
        rangeWithDots.push(i)
      }
    } else {
      rangeWithDots.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        rangeWithDots.push(i)
      }
      rangeWithDots.push('...', totalPages)
    }
  }

  return rangeWithDots
}


export function getDateRange(range: TimeRange) {
  const now = new Date()

  switch (range) {
    case '7d':
      return { from: formatDate(subDays(now, 7)), to: formatDate(now) }
    case '1w':
      return { from: formatDate(subWeeks(now, 1)), to: formatDate(now) }
    case '1m':
      return { from: formatDate(subMonths(now, 1)), to: formatDate(now) }
    case '1y':
      return { from: formatDate(subYears(now, 1)), to: formatDate(now) }
    default:
      return undefined
  }
}

export function formatDate(date?: Date) {
  if (!date) return ''
  return date.toISOString().slice(0, 10)
}
