import { useEffect, useState } from "react";
import { HealthSchema, Health } from "@repo/schemas";
import { getErrorAsError } from "@/lib/utils";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface CheckHealthHookProps {
  /**
   * The interval in milliseconds to refresh the health status.
   *
   * If not provided or undefined, the health status will not be refreshed.
   */
  shouldRefresh?: number;
}

export default function useCheckHealth(props?: CheckHealthHookProps) {
  const [isHealthy, setIsHealthy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const { shouldRefresh } = props ?? {};

  async function checkHealth() {
    setIsChecking(true);
    try {
      const response = await fetch(`${BACKEND_URL}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const health: Health = HealthSchema.parse(await response.json());
      setIsHealthy(health.ok);
      setError(health.message ?? null);
    } catch (err) {
      const e = getErrorAsError(err);
      setError(e.message);
      setIsHealthy(false);
    } finally {
      setIsChecking(false);
    }
  }

  useEffect(() => {
    checkHealth();

    if (shouldRefresh) {
      const interval = setInterval(() => {
        checkHealth();
      }, shouldRefresh);

      return () => clearInterval(interval);
    }
  }, [shouldRefresh]);

  return {
    /**
     * Whether the API is healthy
     */
    isHealthy,

    /**
     * The error message if the API is not healthy
     */
    error,

    /**
     * Re-check the health of the API
     */
    checkHealth,

    /**
     * Whether the health check is in progress
     */
    isChecking,
  };
}
