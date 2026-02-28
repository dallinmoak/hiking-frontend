import { createAuthClient } from "@neondatabase/neon-js/auth";

const authClient = createAuthClient(import.meta.env.VITE_NEON_AUTH_URL);

const attachAuthToken = async (request) => {
  try {
    const { data, error } = await authClient.getSession();

    const token = data?.session?.token;
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    } else if (error) {
      console.error("Error retrieving auth session:", error);
    }
  } catch (e) {
    console.error("Error attaching auth token:", e);
  }
  return request;
};

const authFetch = async (url, options = {}) => {
  const request = new Request(url, options);
  const authenticatedRequest = await attachAuthToken(request);
  return fetch(authenticatedRequest);
};

export { authClient, authFetch };
