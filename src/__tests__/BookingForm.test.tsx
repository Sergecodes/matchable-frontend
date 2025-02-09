import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import BookingForm from '../components/BookingForm';

describe('BookingForm', () => {
  const onSubmitMock = jest.fn();

  test('submits form with valid data', async () => {
    render(<BookingForm onSubmit={onSubmitMock} />);

    fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Your email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Your phone number/i), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByRole('checkbox'));

    fireEvent.submit(screen.getByRole('button', { name: /Confirm Booking/i }));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        terms: true,
      });
    });
  });
});
