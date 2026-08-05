import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Person } from "./types";
import { ensureMinDelay } from "../../../utils/delay";
import { getCachedData, setCachedData } from "../../../utils/cache";

interface APIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

async function fetchPeoplePage(page: number): Promise<APIResponse> {
  const res = await fetch(`https://swapi.py4e.com/api/people/?page=${page}`);
  if (!res.ok) {
    throw new Error(`SWAPI request failed (${res.status})`);
  }
  return res.json();
}

export function usePeople() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const page = isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;

  const setPage = useCallback(
    (newPage: number) => {
      setSearchParams({ page: newPage.toString() });
    },
    [setSearchParams],
  );

  const [data, setData] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const refetch = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  const lastSuccessfulPage = useRef(0);

  useEffect(() => {
    async function load() {
      const startTime = Date.now();

      const cacheKey = `se-fe-dev-task-i-page-${page}`;
      const cachedData = getCachedData(cacheKey);

      if (cachedData) {
        setData(cachedData);

        setIsLoading(false);
        setError(null);
        lastSuccessfulPage.current = page;
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchPeoplePage(page);

        setCachedData(cacheKey, response);

        await ensureMinDelay(startTime);
        setData(response);
        lastSuccessfulPage.current = page;
        setIsLoading(false);
      } catch (err) {
        await ensureMinDelay(startTime);

        if (err instanceof TypeError) {
          setIsOfflineModalOpen(true);
          const rollbackPage =
            lastSuccessfulPage.current === 0 ? 1 : lastSuccessfulPage.current;
          setPage(rollbackPage);
        } else {
          setError(err instanceof Error ? err.message : "Failed to load data.");
          setData(null);
        }
        setIsLoading(false);
      }
    }

    load();
  }, [page, setPage, retryCount]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOfflineModalOpen(false);
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return {
    data,
    isLoading,
    error,
    isOfflineModalOpen,
    setIsOfflineModalOpen,
    page,
    setPage,
    refetch,
  };
}
