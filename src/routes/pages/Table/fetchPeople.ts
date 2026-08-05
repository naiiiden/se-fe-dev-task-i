import { useEffect, useState } from "react";
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
  const [page, setPage] = useState(1);
  const [data, setData] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchPeoplePage(page);
        setData(response);
        setIsOffline(false);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof TypeError) {
          setIsOffline(true);
        } else {
          setError(err instanceof Error ? err.message : "Failed to load data.");
        }
        setIsLoading(false);
      }
    }

    load();
  }, [page]);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return { data, isLoading, error, isOffline, page, setPage };
}
