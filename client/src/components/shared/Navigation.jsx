import React from 'react';
import { Users, Gift, Trophy, History } from 'lucide-react';

const Navigation = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'claim', label: 'Claim Points', icon: Gift },
    { id: 'add-user', label: 'Add User', icon: Users },
    { id: 'history', label: 'History', icon: History }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
      <div className="flex justify-around">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              currentPage === id 
                ? 'bg-orange-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;