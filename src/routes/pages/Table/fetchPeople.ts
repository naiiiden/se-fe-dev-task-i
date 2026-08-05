import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Person } from "./types";

interface APIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export const PAGE_SIZE = 10;

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
  const [isOffline, setIsOffline] = useState(false);
  const lastSuccessfulPage = useRef(0);

  useEffect(() => {
    if (page === lastSuccessfulPage.current) {
      return;
    }

    async function load() {
      setIsLoading(true);
      setError(null);
      setIsOffline(false);

      try {
        const response = await fetchPeoplePage(page);
        setData(response);
        lastSuccessfulPage.current = page;
        setIsLoading(false);
      } catch (err) {
        if (err instanceof TypeError) {
          setIsOffline(true);
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
      setIsOffline(false);
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return { data, isLoading, error, isOffline, setIsOffline, page, setPage };
}
