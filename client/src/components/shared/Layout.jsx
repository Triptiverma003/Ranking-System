import React from 'react';
import { useApp } from '../../context/AppContext';

const Layout = ({ children, title = "Wealth Ranking" }) => {
  const { view, setView } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-orange-300">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setView('daily')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                view === 'daily' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setView('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                view === 'monthly' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
      
      {/* Settlement Time */}
      <div className="text-center py-4">
        <p className="text-sm text-gray-600">Settlement time 14 days 01:45:47</p>
      </div>
      
      {/* Content */}
      <div className="px-4">
        {children}
      </div>
    </div>
  );
};
export default Layout