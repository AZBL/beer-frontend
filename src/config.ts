const API_BASE_URL: string =
  import.meta.env.MODE === "development"
    ? "" // Empty string for local, since Vite proxy handles it
    : (import.meta.env.VITE_API_TARGET as string);

export { API_BASE_URL };
