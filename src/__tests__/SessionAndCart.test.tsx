import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import SessionSelection, { Session } from '../components/SessionSelection';
import CartOverview from '../components/CartOverview';

// Sample session data
const sessions: Session[] = [
  { id: 1, type: 'padel', timeSlot: '09:00-09:45', duration: 45, trainer: 'Alice', price: 30, date: '2025-02-09' },
  { id: 2, type: 'fitness', timeSlot: '10:00-10:45', duration: 45, trainer: 'Bob', price: 25, date: '2025-02-10' },
];

describe('SessionSelection and CartOverview', () => {
  test('clicking a session toggles its selection', () => {
    const handleToggleSession = jest.fn();
    render(
      <SessionSelection
        sessions={sessions}
        selectedSessions={[]}
        onToggleSession={handleToggleSession}
      />
    );
    const sessionCard = screen.getByText(/padel Session/i);
    fireEvent.click(sessionCard);
    expect(handleToggleSession).toHaveBeenCalledWith(sessions[0]);
  });

  test('CartOverview calculates total cost correctly', () => {
    // Provide a selection of sessions
    const selectedSessions = sessions;
    render(<CartOverview selectedSessions={selectedSessions} />);
    // The total should be 30 + 25 = 55
    expect(screen.getByText(/Total: \$55\.00/)).toBeInTheDocument();
  });
});
