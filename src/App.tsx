import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SessionsPage from './pages/SessionsPage';
import BookingPage from './pages/BookingPage';
import { BookingProvider } from './contexts/BookingContext';

const App: React.FC = () => {
  return (
    <BookingProvider>
      <Router>
        <NavBar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<SessionsPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </div>
      </Router>
    </BookingProvider>
  );
};

export default App;
