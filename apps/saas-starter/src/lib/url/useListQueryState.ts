"use client";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

type ListQueryState = {
  page: number;
  pageSize: number;
  q: string;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  setQ: (value: string) => void;
};

export const useListQueryState = (): ListQueryState => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(20)
  );
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));

  return { page, pageSize, q, setPage, setPageSize, setQ };
};
