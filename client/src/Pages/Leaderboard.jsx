import React from 'react';
import { Crown, Medal, Award, Star, Gift, Zap, Flame, Trophy, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
              <p className="text-purple-300 text-sm">Compete • Conquer • Celebrate</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="relative z-10 p-6">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">Current Season</p>
                <p className="text-purple-300 text-sm">Active Competition</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{sortedUsers.length}</p>
              <p className="text-purple-300 text-sm">Total Players</p>
            </div>
          </div>
        </div>
      </div>

      {/* Champion's Podium */}
      <div className="relative z-10 p-6">
        <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">🏆 Champions 🏆</h2>
            <p className="text-purple-300">The elite few who dominate the leaderboard</p>
          </div>
          
          <div className="flex justify-center items-end space-x-8">
            {topThree.map((user, index) => {
              const rank = index + 1;
              const positions = [1, 0, 2];
              const actualIndex = positions[index];
              
              return (
                <div key={user._id} className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <div className={`${rank === 1 ? 'w-28 h-28' : 'w-20 h-20'} ${getRankBadge(rank)} rounded-2xl flex items-center justify-center mb-4 shadow-2xl ${rank === 1 ? 'shadow-yellow-500/50' : ''} p-1`}>
                      {user.image ? (
                        <img 
                          src={user.image} 
                          alt={user.name}
                          className="w-full h-full object-cover rounded-xl"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <div 
                        className={`${rank === 1 ? 'text-4xl' : 'text-3xl'} ${user.image ? 'hidden' : 'block'}`}
                        style={{ display: user.image ? 'none' : 'block' }}
                      >
                        {user.avatar || '👤'}
                      </div>
                    </div>
                    {rank === 1 && (
                      <>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                          <Crown className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                        </div>
                      </>
                    )}
                    {rank !== 1 && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{rank}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-white font-bold mb-1 ${rank === 1 ? 'text-lg' : ''}`}>{user.name}</p>
                    <div className={`${getRankBadge(rank)} ${rank === 1 ? 'px-4 py-2' : 'px-3 py-1'} rounded-full`}>
                      <span className={`text-white font-bold ${rank === 1 ? '' : 'text-sm'}`}>
                        <Gift className="w-4 h-4 inline mr-1" />
                        {user.totalPoints.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full Rankings */}
      <div className="relative z-10 p-6 pb-8">
        <div className="bg-black/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Complete Rankings</h3>
            <p className="text-purple-300 text-sm">Where do you stand among the legends?</p>
          </div>
          
          <div className="divide-y divide-white/10">
            {sortedUsers.map((user, index) => {
              const rank = index + 1;
              const isTopThree = rank <= 3;
              
              return (
                <div
                  key={user._id}
                  className={`p-6 flex items-center justify-between transition-all duration-300 hover:bg-white/5 ${
                    isTopThree ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg">
                      {rank}
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg p-1">
                      {user.image ? (
                        <img 
                          src={user.image} 
                          alt={user.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <div 
                        className="text-2xl"
                        style={{ display: user.image ? 'none' : 'block' }}
                      >
                        {user.avatar || '👤'}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-lg">{user.name}</span>
                        {getRankIcon(rank)}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          Rank #{rank}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl text-white mb-1 flex items-center">
                      <Gift className="w-5 h-5 mr-2 text-purple-400" />
                      {(user.totalPoints ?? 0).toLocaleString()}
                    </div>
                    <div className="flex items-center justify-end space-x-1">
                      <span className="text-purple-400 text-sm">points</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;