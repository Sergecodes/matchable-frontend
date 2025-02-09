import React, { useState, useEffect } from 'react';
import { Session } from '../components/SessionSelection';
import { useBooking } from '../contexts/BookingContext';
import api from '../api';
import { Calendar, momentLocalizer, NavigateAction, View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

const SessionsPage: React.FC = () => {
   const { selectedSessions, setSelectedSessions } = useBooking();
   const [events, setEvents] = useState<any[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   const [selectedDate, setSelectedDate] = useState<ValuePiece | [ValuePiece, ValuePiece]>(new Date());
   const [currentView, setCurrentView] = useState<View>(Views.WEEK);

   // Fetch sessions for the selected date whenever it changes
   useEffect(() => {
      setLoading(true);
      let url = '/sessions';
      if (currentView === 'week') {
         // Compute the start and end of the week for the given date using moment
         const from = moment(selectedDate as Date).startOf('week').format('YYYY-MM-DD');
         const to = moment(selectedDate as Date).endOf('week').format('YYYY-MM-DD');
         url += `?from=${from}&to=${to}`;
      } else if (currentView === 'day') {
         const date = moment(selectedDate as Date).format('YYYY-MM-DD');
         url += `?date=${date}`;
      }
      api.get(url)
         .then(response => {
            // Map sessions to calendar events:
            const eventsData = response.data.map((session: any) => {
               const [startStr, endStr] = session.timeSlot.split('-');
               const start = new Date(`${session.date}T${startStr}`);
               const end = new Date(`${session.date}T${endStr}`);

               return {
                  id: session.id,
                  title: `${session.type} with ${session.trainer}`,
                  start,
                  end,
                  sessionData: session,
               };
            });

            setEvents(eventsData);
            setLoading(false);
         })
         .catch(err => {
            console.error(err);
            setError('Failed to load sessions.');
            setLoading(false);
         });
   }, [selectedDate, currentView]);

   /** Update selected date when user navigates */
   const handleNavigate = (date: Date, view: View, action: NavigateAction) => {
      setSelectedDate(date);
   };

   /** Handle event (session) selection */
   const handleSelectEvent = (event: any) => {
      // Toggle the session in selectedSessions
      const exists = selectedSessions.find((s: Session) => s.id === event.id);
      if (exists) {
         setSelectedSessions(selectedSessions.filter((s: Session) => s.id !== event.id));
      } else {
         setSelectedSessions([...selectedSessions, event.sessionData]);
      }
   };

   /** Style events: highlight if the session is selected */
   const eventPropGetter = (event: any, start: Date, end: Date, isSelected: boolean) => {
      const isEventSelected = selectedSessions.some((s: Session) => s.id === event.id);
      if (isEventSelected) {
         return {
            style: {
               backgroundColor: "#FF6F61", // A bright coral color for selected events
               color: "white",
               border: "2px solid #B22222", // Darker border for emphasis
               boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
            },
         };
      } else {
         return {
            style: {
               backgroundColor: "#3174ad", // Default unselected event color
               color: "white",
               border: "none",
            },
         };
      }
   };

   if (loading) {
      return (
         <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#007BA7]"></div>
         </div>
      );
   }

   if (error) {
      return <div className="text-red-500">{error}</div>;
   }

   return (
      <div>
         <h1 className="text-3xl font-bold text-[#007BA7] mb-4">Select Sessions by Date</h1>
         <div className="mb-6">
            <Calendar
               localizer={localizer}
               events={events}
               defaultView={currentView}
               view={currentView}
               date={selectedDate as Date}
               views={[Views.WEEK, Views.DAY]}
               step={15} // each slot is 15 minutes
               timeslots={4} // 4 slots per hour (i.e. 15-minute intervals)
               selectable
               onSelectEvent={handleSelectEvent}
               onView={(view) => setCurrentView(view)}
               onNavigate={handleNavigate}
               eventPropGetter={eventPropGetter}
               style={{ height: 600 }}
            />
         </div>
      </div>
   );
};

export default SessionsPage;
