import React, { useState, useEffect } from 'react';
import {
  History as HistoryIcon,
  Calendar,
  User,
  Gift,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Layout from '../components/shared/Layout';

const History = () => {
  const { users } = useApp();
  const [history, setHistory] = useState([]);
  const [filterUser, setFilterUser] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // 🧠 Fetch point history from backend
  useEffect(() => {
    fetch('http://localhost:8000/api/history')
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.error('Error fetching history:', err));
  }, []);

  // 🔧 Normalize for consistent structure
  const normalizedHistory = history.map(entry => {
    const userObj = entry.userId;
    return {
      ...entry,
      userId: userObj._id,
      userName: userObj.name
    };
  });

  // 🔍 Filter + Sort
  const filteredHistory = normalizedHistory
    .filter(entry => !filterUser || entry.userId === filterUser)
    .sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp)
    );

  return (
    <Layout title="Point History">
      <div className="max-w-4xl mx-auto">

        {/* 📊 Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Claims" icon={<HistoryIcon className="w-6 h-6 text-blue-600" />} color="blue" value={filteredHistory.length} />
          <StatCard title="Total Points" icon={<Gift className="w-6 h-6 text-green-600" />} color="green" value={filteredHistory.reduce((a, b) => a + b.points, 0)} />
          <StatCard
            title="Avg. Points"
            icon={<Calendar className="w-6 h-6 text-orange-600" />}
            color="orange"
            value={
              filteredHistory.length > 0
                ? Math.round(filteredHistory.reduce((a, b) => a + b.points, 0) / filteredHistory.length)
                : 0
            }
          />
        </div>

        {/* 🔍 Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by User</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  value={filterUser}
                  onChange={(e) => setFilterUser(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Users</option>
                  {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <div className="relative">
                <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 📜 History List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Point History ({filteredHistory.length} entries)
            </h3>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="p-8 text-center">
              <HistoryIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {filterUser ? 'No history found for selected user' : 'No point claims yet'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {filteredHistory.map(entry => (
                <div key={entry._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">👤</div>
                      <div>
                        <div className="font-medium text-gray-800">{entry.userName}</div>
                        <div className="text-sm text-gray-500">{new Date(entry.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600 flex items-center">
                        <Gift className="w-4 h-4 mr-1" /> +{entry.points}
                      </div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// 🔁 StatCard Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-2xl font-bold text-gray-800">{value.toLocaleString()}</div>
        <div className="text-sm text-gray-600">{title}</div>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${color}-100`}>
        {icon}
      </div>
    </div>
  </div>
);

export default History;
