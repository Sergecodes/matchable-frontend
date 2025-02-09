import React from 'react';

export interface Session {
  id: number;
  type: 'padel' | 'fitness' | 'tennis';
  timeSlot: string;
  duration: number; // in minutes
  date: string; // format yyyy-mm-dd
  trainer: string;
  price: number;
}

interface SessionSelectionProps {
  sessions: Session[];
  selectedSessions: Session[];
  onToggleSession: (session: Session) => void;
}

const SessionSelection: React.FC<SessionSelectionProps> = ({ sessions, selectedSessions, onToggleSession }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#007BA7]">Available Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.map((session) => {
          const isSelected = selectedSessions.some(s => s.id === session.id);
          return (
            <div
              key={session.id}
              className={`border-2 rounded p-4 cursor-pointer transition-colors duration-200 
                ${isSelected ? 'bg-[#007BA7] text-white' : 'border-[#007BA7] hover:bg-blue-50'}`}
              onClick={() => onToggleSession(session)}
            >
              <p className="font-semibold capitalize">{session.type} Session</p>
              <p>Trainer: {session.trainer}</p>
              <p>Time: {session.timeSlot}</p>
              <p>Duration: {session.duration} mins</p>
              <p>Price: ${session.price.toFixed(2)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionSelection;