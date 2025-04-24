'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useMessageStore, UserMessage } from '@/store/messageStore';
import { 
  LogOut, 
  Inbox, 
  AlertCircle, 
  Search,
  ChevronDown,
  ChevronRight,
  RefreshCw, 
  User,
  Briefcase,
  MessageSquare,
  Filter,
  X } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedWrapper';
import Link from 'next/link';
type UserRole =  "CISO" | "SECURITY_ENGINEER" | "SOC_ANALYST" | "IT_MANAGER" | "OTHERS" | undefined;
const Dashboard = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const { 
    messages,
    filteredMessages, 
    isLoading, 
    isFiltering,
    error, 
    meta,
    queryParams,
    fetchAllMessages,
    fetchFilteredMessages,
    setQueryParams,
    resetFilters
  } = useMessageStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [useFilteredEndpoint, setUseFilteredEndpoint] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Initial load
  useEffect(() => {
    fetchAllMessages();
  }, [fetchAllMessages]);

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (useFilteredEndpoint) {
      await fetchFilteredMessages();
    } else {
      await fetchAllMessages();
    }
    setIsRefreshing(false);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchFilteredMessages({ page });
  };

  // Toggle between filtered and all messages
  const toggleEndpoint = () => {
    setUseFilteredEndpoint(!useFilteredEndpoint);
    if (!useFilteredEndpoint) {
      fetchFilteredMessages();
    } else {
      fetchAllMessages();
    }
  };

  // Apply filters to the filtered endpoint
  const applyFilters = () => {
    fetchFilteredMessages({
      search: searchTerm,
      page: 1 // Reset to first page when applying new filters
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterColumn('all');
    resetFilters();
    fetchAllMessages();
  };

  // Determine which messages to display
  const displayMessages = useFilteredEndpoint ? filteredMessages : messages;

  // Client-side filtering when using all messages
  const clientFilteredMessages = displayMessages.filter(message => {
    if (!useFilteredEndpoint && searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      switch (filterColumn) {
        case 'fullname':
          return message.fullname.toLowerCase().includes(searchLower);
        case 'company':
          return message.company.toLowerCase().includes(searchLower);
        case 'role':
          return message.role.toLowerCase().includes(searchLower);
        case 'message':
          return message.message.toLowerCase().includes(searchLower);
        default:
          return (
            message.fullname.toLowerCase().includes(searchLower) ||
            message.company.toLowerCase().includes(searchLower) ||
            message.role.toLowerCase().includes(searchLower) ||
            message.message.toLowerCase().includes(searchLower)
          );
      }
    }
    return true;
  });

  // Final messages to display
  const finalMessages = useFilteredEndpoint ? filteredMessages : clientFilteredMessages;
   console.log(finalMessages, " final message")
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header (unchanged from your original code) */}
      {/* ... */}

      <main className="flex-grow w-full mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:items-center">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={useFilteredEndpoint ? "Search server-side..." : "Search client-side..."}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleEndpoint}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      useFilteredEndpoint 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Filter size={16} className="mr-2" />
                    {useFilteredEndpoint ? 'Server Filter' : 'Client Filter'}
                  </button>
                  
                  {useFilteredEndpoint && (
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="px-3 py-2 rounded-md text-sm font-medium flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      <Filter size={16} className="mr-2" />
                      Advanced
                    </button>
                  )}
                  
                  {(searchTerm || useFilteredEndpoint) && (
                    <button
                      onClick={handleResetFilters}
                      className="px-3 py-2 rounded-md text-sm font-medium flex items-center bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      <X size={16} className="mr-2" />
                      Reset
                    </button>
                  )}
                </div>
              </div>
              <div className='w-full h-fit'>
                  <button className='cursor-pointer px-4 py-2 border text-sm hover:bg-red-600 transition-all border-red-500 rounded-lg' onClick={()=>logout()}>
                        Logout
                  </button>
                    
                </div>
              
              {showFilters && useFilteredEndpoint && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 border-t border-gray-200">
                  <div>
                    <label htmlFor="role-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      id="role-filter"
                      value={queryParams.role || ''}
                      onChange={(e) => setQueryParams({ 
                        role: e.target.value as UserRole || undefined,
                        page: 1
                      })}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">All Roles</option>
                      <option value="CISO">CISO</option>
                      <option value="SECURITY_ENGINEER">Security Engineer</option>
                      <option value="SOC_ANALYST">SOC Analyst</option>
                      <option value="IT_MANAGER">IT Manager</option>
                      <option value="OTHERS">Others</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="limit-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Items per page
                    </label>
                    <select
                      id="limit-filter"
                      value={queryParams.limit}
                      onChange={(e) => setQueryParams({ 
                        limit: Number(e.target.value),
                        page: 1
                      })}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={applyFilters}
                      disabled={isFiltering}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {isFiltering ? 'Applying...' : 'Apply Filters'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {(isLoading || isFiltering) ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-500 text-sm font-medium">
                  {isFiltering ? 'Filtering messages...' : 'Loading messages...'}
                </p>
              </div>
            </div>
          ) : finalMessages.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 px-6">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Inbox size={32} className="text-blue-500" />
              </div>
              {searchTerm ? (
                <>
                  <p className="text-lg font-medium text-gray-900">No matching messages found</p>
                  <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium text-gray-900">No messages available</p>
                  <p className="text-sm text-gray-500 mt-1">Messages will appear here when available</p>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden  md:block">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Full Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th> */}
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {finalMessages.map((message:UserMessage) => ( 
                      <tr 
                        key={message.id} 
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {message.id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User size={16} className="text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{message.fullname}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <Briefcase size={16} className="text-gray-400" />
                            </div>
                            <div className="ml-2 text-sm text-gray-900">{message.company}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-[11px] leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {message.email}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                          <div className="truncate">{message.message}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibol">
                             <Link className="cursor-pointer font-bold text-[12px] bg-slate-100 text-black px-2 py-1 rounded-lg" href={`/pages/dashboard/${message.id}`}>
                                  view more
                             </Link>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View (unchanged from your original code) */}
              <div className="md:hidden">
                <ul className="divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <li key={message.id} className="px-4 py-4">
                      <button
                        onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
                        className="w-full"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User size={20} className="text-blue-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900">{message.fullname}</span>
                              <span className="text-sm text-gray-500">{message.company}</span>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 mr-2">
                              {message.role}
                            </span>
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibol">
                             <Link className="cursor-pointer font-bold text-[12px] bg-slate-100  text-black px-2 py-1 rounded-lg" href={`/pages/dashboard/${message.id}`}>
                                  view more
                             </Link>
                          </span>
                            {selectedMessage === message.id ? (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                        </div>
                      </button>
                      
                      {selectedMessage === message.id && (
                        <div className="mt-4 pl-12">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-start mb-2">
                              <MessageSquare size={16} className="text-blue-500 mt-1 mr-2" />
                              <span className="text-xs font-medium text-gray-500">Message:</span>
                            </div>
                            <p className="text-sm text-gray-700">{message.message}</p>
                            <div className="mt-2 flex items-center text-xs text-gray-500">
                              <span className="font-medium">ID:</span>
                              <span className="ml-1">{message.id.substring(0, 8)}...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

            </>
          )}
        </div>
        {/* Pagination - Only show when using filtered endpoint */}
        {useFilteredEndpoint && meta && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow-md">
            <div className="flex-1 flex justify-between sm:hidden">
              <button 
                onClick={() => handlePageChange(meta.currentPage - 1)}
                disabled={!meta.hasPreviousPage}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button 
                onClick={() => handlePageChange(meta.currentPage + 1)}
                disabled={!meta.hasNextPage}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(meta.currentPage - 1) * queryParams.limit + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(meta.currentPage * queryParams.limit, meta.total)}</span> of{" "}
                  <span className="font-medium">{meta.total}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button 
                    onClick={() => handlePageChange(meta.currentPage - 1)}
                    disabled={!meta.hasPreviousPage}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronRight className="h-5 w-5 transform rotate-180" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                    let pageNum;
                    if (meta.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (meta.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (meta.currentPage >= meta.totalPages - 2) {
                      pageNum = meta.totalPages - 4 + i;
                    } else {
                      pageNum = meta.currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          meta.currentPage === pageNum
                            ? 'bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => handlePageChange(meta.currentPage + 1)}
                    disabled={!meta.hasNextPage}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            scrubbe v1.0 • Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </footer>
    </div>
  );
};

;


export default function MainDashboard(){
  return(
    <ProtectedRoute>
        <Dashboard />
  </ProtectedRoute> 
  )
}