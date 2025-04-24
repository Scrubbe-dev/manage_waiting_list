// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from '../api/axios';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Replace with your actual API endpoint
          const response = await axios.post('/admin/login', { email, password });
          const { token } = response.data;
          
          // Set token in axios headers for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          set({ 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Login failed' 
          });
        }
      },
      
      logout: () => {
        // Remove token from axios headers
        delete axios.defaults.headers.common['Authorization'];
        
        set({ 
          token: null, 
          isAuthenticated: false 
        });
      }
    }),
    {
      name: 'auth-storage',
      // Only persist these properties
      partialize: (state) => ({ 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);