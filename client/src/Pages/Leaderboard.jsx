import React from 'react';
import { Crown, Medal, Award, Star, Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Layout from '../components/shared/Layout';

const Leaderboard = () => {
  const { getSortedUsers } = useApp();
  const sortedUsers = getSortedUsers();
  const topThree = sortedUsers.slice(0, 3);
  const remainingUsers = sortedUsers.slice(3);

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <Star className="w-5 h-5 text-blue-500" />;
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gradient-to-r from-blue-400 to-blue-600';
  };

  return (
    <Layout title="Leaderboard">
      {/* Top 3 Winners */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent"></div>
          
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -left-8 top-2 w-12 h-16 bg-gradient-to-r from-white to-gray-100 rounded-full transform rotate-12 opacity-80"></div>
              <div className="absolute -right-8 top-2 w-12 h-16 bg-gradient-to-r from-white to-gray-100 rounded-full transform -rotate-12 opacity-80"></div>
            </div>
          </div>
          
          <div className="flex justify-center items-end space-x-4">
            {topThree.map((user, index) => {
              const rank = index + 1;
              const heights = ['h-24', 'h-32', 'h-20'];
              const positions = [1, 0, 2];
              const actualIndex = positions[index];
              
              return (
                <div key={user._id} className={`flex flex-col items-center ${heights[actualIndex]}`}>
                  <div className="text-4xl mb-2">{user.avatar}</div>
                  <div className={`${getRankBadge(rank)} text-white px-3 py-1 rounded-full text-xs font-bold mb-1`}>
                    #{rank}
                  </div>
                  <div className="text-xs text-gray-700 font-medium text-center max-w-16 truncate">
                    {user.name}
                  </div>
                  <div className="text-sm font-bold text-gray-800 flex items-center">
                    <Gift className="w-4 h-4 mr-1 text-yellow-600" />
                    {user.totalPoints.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Full Rankings</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {sortedUsers.map((user, index) => {
            const rank = index + 1;
            const isTopThree = rank <= 3;
            
            return (
              <div
                key={user._id}
                className={`p-4 flex items-center justify-between transition-all ${
                  isTopThree ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(rank)}
                  </div>
                  <div className="text-2xl">{user.avatar}</div>
                  <div>
                    <div className="font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">Rank #{rank}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-800 flex items-center">
                    <Gift className="w-4 h-4 mr-1 text-yellow-600" />
                    {(user.totalPoints ?? 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">points</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;