import React, { createContext, useState, useEffect } from 'react';

export const BookingContext = createContext(null);

const DEFAULT_BOOKINGS = [
  {
    id: 'LUX-8492',
    customer: 'Sarah Jenkins',
    phone: '+1 (555) 345-6789',
    email: 'sarah.j@example.com',
    address: '124 West 72nd Street, Apt 8A, New York',
    service: 'Dry Cleaning',
    quantity: 3,
    unit: 'Kg',
    pricePerUnit: 12.0,
    estimatedTotal: 36.0,
    pickupDate: '2026-11-22',
    pickupTime: '09:00 AM - 11:00 AM',
    express: true,
    instruction: 'Please hand-press the silk collar on the cream blazer carefully.',
    status: 'In Cleaning',
    createdAt: '2026-11-21T09:15:00.000Z',
    milestones: [
      { title: 'Booking Confirmed', time: 'Nov 21, 09:15 AM', done: true },
      { title: 'Garments Picked Up', time: 'Nov 21, 11:30 AM', done: true },
      { title: 'Eco Solvent Cleaning', time: 'Nov 21, 02:45 PM', done: true },
      { title: 'Finishing & Steam Press', time: 'Estimated Nov 22, 10:00 AM', done: false },
      { title: 'Out for Doorstep Delivery', time: 'Estimated Nov 22, 02:00 PM', done: false }
    ]
  },
  {
    id: 'LUX-7104',
    customer: 'Marcus Bennett',
    phone: '+1 (555) 902-4411',
    email: 'marcus.b@example.com',
    address: '88 Central Park South, New York',
    service: 'Wash & Fold Laundry',
    quantity: 8,
    unit: 'Kg',
    pricePerUnit: 4.5,
    estimatedTotal: 36.0,
    pickupDate: '2026-11-20',
    pickupTime: '02:00 PM - 04:00 PM',
    express: false,
    instruction: 'Fragrance-free detergent only, please.',
    status: 'Delivered',
    createdAt: '2026-11-20T14:00:00.000Z',
    milestones: [
      { title: 'Booking Confirmed', time: 'Nov 20, 02:00 PM', done: true },
      { title: 'Garments Picked Up', time: 'Nov 20, 03:15 PM', done: true },
      { title: 'Botanical Wash & Tumble', time: 'Nov 20, 06:30 PM', done: true },
      { title: 'Crisp Marie-Kondo Fold', time: 'Nov 21, 08:30 AM', done: true },
      { title: 'Delivered to Doorstep', time: 'Nov 21, 11:45 AM', done: true }
    ]
  }
];

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('luxefabric_all_bookings');
      if (saved) return JSON.parse(saved);

      const legacy = localStorage.getItem('booking');
      if (legacy) {
        const parsedLegacy = JSON.parse(legacy);
        return [
          {
            id: 'LUX-' + Math.floor(1000 + Math.random() * 9000),
            customer: parsedLegacy.customer || parsedLegacy.name || 'Guest User',
            phone: parsedLegacy.phone || parsedLegacy.mobile || '+1 555-000-0000',
            email: 'guest@luxefabric.com',
            address: parsedLegacy.address || 'Pickup on file',
            service: parsedLegacy.service || 'Dry Cleaning',
            quantity: Number(parsedLegacy.quantity) || 2,
            unit: 'Kg',
            pricePerUnit: 12.0,
            estimatedTotal: (Number(parsedLegacy.quantity) || 2) * 12.0,
            pickupDate: parsedLegacy.pickupDate || new Date().toISOString().split('T')[0],
            pickupTime: parsedLegacy.pickupTime || 'Morning (09:00 AM - 12:00 PM)',
            express: false,
            instruction: parsedLegacy.instruction || 'Handle with gentle care.',
            status: 'Scheduled',
            createdAt: new Date().toISOString(),
            milestones: [
              { title: 'Booking Confirmed', time: 'Just now', done: true },
              { title: 'Driver Dispatched', time: 'Pending', done: false },
              { title: 'Cleaning & Care', time: 'Pending', done: false },
              { title: 'Quality Inspection', time: 'Pending', done: false },
              { title: 'Delivered to Doorstep', time: 'Pending', done: false }
            ]
          },
          ...DEFAULT_BOOKINGS
        ];
      }

      return DEFAULT_BOOKINGS;
    } catch (e) {
      console.error(e);
      return DEFAULT_BOOKINGS;
    }
  });

  const [activeBooking, setActiveBooking] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('luxefabric_all_bookings', JSON.stringify(bookings));
      if (bookings.length > 0) {
        localStorage.setItem('booking', JSON.stringify(bookings[0]));
      }
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  const addBooking = (bookingData) => {
    const id = 'LUX-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id,
      customer: bookingData.customer || bookingData.name || 'Valued Client',
      phone: bookingData.phone || bookingData.mobile || '',
      email: bookingData.email || '',
      address: bookingData.address || '',
      service: bookingData.service || 'Dry Cleaning',
      quantity: Number(bookingData.quantity) || 1,
      unit: bookingData.unit || 'Kg',
      pricePerUnit: bookingData.pricePerUnit || 10,
      estimatedTotal: bookingData.estimatedTotal || 25,
      pickupDate: bookingData.pickupDate || new Date().toISOString().split('T')[0],
      pickupTime: bookingData.pickupTime || '09:00 AM - 12:00 PM',
      express: !!bookingData.express,
      instruction: bookingData.instruction || '',
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
      milestones: [
        { title: 'Booking Confirmed', time: 'Just now', done: true },
        { title: 'Concierge Dispatched', time: `${bookingData.pickupDate || 'Tomorrow'} (${bookingData.pickupTime || 'Morning'})`, done: false },
        { title: 'Eco-Textile Cleaning', time: 'In Queue', done: false },
        { title: 'Hand Pressing & QC', time: 'In Queue', done: false },
        { title: 'Delivered to Doorstep', time: 'Pending Return', done: false }
      ]
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveBooking(newBooking);
    return newBooking;
  };

  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const deleteBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const findBooking = (query) => {
    if (!query) return null;
    const cleanQuery = query.trim().toLowerCase();
    return bookings.find(
      (b) =>
        b.id.toLowerCase() === cleanQuery ||
        b.phone.toLowerCase().includes(cleanQuery) ||
        (b.customer && b.customer.toLowerCase().includes(cleanQuery))
    );
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        activeBooking,
        setActiveBooking,
        addBooking,
        cancelBooking,
        deleteBooking,
        findBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export { useBookings } from '../hooks/useBookings';
