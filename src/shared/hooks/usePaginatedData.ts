import queryString from "query-string";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import axiosInstance from "../config/axiosClientInstance";
import { IPaginatedList } from "../types";

interface IOptions {
  endpoint: string;
  hasNextPage?: boolean;
  searchParams?: {
    [key: string | number]:
      | string
      | number
      | null;
  };
}

export function usePaginatedData<T>({
  endpoint,
  hasNextPage: hasNextPageProp,
  searchParams,
}: IOptions) {
  const [data, setData] =
    useState<IPaginatedList<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(
    (hasNextPageProp ?? true) &&
      Boolean(data?.next) &&
      typeof data?.next === "number",
  );
  const effectCalled = useRef(false);

  const loadMore = useCallback(
    (page: number) => {
      setLoading(true);
      axiosInstance
        .get<IPaginatedList<T>>(
          `${endpoint}?page=${page}${searchParams ? `&${queryString.stringify(searchParams, { skipNull: true })}` : ""}`,
        )
        .then((res) => {
          if (res?.data) {
            setData((state) =>
              state &&
              state.previous !== res.data.previous
                ? {
                    count: state.count,
                    next: res.data.next,
                    previous: res.data.previous,
                    results: state.results.concat(
                      res.data.results,
                    ),
                  }
                : res.data,
            );
            if (
              (typeof hasNextPageProp ===
                "undefined" ||
                hasNextPageProp === true) &&
              typeof res.data.next === "number"
            ) {
              setHasNextPage(
                Boolean(res.data.next),
              );
            }
          }
        })
        .finally(() => setLoading(false));
    },
    [endpoint, searchParams, hasNextPageProp],
  );

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      if (
        !loading &&
        data?.next &&
        typeof data?.next === "number"
      ) {
        loadMore(data.next);
      }
    },
    disabled: !data,
  });

  useEffect(() => {
    if (!effectCalled.current) {
      effectCalled.current = true;
      loadMore(1);
    }
  }, [loadMore]);

  return {
    sentryRef,
    data,
    setData,
    loading,
    setLoading,
    hasNextPage,
  };
}
