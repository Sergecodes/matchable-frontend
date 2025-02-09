import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface BookingFormInput {
  name: string;
  email: string;
  phone: string;
  terms: boolean;
}

interface BookingFormProps {
  onSubmit: (data: BookingFormInput) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormInput>();

  const submitHandler: SubmitHandler<BookingFormInput> = data => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="max-w-md mx-auto p-6 border rounded shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#007BA7]">Booking Details</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-1">Name *</label>
        <input
          id="name"
          {...register("name", { required: "Name is required" })}
          placeholder="Your name"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#007BA7]"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-1">Email *</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Your email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#007BA7]"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 mb-1">Phone *</label>
        <input
          id="phone"
          {...register("phone", { required: "Phone number is required" })}
          placeholder="Your phone number"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#007BA7]"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register("terms", { required: "You must accept the terms" })}
            className="form-checkbox text-[#007BA7]"
          />
          <span className="ml-2 text-gray-700">I agree to the terms and conditions</span>
        </label>
        {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>}
      </div>
      <button type="submit" className="w-full bg-[#007BA7] hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-200">
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;