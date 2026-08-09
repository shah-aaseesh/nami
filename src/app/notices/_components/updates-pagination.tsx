import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { noticesCopy } from "./notices-copy";

export const PAGE_SIZE = 6;

const SIBLINGS = 1;

type PageSlot =
  | { readonly kind: "page"; readonly page: number }
  | { readonly kind: "gap"; readonly after: number };

function pageSlots(current: number, pageCount: number): readonly PageSlot[] {
  const shown = new Set<number>([1, pageCount]);
  for (let page = current - SIBLINGS; page <= current + SIBLINGS; page += 1) {
    if (page >= 1 && page <= pageCount) shown.add(page);
  }

  const slots: PageSlot[] = [];
  let previous = 0;
  for (const page of [...shown].sort((a, b) => a - b)) {
    if (previous !== 0 && page - previous > 1) {
      slots.push({ kind: "gap", after: previous });
    }
    slots.push({ kind: "page", page });
    previous = page;
  }
  return slots;
}

export function UpdatesPagination({
  current,
  onSelect,
  pageCount,
}: {
  readonly current: number;
  readonly onSelect: (page: number) => void;
  readonly pageCount: number;
}) {
  return (
    <Pagination aria-label={noticesCopy.pagination.label}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={current === 1}
            onClick={() => onSelect(current - 1)}
            text={noticesCopy.pagination.previous}
          />
        </PaginationItem>

        {pageSlots(current, pageCount).map((slot) =>
          slot.kind === "gap" ? (
            <PaginationItem key={`gap-${slot.after}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${slot.page}`}>
              <PaginationLink
                aria-label={noticesCopy.pagination.page(slot.page)}
                isActive={slot.page === current}
                onClick={() => onSelect(slot.page)}
              >
                {slot.page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            disabled={current === pageCount}
            onClick={() => onSelect(current + 1)}
            text={noticesCopy.pagination.next}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
