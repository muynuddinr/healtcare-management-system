import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api/authApi';

export default function PatientSidebar({ activePage, setCurrentPage }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className={`h-screen bg-white dark:bg-secondary-600 shadow-lg flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Header with logo */}
      <div className="flex items-center justify-between p-4 border-b dark:border-secondary-500">
        {!collapsed && <h1 className="text-xl font-bold text-primary-700 dark:text-primary-200">Patient Portal</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-600">
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {/* Dashboard */}
          <li>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`flex items-center px-4 py-3 w-full text-left rounded-lg ${
                activePage === 'dashboard' 
                  ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {!collapsed && <span>Dashboard</span>}
            </button>
          </li>
          
          {/* Appointments */}
          <li>
            <button
              onClick={() => setCurrentPage('appointments')}
              className={`flex items-center px-4 py-3 w-full text-left rounded-lg ${
                activePage === 'appointments' 
                  ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {!collapsed && <span>My Appointments</span>}
            </button>
          </li>
          
          {/* Prescriptions */}
          <li>
            <button
              onClick={() => setCurrentPage('prescriptions')}
              className={`flex items-center px-4 py-3 w-full text-left rounded-lg ${
                activePage === 'prescriptions' 
                  ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-500'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {!collapsed && <span>Prescriptions</span>}
            </button>
          </li>
          
          {/* Book Appointment */}
          <li>
            <button
              onClick={() => setCurrentPage('booking')}
              className={`flex items-center px-4 py-3 w-full text-left rounded-lg ${
                activePage === 'booking' 
                  ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {!collapsed && <span>Book Appointment</span>}
            </button>
          </li>
          
          {/* Medical History */}
          <li>
            <button
              onClick={() => setCurrentPage('history')}
              className={`flex items-center px-4 py-3 w-full text-left rounded-lg ${
                activePage === 'history' 
                  ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {!collapsed && <span>Medical History</span>}
            </button>
          </li>
          
          {/* My Payments */}
          <li>
            <button
              onClick={() => setCurrentPage('payments')}
              className={`flex items-center px-4 py-3 w-full text-left rounded-lg ${
                activePage === 'payments' 
                  ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              {!collapsed && <span>My Payments</span>}
            </button>
          </li>
          
          {/* My Profile */}
          <li>
            <button
              onClick={() => setCurrentPage('profile')}
              className={`flex items-center px-4 py-3 w-full text-left rounded-lg ${
                activePage === 'profile' 
                  ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {!collapsed && <span>My Profile</span>}
            </button>
          </li>
          
          {/* Settings - Add this new item */}
          <li>
            <button
              onClick={() => setCurrentPage('settings')}
              className={`flex items-center px-4 py-3 w-full text-left rounded-lg ${
                activePage === 'settings' 
                  ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {!collapsed && <span>Settings</span>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t dark:border-secondary-600">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 w-full text-left rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}