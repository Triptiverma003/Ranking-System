import React, { useState } from 'react';
import { UserPlus, User, Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Layout from '../components/shared/Layout';

const AddUser = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const { users, addUser } = useApp();
  const [newUserName, setNewUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    if (!newUserName.trim()) {
      setErrorMessage('Please enter a user name');
      return;
    }

    // Check if user already exists
    const existingUser = users.find(u => u.name.toLowerCase() === newUserName.trim().toLowerCase());
    if (existingUser) {
      setErrorMessage('User with this name already exists');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newUser = await addUser(newUserName);
      setSuccessMessage(`User "${newUser.name}" added successfully!`);
      setNewUserName('');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
    } catch (error) {
      setErrorMessage('Failed to add user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Add User">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New User</h2>
            <p className="text-gray-600">Add a new participant to the leaderboard</p>
          </div>

          {/* Add User Form */}
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Enter user name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-100 border border-red-200 rounded-lg flex items-center text-red-800">
                <X className="w-5 h-5 mr-2" />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 bg-green-100 border border-green-200 rounded-lg flex items-center text-green-800">
                <Check className="w-5 h-5 mr-2" />
                <span className="text-sm">{successMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !newUserName.trim()}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                isLoading || !newUserName.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
              } text-white`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Adding User...
                </div>
              ) : (
                'Add User'
              )}
            </button>
          </form>
        </div>

        {/* Current Users List */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Current Users ({users.length})
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {users.map(user => (
              <div key={user._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-xl">{user.avatar}</div>
                  <div>
                    <div className="font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">
                      {user.totalPoints.toLocaleString()} points
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddUser;