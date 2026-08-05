import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Person } from "./types";

interface APIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

function getCachedData(key: string, ttlMs: number) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const payload = JSON.parse(raw);
    const isExpired = Date.now() - payload.timestamp > ttlMs;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return payload.data;
  } catch (err) {
    console.warn("Error reading from localStorage cache:", err);
    return null;
  }
}

function setCachedData(key: string, data: APIResponse) {
  try {
    const payload = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (err) {
    console.warn("Error writing to localStorage cache:", err);
  }
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
  const lastSuccessfulPage = useRef(0);

  useEffect(() => {
    async function load() {
      const cacheKey = `se-fe-dev-task-i-page-${page}`;
      const cachedData = getCachedData(cacheKey, 5 * 60 * 1000); // min * sec * ms

      if (cachedData) {
        setData(cachedData);

        setIsLoading(false);
        setError(null);
        setIsOfflineModalOpen(false);
        lastSuccessfulPage.current = page;
        return;
      }

      setIsLoading(true);
      setError(null);
      setIsOfflineModalOpen(false);

      try {
        const response = await fetchPeoplePage(page);

        setCachedData(cacheKey, response);

        setData(response);
        lastSuccessfulPage.current = page;
        setIsLoading(false);
      } catch (err) {
        if (err instanceof TypeError) {
          setIsOfflineModalOpen(true);
        } else {
          setError(err instanceof Error ? err.message : "Failed to load data.");
        }
        setIsLoading(false);
        const rollbackPage =
          lastSuccessfulPage.current === 0 ? 1 : lastSuccessfulPage.current;
        setPage(rollbackPage);
      }
    }

    load();
  }, [page, setPage]);

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
  };
}
