import React, { useState } from 'react';
import { UserPlus, User, Check, X, Upload, Camera } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Layout from '../components/shared/Layout';

const AddUser = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const { users, addUser } = useApp();
  const [newUserName, setNewUserName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select a valid image file');
        return;
      }
      
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Image size should be less than 5MB');
        return;
      }

      setProfilePhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      setErrorMessage('');
    }
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    setPhotoPreview(null);
    // Clear the file input
    document.getElementById('photo-upload').value = '';
  };

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
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', newUserName.trim());
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }

      // If you have an actual API endpoint:
      // const response = await fetch(`${serverUrl}/api/users`, {
      //   method: 'POST',
      //   body: formData,
      // });
      // const newUser = await response.json();

      // For now, using the existing addUser function
      const newUser = await addUser(newUserName, profilePhoto);
      
      setSuccessMessage(`User "${newUser.name}" added successfully!`);
      setNewUserName('');
      removePhoto();
      
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
            {/* Profile Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo (Optional)
              </label>
              
              {!photoPreview ? (
                <div className="relative">
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload photo</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => document.getElementById('photo-upload').click()}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>

            {/* User Name Input */}
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
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {user.profilePhoto ? (
                      <img
                        src={user.profilePhoto}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-xl">{user.avatar}</div>
                    )}
                  </div>
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