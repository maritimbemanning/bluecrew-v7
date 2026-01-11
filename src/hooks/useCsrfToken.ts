"use client";

import { useEffect, useState } from "react";

/**
 * Hook to fetch and manage CSRF token for form submissions
 * Token is fetched on mount and cached in state
 */
export function useCsrfToken() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void refresh();
  }, []);

  async function refresh(): Promise<string | null> {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/csrf", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch CSRF token");
      }

      const data = await response.json();
      if (data.success && data.data?.token) {
        setToken(data.data.token);
        return data.data.token;
      }

      throw new Error("Invalid CSRF token response");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setToken(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return { token, error, isLoading, refresh };
}
