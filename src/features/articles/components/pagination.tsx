import { getPageNumbers } from '@/lib/utils.ts'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface Props {
  page: number
  total: number
  pageSize: number
  onChange: (page: number) => void
}

export function ArticlePagination({ page, total, pageSize, onChange }: Props) {
  const totalPages = Math.ceil(total / pageSize)
  const pages = getPageNumbers(page, totalPages)
  if (totalPages <= 1) return null

  return (
    <Pagination className='mt-8'>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            onClick={() => onChange(1)}
            aria-disabled={page === 1}
          >
            «
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious onClick={() => onChange(Math.max(1, page - 1))} />
        </PaginationItem>
        {pages.map((p, i) => (
          <PaginationItem key={i}>
            {p === '...' ? (
              <span className='px-3 text-muted-foreground'>…</span>
            ) : (
              <PaginationLink
                isActive={p === page}
                onClick={() => onChange(p as number)}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onChange(Math.min(totalPages, page + 1))}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => onChange(totalPages)}
            aria-disabled={page === totalPages}
          >
            »
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
