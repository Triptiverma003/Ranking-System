import React, { useState } from 'react';
import { Gift, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Layout from '../components/shared/Layout';

const Claim = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const { users, setUsers, selectedUserId, setSelectedUserId } = useApp();
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastClaimedPoints, setLastClaimedPoints] = useState(null);

  const handleClaimPoints = async () => {
    if (!selectedUserId || isAnimating) return;

    setIsAnimating(true);
    setLastClaimedPoints(null);

    try {
      const response = await fetch(`${serverUrl}/api/claim/${selectedUserId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to claim points');

      const data = await response.json();
      const points = data.points;

      setLastClaimedPoints(points);

      // ✅ Correctly update user points in state
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === selectedUserId
            ? { ...user, totalPoints: user.totalPoints + points }
            : user
        )
      );

      setTimeout(() => {
        setLastClaimedPoints(null);
      }, 3000);
    } catch (error) {
      console.error('Error claiming points:', error);
      alert('Something went wrong while claiming points!');
    } finally {
      setIsAnimating(false);
    }
  };

  const selectedUser = users.find(u => u._id === selectedUserId);

  return (
    <Layout title="Claim Points">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Claim Your Points</h2>
            <p className="text-gray-600">Select a user and claim random points</p>
          </div>

          {/* User Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={selectedUserId || ''}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select a user...</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} - {user.totalPoints.toLocaleString()} points
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected User Info */}
          {selectedUser && (
            <div className="mb-6 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{selectedUser.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-800">{selectedUser.name}</div>
                  <div className="text-sm text-gray-600">
                    Current Points:{' '}
                    {(selectedUser.totalPoints + (lastClaimedPoints ?? 0)).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Claimed Points Message */}
          {lastClaimedPoints && (
            <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg">
              <div className="flex items-center justify-center text-green-800">
                <Gift className="w-5 h-5 mr-2" />
                <span className="font-semibold">
                  +{lastClaimedPoints.toLocaleString()} points claimed!
                </span>
              </div>
            </div>
          )}

          {/* Claim Button */}
          <button
            onClick={handleClaimPoints}
            disabled={isAnimating || !selectedUserId}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
              isAnimating || !selectedUserId
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105'
            } text-white`}
          >
            {isAnimating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Claiming Points...
              </div>
            ) : (
              'Claim Points'
            )}
          </button>

          {/* Footer */}
          <div className="mt-4 text-center text-sm text-gray-500">
            You'll receive between 100–1000 random points
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Claim;
