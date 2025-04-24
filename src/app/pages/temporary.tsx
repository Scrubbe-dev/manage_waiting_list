// import { useEffect, useState } from 'react';
// import { useAuthStore } from '../store/authStore';
// import { useMessageStore } from '../store/messageStore';
// import { LogOut, Inbox, AlertCircle, Search, ChevronDown, ChevronRight, RefreshCw, User, Briefcase, MessageSquare } from 'lucide-react';

// const Dashboard = () => {
//   const { isAuthenticated, logout } = useAuthStore();
//   const { messages, isLoading, error, fetchMessages } = useMessageStore();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterColumn, setFilterColumn] = useState('all');
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     fetchMessages();
//   }, [fetchMessages]);

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchMessages();
//     setIsRefreshing(false);
//   };

//   const filteredMessages = messages.filter(message => {
//     const searchLower = searchTerm.toLowerCase();
//     if (searchTerm === '') return true;
    
//     switch (filterColumn) {
//       case 'fullname':
//         return message.fullname.toLowerCase().includes(searchLower);
//       case 'company':
//         return message.company.toLowerCase().includes(searchLower);
//       case 'role':
//         return message.role.toLowerCase().includes(searchLower);
//       case 'message':
//         return message.message.toLowerCase().includes(searchLower);
//       default:
//         return (
//           message.fullname.toLowerCase().includes(searchLower) ||
//           message.company.toLowerCase().includes(searchLower) ||
//           message.role.toLowerCase().includes(searchLower) ||
//           message.message.toLowerCase().includes(searchLower)
//         );
//     }
//   });

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
//       {/* Header */}
//       <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-md sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-2 mr-3">
//                 <Inbox size={24} className="text-white" />
//               </div>
//               <h1 className="text-xl md:text-2xl font-bold text-gray-900 hidden sm:block">User Messages Dashboard</h1>
//               <h1 className="text-xl font-bold text-gray-900 sm:hidden">Messages</h1>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div className="hidden md:flex items-center bg-white rounded-full px-1 py-1 shadow-sm">
//                 <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
//                   {messages.length} Messages
//                 </div>
//                 <button 
//                   onClick={handleRefresh}
//                   className="ml-2 mr-1 p-1 text-gray-500 hover:text-blue-600 transition-colors duration-200"
//                 >
//                   <RefreshCw size={18} className={`${isRefreshing ? 'animate-spin' : ''}`} />
//                 </button>
//               </div>

//               <div className="hidden md:block relative">
//                 <div className="flex items-center bg-blue-600 text-white rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//                   <div className="px-4 py-2 text-sm font-medium truncate max-w-xs">
//                     {isAuthenticated || 'Admin'}
//                   </div>
//                   <button
//                     onClick={logout}
//                     className="bg-red-500 hover:bg-red-600 transition-colors duration-200 px-3 py-2 flex items-center"
//                   >
//                     <LogOut size={16} className="mr-1" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </div>

//               <button 
//                 className="md:hidden text-gray-600 focus:outline-none" 
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               >
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   {isMobileMenuOpen ? (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   ) : (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {isMobileMenuOpen && (
//             <div className="mt-4 pb-2 border-t border-gray-200 md:hidden">
//               <div className="flex flex-col space-y-3 pt-3">
//                 <div className="flex items-center justify-between">
//                   <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
//                     {messages.length} Messages
//                   </div>
//                   <button 
//                     onClick={handleRefresh}
//                     className="p-1 text-gray-500 hover:text-blue-600 transition-colors duration-200"
//                   >
//                     <RefreshCw size={18} className={`${isRefreshing ? 'animate-spin' : ''}`} />
//                   </button>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
//                     {isAuthenticated || 'Admin'}
//                   </span>
//                   <button
//                     onClick={logout}
//                     className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 px-3 py-1 text-sm rounded-full flex items-center"
//                   >
//                     <LogOut size={14} className="mr-1" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       <main className="flex-grow w-full mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-7xl">
//         {/* Search Bar */}
//         <div className="mb-6">
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:items-center">
//               <div className="relative flex-grow">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="Search messages..."
//                 />
//               </div>
//               <div className="flex items-center">
//                 <label htmlFor="filter" className="text-sm font-medium text-gray-700 mr-2 whitespace-nowrap">
//                   Filter by:
//                 </label>
//                 <select
//                   id="filter"
//                   value={filterColumn}
//                   onChange={(e) => setFilterColumn(e.target.value)}
//                   className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                 >
//                   <option value="all">All Fields</option>
//                   <option value="fullname">Name</option>
//                   <option value="company">Company</option>
//                   <option value="role">Role</option>
//                   <option value="message">Message</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Error display */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md shadow-sm">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <AlertCircle className="h-5 w-5 text-red-400" />
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Content */}
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="flex flex-col items-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//                 <p className="mt-4 text-gray-500 text-sm font-medium">Loading messages...</p>
//               </div>
//             </div>
//           ) : filteredMessages.length === 0 ? (
//             <div className="flex flex-col justify-center items-center h-64 px-6">
//               <div className="bg-blue-100 p-4 rounded-full mb-4">
//                 <Inbox size={32} className="text-blue-500" />
//               </div>
//               {searchTerm ? (
//                 <>
//                   <p className="text-lg font-medium text-gray-900">No matching messages found</p>
//                   <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
//                 </>
//               ) : (
//                 <>
//                   <p className="text-lg font-medium text-gray-900">No messages available</p>
//                   <p className="text-sm text-gray-500 mt-1">Messages will appear here when available</p>
//                 </>
//               )}
//             </div>
//           ) : (
//             <>
//               {/* Desktop View */}
//               <div className="hidden md:block">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         ID
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Full Name
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Company
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Role
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Message
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredMessages.map((message) => (
//                       <tr 
//                         key={message.id} 
//                         className="hover:bg-blue-50 transition-colors duration-150"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {message.id.substring(0, 8)}...
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
//                               <User size={16} className="text-blue-600" />
//                             </div>
//                             <div className="ml-3">
//                               <div className="text-sm font-medium text-gray-900">{message.fullname}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0">
//                               <Briefcase size={16} className="text-gray-400" />
//                             </div>
//                             <div className="ml-2 text-sm text-gray-900">{message.company}</div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
//                             {message.role}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
//                           <div className="truncate">{message.message}</div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Mobile View */}
//               <div className="md:hidden">
//                 <ul className="divide-y divide-gray-200">
//                   {filteredMessages.map((message) => (
//                     <li key={message.id} className="px-4 py-4">
//                       <button
//                         onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
//                         className="w-full"
//                       >
//                         <div className="flex justify-between items-center">
//                           <div className="flex items-center space-x-3">
//                             <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
//                               <User size={20} className="text-blue-600" />
//                             </div>
//                             <div className="flex flex-col">
//                               <span className="text-sm font-medium text-gray-900">{message.fullname}</span>
//                               <span className="text-sm text-gray-500">{message.company}</span>
//                             </div>
//                           </div>
//                           <div className="flex items-center">
//                             <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 mr-2">
//                               {message.role}
//                             </span>
//                             {selectedMessage === message.id ? (
//                               <ChevronDown className="h-5 w-5 text-gray-500" />
//                             ) : (
//                               <ChevronRight className="h-5 w-5 text-gray-500" />
//                             )}
//                           </div>
//                         </div>
//                       </button>
                      
//                       {selectedMessage === message.id && (
//                         <div className="mt-4 pl-12">
//                           <div className="bg-gray-50 rounded-lg p-3">
//                             <div className="flex items-start mb-2">
//                               <MessageSquare size={16} className="text-blue-500 mt-1 mr-2" />
//                               <span className="text-xs font-medium text-gray-500">Message:</span>
//                             </div>
//                             <p className="text-sm text-gray-700">{message.message}</p>
//                             <div className="mt-2 flex items-center text-xs text-gray-500">
//                               <span className="font-medium">ID:</span>
//                               <span className="ml-1">{message.id.substring(0, 8)}...</span>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </>
//           )}
//         </div>

//         {filteredMessages.length > 0 && (
//           <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow-md">
//             <div className="flex-1 flex justify-between sm:hidden">
//               <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                 Previous
//               </button>
//               <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                 Next
//               </button>
//             </div>
//             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm text-gray-700">
//                   Showing <span className="font-medium">1</span> to{" "}
//                   <span className="font-medium">{filteredMessages.length}</span> of{" "}
//                   <span className="font-medium">{filteredMessages.length}</span> results
//                 </p>
//               </div>
//               <div>
//                 <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                   <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     <span className="sr-only">Previous</span>
//                     <ChevronRight className="h-5 w-5 transform rotate-180" />
//                   </button>
//                   <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
//                     1
//                   </button>
//                   <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     <span className="sr-only">Next</span>
//                     <ChevronRight className="h-5 w-5" />
//                   </button>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       <footer className="bg-white shadow-inner mt-auto">
//         <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-sm text-gray-500">
//             scrubbe v1.0 • Last updated: {new Date().toLocaleDateString()}
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };