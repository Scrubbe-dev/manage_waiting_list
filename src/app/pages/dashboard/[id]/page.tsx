'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react';
import { Mail, Building, User, MessageSquare, Award, Briefcase, MapPin, Phone, Calendar, Globe } from 'lucide-react';
import { useRouter } from 'next/router';

export default function UserDetailsPage() {
    const params = useParams()
    const router = useRouter()
  const [user, setUser] = useState({
    id: "USR-7842",
    name: "Alexandra Johnson",
    role: "Senior Product Manager",
    company: "Innovative Solutions Inc.",
    email: "alexandra.johnson@example.com",
    message: "Leading product development with a focus on user-centered design and agile methodologies. Passionate about creating solutions that make a difference.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "March 2021",
    department: "Product Development",
    website: "alexjohnson.portfolio",
    recentActivity: "Updated project roadmap - 2 days ago"
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
            <div className="flex space-x-3">
              <button onClick={()=>router.back()} className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700">
                back
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:gap-x-8">
          {/* Left Column - Primary Info */}
          <div className="lg:w-1/3">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-indigo-600 font-medium">{user.role}</p>
                <div className="flex items-center mt-1 text-gray-500 text-sm">
                  <Building size={16} className="mr-1" />
                  <span>{user.company}</span>
                </div>
                <div className="flex items-center justify-center mt-6 space-x-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                    ID: {user.id}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <a href={`mailto:${user.email}`} className="text-sm text-blue-600 hover:underline">
                        {user.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-sm text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-sm text-gray-900">{user.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Joined</p>
                      <p className="text-sm text-gray-900">{user.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Globe className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Website</p>
                      <a href="#" className="text-sm text-blue-600 hover:underline">
                        {user.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Additional Info */}
          <div className="lg:w-2/3">
            {/* About / Message Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="w-5 h-5 text-indigo-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">About</h3>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{user.message}</p>
            </div>
            
            {/* Company & Role Info */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Briefcase className="w-5 h-5 text-indigo-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Work Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Company</h4>
                  <div className="flex items-center">
                    <Building className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900">{user.company}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Department</h4>
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900">{user.department}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Role</h4>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900">{user.role}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Recent Activity</h4>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-gray-900">{user.recentActivity}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Activity Timeline */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-indigo-500 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-3 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Updated project roadmap</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Added team members to project</p>
                    <p className="text-xs text-gray-500">5 days ago</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Award className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Completed quarterly goals</p>
                    <p className="text-xs text-gray-500">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}