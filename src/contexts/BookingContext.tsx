import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Session } from '../components/SessionSelection';

interface BookingContextType {
  selectedSessions: Session[];
  setSelectedSessions: (sessions: Session[]) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);
  return (
    <BookingContext.Provider value={{ selectedSessions, setSelectedSessions }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
