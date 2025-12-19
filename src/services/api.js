const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
const API_BASE = rawUrl.replace(/\/+$/, "") + "/api";

let token = null;

function headers() {
  const h = { "Content-Type": "application/json" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function request(path, options = {}) {
  try {
    console.log(`Making API request: ${options.method || 'GET'} ${API_BASE}${path}`);
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { ...headers(), ...(options.headers || {}) }
    });
    
    if (!res.ok) {
      let errorMsg;
      try {
        const errorData = await res.json();
        errorMsg = errorData.error || errorData.message || `HTTP ${res.status}`;
      } catch {
        errorMsg = await res.text() || `HTTP ${res.status}`;
      }
      throw new Error(errorMsg);
    }
    
    const data = await res.json();
    console.log(`API response:`, data);
    return data;
  } catch (error) {
    console.error(`API request failed: ${error.message}`);
    // Fallback to mock data if backend is not available
    if (error.name === 'TypeError' || error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
      console.log('Backend unavailable, using mock data as fallback');
      const { mockApi } = await import('./mockApi.js');
      const method = options.method?.toLowerCase() || 'get';
      const body = options.body ? JSON.parse(options.body) : {};
      return mockApi[method](path, body);
    }
    throw error;
  }
}

const api = {
  setToken: t => (token = t),
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  del: (path) => request(path, { method: "DELETE" })
};

export default api;