import React from 'react';
import { Session } from './SessionSelection';

interface CartOverviewProps {
  selectedSessions: Session[];
}

const CartOverview: React.FC<CartOverviewProps> = ({ selectedSessions }) => {
  const totalCost = selectedSessions.reduce((sum, session) => sum + session.price, 0);

  return (
    <div className="mt-6 p-4 border rounded shadow-sm border-[#007BA7]">
      <h2 className="text-2xl font-bold mb-4 text-[#007BA7]">Cart Overview</h2>
      {selectedSessions.length === 0 ? (
        <p className="text-gray-600">No sessions selected.</p>
      ) : (
        <ul className="space-y-2">
          {selectedSessions.map(session => (
            <li key={session.id} className="border-b pb-1">
              <span className="font-semibold capitalize">{session.type} Session</span> – {session.timeSlot} with {session.trainer} – ${session.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 font-bold text-lg text-[#007BA7]">
        Total: ${totalCost.toFixed(2)}
      </div>
    </div>
  );
};

export default CartOverview;