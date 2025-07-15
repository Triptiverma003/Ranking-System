import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navigation from './components/shared/Navigation';
import Leaderboard from './Pages/Leaderboard';
import Claim from './Pages/Claim';
import AddUser from './Pages/Add-user.jsx';
import History from './Pages/History.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('leaderboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'leaderboard':
        return <Leaderboard />;
      case 'claim':
        return <Claim />;
      case 'add-user':
        return <AddUser />;
      case 'history':
        return <History />;
      default:
        return <Leaderboard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-orange-300">
        <div className="container mx-auto px-4 py-4">
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
          {renderCurrentPage()}
        </div>
      </div>
    </AppProvider>
  );
};

export default App;