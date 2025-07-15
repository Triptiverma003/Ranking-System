import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [pointHistory, setPointHistory] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [view, setView] = useState('daily');

  // 🟡 Fetch users from backend on load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/users");
        const data = await res.json();
        setUsers(data);

        // Set first user as selected (optional)
        if (data.length > 0) {
          setSelectedUserId(data[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  // 🟢 Add user through backend
  const addUser = async (name) => {
    try {
      const res = await fetch("http://localhost:8000/api/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "User creation failed");
      }

      const newUser = await res.json();
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      console.error("Add user error:", err.message);
      throw err;
    }
  };

  // 🔵 Claim points for selected user via backend
  const claimPoints = async (userId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/claim/${userId}`, {
        method: "POST"
      });

      if (!res.ok) throw new Error("Failed to claim points");

      const data = await res.json();
      const updatedUser = data.user;

      // Update user in list
      setUsers(prev =>
        prev.map(user =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );

      // Add to local history
      const historyEntry = {
        id: Date.now(),
        userId: updatedUser._id,
        userName: updatedUser.name,
        points: data.points,
        timestamp: new Date().toLocaleString(),
        type: 'claim'
      };

      setPointHistory(prev => [historyEntry, ...prev]);
      return data.points;
    } catch (err) {
      console.error("Claim Points Error:", err);
      throw err;
    }
  };

  // 🔝 Get sorted users by points
  const getSortedUsers = () => {
    return [...users].sort((a, b) => b.totalPoints - a.totalPoints);
  };

  const value = {
    users,
    setUsers,
    pointHistory,
    setPointHistory,
    selectedUserId,
    setSelectedUserId,
    view,
    setView,
    addUser,
    claimPoints,
    getSortedUsers
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
