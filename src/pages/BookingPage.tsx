import React, { useState } from 'react';
import BookingForm from '../components/BookingForm';
import { useBooking } from '../contexts/BookingContext';
import api from '../api';
import CartOverview from '../components/CartOverview';

const BookingPage: React.FC = () => {
   const { selectedSessions, setSelectedSessions } = useBooking();
   const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
   const [bookingError, setBookingError] = useState<string | null>(null);

   const handleBookingSubmit = (data: { name: string; email: string; phone: string; terms: boolean }) => {
      if (selectedSessions.length === 0) {
         setBookingError('Please select at least one session.');
         return;
      }
      
      // Build payload: send an array of session IDs
      const sessionIds = selectedSessions.map(session => session.id);
      api.post('/bookings', {
         sessionIds,
         clientName: data.name,
         clientEmail: data.email,
         clientPhone: data.phone,
      })
         .then(response => {
            setBookingSuccess('Booking confirmed!');
            setBookingError(null);
            setSelectedSessions([]); // clear selections on success
         })
         .catch(error => {
            console.error(error);
            setBookingError(error.response?.data?.message || 'Booking failed. Please try again.');
            setBookingSuccess(null);
         });
   };

   return (
      <div>
         <CartOverview selectedSessions={selectedSessions} />
         <BookingForm onSubmit={handleBookingSubmit} />
         {bookingSuccess && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded text-center">
               {bookingSuccess}
            </div>
         )}
         {bookingError && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded border border-red-300">
               {bookingError}
            </div>
         )}
      </div>
   );
};

export default BookingPage;
