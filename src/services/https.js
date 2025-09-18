import { useCallback, useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      setLoading(true);
      try {
        const resJson = await fetch(url, { method, body, headers });
        if (!resJson.ok) {
          throw new Error(resJson.status);
        }
        const data = await resJson.json();
        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(null), []);
  return { loading, request, error, clearError };
};

export default useHttp;
