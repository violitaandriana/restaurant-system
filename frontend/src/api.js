// API Configuration
const API_BASE = 'http://127.0.0.1:8000/api';

// API Helper
const api = {
  token: localStorage.getItem('token'),
  
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  },
  
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  },
  
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...(options.headers || {}),
      },
    };
    
    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};

export default api;
