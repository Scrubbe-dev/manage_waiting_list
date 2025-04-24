import { CompanyData } from "@/types";

export function filterCompanyData(
    data: CompanyData[],
    filters: {
      id?: string;
      company?: string | RegExp;
      email?: string | RegExp;
      fullName?: string | RegExp;
      role?: string;
      searchText?: string; 
      createdAtRange?: { start?: Date; end?: Date };
    }
  ): CompanyData[] {
    return data.filter((item) => {
      if (filters.id && item.id !== filters.id) return false;
  
      // Filter by company name (exact or regex)
      if (filters.company) {
        if (typeof filters.company === 'string') {
          if (!item.company.includes(filters.company)) return false;
        } else if (!filters.company.test(item.company)) return false;
      }
  
      // Filter by email (exact or regex)
      if (filters.email) {
        if (typeof filters.email === 'string') {
          if (!item.email.includes(filters.email)) return false;
        } else if (!filters.email.test(item.email)) return false;
      }
  
      // Filter by full name (exact or regex)
      if (filters.fullName) {
        if (typeof filters.fullName === 'string') {
          if (!item.fullName.includes(filters.fullName)) return false;
        } else if (!filters.fullName.test(item.fullName)) return false;
      }
  
      // Filter by exact role match if provided
      if (filters.role && item.role !== filters.role) return false;
  
      // General text search across multiple fields
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        if (
          !item.company.toLowerCase().includes(searchLower) &&
          !item.email.toLowerCase().includes(searchLower) &&
          !item.fullName.toLowerCase().includes(searchLower) &&
          !item.message.toLowerCase().includes(searchLower) &&
          !item.role.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }
  
      // Filter by date range if provided
      if (filters.createdAtRange) {
        const itemDate = new Date(item.createdAt).getTime();
        if (filters.createdAtRange.start && itemDate < filters.createdAtRange.start.getTime()) {
          return false;
        }
        if (filters.createdAtRange.end && itemDate > filters.createdAtRange.end.getTime()) {
          return false;
        }
      }
  
      return true;
    });
  }