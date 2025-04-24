import { create } from 'zustand';
import axios from '../api/axios';

export interface UserMessage {
  id: string;
  fullname: string;
  company: string;
  message: string;
  role: string;
  createdAt: string;
}

type UserRole = "CISO" | "SECURITY_ENGINEER" | "SOC_ANALYST" | "IT_MANAGER" | "OTHERS";

interface QueryParams {
  page: number;
  limit: number;
  role?: UserRole;
  search?: string;
}

interface MetaData {
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface MessageState {
  messages: UserMessage[];
  filteredMessages: UserMessage[];
  isLoading: boolean;
  isFiltering: boolean;
  error: string | null;
  meta: MetaData | null;
  queryParams: QueryParams;
  fetchAllMessages: () => Promise<void>;
  fetchFilteredMessages: (params?: Partial<QueryParams>) => Promise<void>;
  setQueryParams: (params: Partial<QueryParams>) => void;
  resetFilters: () => void;
}

const initialQueryParams: QueryParams = {
  page: 1,
  limit: 10,
};

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  filteredMessages: [],
  isLoading: false,
  isFiltering: false,
  error: null,
  meta: null,
  queryParams: initialQueryParams,

  fetchAllMessages: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('/all-users');
      set({ 
        messages: response.data,
        filteredMessages: response.data,
        isLoading: false,
        meta: null // No meta for all users
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch all messages'
      });
    }
  },

  fetchFilteredMessages: async (params = {}) => {
    const currentParams = get().queryParams;
    const newParams = { ...currentParams, ...params };
    
    set({ isFiltering: true, error: null, queryParams: newParams });
    
    try {
      const response = await axios.get('/get-waiting', {
        params: {
          page: newParams.page,
          limit: newParams.limit,
          role: newParams.role,
          search: newParams.search
        }
      });
      
      set({ 
        filteredMessages: response.data.data,
        meta: response.data.meta,
        isFiltering: false
      });
    } catch (error) {
      set({
        isFiltering: false,
        error: error instanceof Error ? error.message : 'Failed to fetch filtered messages'
      });
    }
  },

  setQueryParams: (params) => {
    set(state => ({
      queryParams: { ...state.queryParams, ...params }
    }));
  },

  resetFilters: () => {
    set({ 
      queryParams: initialQueryParams,
      filteredMessages: get().messages
    });
  }
}));