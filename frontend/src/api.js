// API Configuration
const API_BASE = "http://localhost:8000/api";

// API Helper
const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    };

    // Jika ada body dan dalam bentuk object, ubah ke JSON string
    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Shortcut GET method
  async get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  },

  // Shortcut POST method
  async post(endpoint, body) {
    return this.request(endpoint, { method: "POST", body });
  },

  // Shortcut PUT method
  async put(endpoint, body) {
    return this.request(endpoint, { method: "PUT", body });
  },

  // Shortcut DELETE method
  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  },
};

export default api;
