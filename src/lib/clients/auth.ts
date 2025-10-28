// src/lib/authClient.ts
// A lightweight helper for client-side authentication using localStorage

export type AuthUser = {
  id: number;
  username: string;
  createdAt?: string;
} | null;

export type AuthResponse = {
  user?: AuthUser;
  message?: string;
  error?: string;
};

class AuthClient {
  private baseUrl: string;
  private storageKey = "auth_user";

  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * Register a new user
   */
  async register(username: string, password: string): Promise<AuthResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        return { error: errorData.error || errorData.message || "Registration failed" };
      }
      
      return await res.json();
    } catch (err) {
      console.error("Register error:", err);
      return { error: "Network error" };
    }
  }

  /**
   * Login user and store credentials in localStorage
   */
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const res = await fetch(`${this.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        return { error: errorData.error || errorData.message || "Login failed" };
      }
      
      const data = await res.json();
      
      // Store user data and credentials in localStorage
      if (data.user) {
        const authData = {
          user: data.user,
          username,
          password,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem(this.storageKey, JSON.stringify(authData));
        console.log("Login successful, data stored in localStorage");
      }
      
      return data;
    } catch (err) {
      console.error("Login error:", err);
      return { error: "Network error" };
    }
  }

  /**
   * Logout and clear localStorage
   */
  async logout(): Promise<AuthResponse> {
    try {
      localStorage.clear();
      console.log("Logged out, localStorage cleared");
      return { message: "Logged out successfully" };
    } catch (err) {
      console.error("Logout error:", err);
      return { error: "Logout failed" };
    }
  }

  /**
   * Get currently authenticated user from localStorage
   */
  async me(): Promise<AuthUser> {
    try {
      const stored = localStorage.getItem(this.storageKey);
      
      if (!stored) {
        console.log("No user data in localStorage");
        return null;
      }
      
      const authData = JSON.parse(stored);
      console.log("Retrieved user from localStorage:", authData.user);
      
      return authData.user || null;
    } catch (err) {
      console.error("Me error:", err);
      return null;
    }
  }

  /**
   * Get stored credentials (if needed for re-authentication)
   */
  getStoredCredentials(): { username: string; password: string } | null {
    try {
      const stored = localStorage.getItem(this.storageKey);
      
      if (!stored) {
        return null;
      }
      
      const authData = JSON.parse(stored);
      
      if (authData.username && authData.password) {
        return {
          username: authData.username,
          password: authData.password,
        };
      }
      
      return null;
    } catch (err) {
      console.error("Get credentials error:", err);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const stored = localStorage.getItem(this.storageKey);
    return !!stored;
  }
}

const authClient = new AuthClient();
export default authClient;